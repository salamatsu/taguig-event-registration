/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Card, Form, Select, Space, message } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAttendee, getEvents } from "../../../store/slices/admin/eventSlice";
import RegistrationForm from "../forms/RegistrationForm";

const RegisterAttendee = () => {

  const dispatch = useDispatch()
  const [form] = Form.useForm();
  const [endYear, setEndYear] = useState("YYYY");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const {
    list_getEvents,
    isLoading_getEvents,
    traceUser
  } = useSelector((state) => state.eventSlice);

  const hanldeOnchangeDate = (date) => {
    setEndYear(date.add(1, "year").format("YYYY"));
  };
  
  const handleChangeDate = (value) => {
    setSelectedEvent(value)
  };

  const onFinish = async (values) => {
    if(selectedEvent){
      dispatch(addAttendee({
        body: {
          ...values,
          eventId: selectedEvent,
          eventDate: list_getEvents.find(({eventId})=> eventId === selectedEvent)?.dateSeries,
          mobileNumber: parseInt( "639"+values.mobileNumber),
          guardianNumber: parseInt( "639"+values.guardianNumber),
          birthdate: values.birthdate.format("YYYY-MM-DD"),
          year: [values.year.format("YYYY"),values.year.add(1,'year').format("YYYY") ].join(" - "),
          skills: values.skills ? values.skills.join(";") : "",
          qrCode: traceUser?.accountId
        },
        callback: ()=> {
          form.resetFields()
          form.setFieldValue('year', dayjs())
        }
      }))
    }else{
      message.warning('Please select an event date to proceed!')
    }
  };

  useEffect(() => {
    dispatch(getEvents());
  }, []);
  return (
    <Card
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
        </Space>}
    >
      <RegistrationForm
        form={form}
        onFinish={onFinish}
        endYear={endYear}
        hanldeOnchangeDate={hanldeOnchangeDate}
      />
    </Card>
  );
};

export default RegisterAttendee;
