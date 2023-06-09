import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

import {
  Button,
  Card,
  Drawer,
  Form,
  Select,
  Space,
  Table
} from "antd";
import dayjs from "dayjs";
import { toString } from "lodash";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import RegistrationForm from "../../components/admin/forms/RegistrationForm";
import LoadingModal from "../../components/admin/modal/LoadingModal";
import useTableSearch from "../../hooks/useTableSearch";
import { getAttendees, getEvents, updateAttendeeInfo } from "../../store/slices/admin/eventSlice";

const Attendees = () => {
  const dispatch = useDispatch();
  const { getColumnSearchProps } = useTableSearch();
  const {
    list_getEvents,
    isLoading_getEvents,
    isLoading_getAttendees,
    list_getAttendees,
    isLoading_updateAttendeeInfo
  } = useSelector((state) => state.eventSlice);

  const [form] = Form.useForm();
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [endYear, setEndYear] = useState(null);

  const hanldeOnchangeDate = (date) => {
    setEndYear(date.add(1, "year").format("YYYY"));
  };

  const toggleVisible_editDrawer = (val, data) => () => {
    setSelectedRow(data);
    setShowEditDrawer(val);

    if(data){
      form.setFieldsValue({
        qrCode:data.qrCode,
        firstName:data.firstName,
        middleName:data.middleName,
        lastName:data.lastName,
        birthdate: dayjs(data.birthdate),
        sex:data.sex,
        email:data.email,
        mobileNumber: data?.mobileNumber ? toString(data?.mobileNumber)?.substring(3) : '',
        guardianName: data?.guardianName,
        guardianNumber: data?.guardianNumber ? toString(data?.guardianNumber)?.substring(3) : '',
        grade:data.grade,
        year: data.year ? dayjs(data.year.split(" - ")[0]) : dayjs(),
        school:data.school,
        religion:data.religion,
        fbName:data.fbName,
        skills:data.skills.split(";"),
      });
    }
  };

  const onFinish = (values) => {
    const body = {
      
      eventId:selectedRow?.eventId,
      attendeeId:selectedRow?.attendeeId,
      qrCode:selectedRow?.qrCode,
      eventDate:selectedRow?.eventDate,

      ...values,
      mobileNumber: parseInt( "639"+values.mobileNumber),
      guardianNumber: values.guardianNumber? parseInt( "639"+values.guardianNumber) : "",
      birthdate: values.birthdate.format("YYYY-MM-DD"),
      year: [values.year.format("YYYY"),values.year.add(1,'year').format("YYYY") ].join(" - "),
      skills: values.skills ? values.skills.join(";") : ""
      
    }
    dispatch(updateAttendeeInfo({
      body,
      callback: ()=> {
        toggleVisible_editDrawer(false)()
      }
    }))
  };

  const handleChangeDate = (value) => {
    dispatch(
      getAttendees({
        body: { params: value },
      })
    );
  };

  const columns = [
    {
      title: "ACTION",
      key: "ACTION",
      render: (data) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={toggleVisible_editDrawer(true, data)}
          >
            Edit
          </Button>
          <Button icon={<UserOutlined />} 
          // onClick={onFinishEdit(true, data)}
          >
            View Information
          </Button>
        </Space>
      ),
    },
    {
      title: "QR CODE",
      dataIndex: "qrCode",
      key: "qrCode",
      filterSearch: true,
      ...getColumnSearchProps("qrCode"),

      sorter: (a, b) => a.qrCode.localeCompare(b.qrCode),
    },
    {
      title: "FIRST NAME",
      dataIndex: "firstName",
      key: "firstName",
      filterSearch: true,
      ...getColumnSearchProps("firstName"),

      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: "LAST NAME",
      dataIndex: "lastName",
      key: "lastName",
      filterSearch: true,
      ...getColumnSearchProps("lastName"),

      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: "BIRTH DATE",
      dataIndex: "birthdate",
      key: "birthdate",
      ...getColumnSearchProps("birthdate"),
      render: (data) => {
        return moment(data).format("lll");
      },
      defaultSortOrder: "descend",
      sorter: (a, b) => moment(a.birthdate).diff(moment(b.birthdate)),
    },
    {
      title: "DATE UPDATED",
      dataIndex: "dateUpdated",
      key: "dateUpdated",
      ...getColumnSearchProps("dateUpdated"),
      render: (data) => {
        return moment(data).format("lll");
      },
      defaultSortOrder: "descend",
      sorter: (a, b) => moment(a.dateUpdated).diff(moment(b.dateUpdated)),
    },
  ];

  useEffect(() => {
    dispatch(getEvents());
  }, []);

  return (
    <div>
      <Card
        type="inner"
        title={
          <Space>
            Select event date:
            <Select
              allowClear
              loading={isLoading_getEvents}
              placeholder="Select date"
              style={{
                width: 300,
              }}
              options={list_getEvents.map(({ eventId, date }) => ({
                value: eventId,
                label: dayjs(date).format("MMMM DD, YYYY"),
              }))}
              onChange={handleChangeDate}
            />
          </Space>
        }
      >
        <Table
          scroll={{ x: "100%" }}
          columns={columns}
          dataSource={list_getAttendees}
          rowKey={"id"}
          className="w-full"
          loading={isLoading_getAttendees}
        />
      </Card>
      <LoadingModal open={isLoading_getEvents} message="L o a d i n g  . . ." />
      <LoadingModal open={isLoading_updateAttendeeInfo} message="U p d a t i n g . . ." />
      <Drawer
      destroyOnClose={true}
      placement="bottom"
      height={'90%'}
        open={showEditDrawer}
        title={
          selectedRow?.qrCode +
          " - " +
          [selectedRow?.firstName, selectedRow?.lastName].join(" ")?.trim()?.toUpperCase()
        }
        footer={false}
        onClose={toggleVisible_editDrawer(false)}
      >
        <RegistrationForm 
          form={form}
          onFinish={onFinish}
          endYear={endYear}
          hanldeOnchangeDate={hanldeOnchangeDate}
          isloading={isLoading_updateAttendeeInfo}
          isEdit={true}
          />
      </Drawer>

    </div>
  );
};

export default Attendees;
