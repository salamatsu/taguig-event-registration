import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Space, Table, Tag } from "antd";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminUser_Form from "../../components/admin/forms/AdminUser_Form";
import useTableSearch from "../../hooks/useTableSearch";
import { addAdminUser, getAdminUsers, updateAdminUser } from "../../store/slices/admin/adminUsers_Slice";

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { getColumnSearchProps } = useTableSearch();
  const { list, isLoading } = useSelector(
    (state) => state.adminUsers_Slice
  );
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();

  // const {
  //   useToken: { colorSecondary },
  // } = theme;

  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [showEditDrawer, setShowEditDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const toggleVisible_addDrawer = (val) => () => {
    setShowAddDrawer(val);
  };

  const toggleVisible_editDrawer = (val, data) => () => {
    setSelectedRow(data);
    editForm.setFieldsValue({
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
    });
    setShowEditDrawer(val);
  };

  const onFinishAdd = (values) => {
    dispatch(
      addAdminUser({
        body: values,
        callback: () => {
          setShowAddDrawer(false);
          addForm.resetFields();
        },
      })
    );
  };

  const onFinishEdit = (values) => {
    dispatch(
      updateAdminUser({
        body: {
          params: selectedRow?.accountId,
          body: values,
        },
        callback: () => {
          setShowEditDrawer(false);
        },
      })
    );
  };

  // const handleResetPassword = (data) => () => {
  //   setSelectedRow(data);
  //   dispatch(
  //     resetUserPassword({
  //       body: { params: data?.accountId },
  //     })
  //   );
  // };

  const columns = [
    {
      title: "ACTION",
      key: "ACTION",
      render: (data) => (
        <Space>
          {/* <Button
            loading={
              isLoading_resetUserPassword &&
              data.accountId === selectedRow?.accountId
            }
            color={colorSecondary}
            icon={<UnlockOutlined />}
            onClick={handleResetPassword(data)}
          >
            Reset Password
          </Button> */}
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={toggleVisible_editDrawer(true, data)}
          >
            Edit
          </Button>
        </Space>
      ),
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
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      filterSearch: true,
      ...getColumnSearchProps("email"),
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Status",
      key: "isDeleted",
      render: (data, { isDeleted }) => {
        return (
          <>
            <Tag color={isDeleted === 1 ? "volcano" : "green"} key={isDeleted}>
              {isDeleted === 1 ? "INACTIVE" : "ACTIVE"}
            </Tag>
            {/* <Button
              // loading={isLoadingRemove}
              size="small"
              type={isDeleted === 1 ? "primary" : "danger"}
              onClick={() => handleChangeStatus(data)}
            >
              <SwapOutlined />
            </Button> */}
          </>
        );
      },
      filterMultiple: false,
      filters: [
        {
          text: "Active",
          value: 0,
        },
        {
          text: "Inactive",
          value: 1,
        },
      ],
      onFilter: (value, record) => record.isDeleted === value,
    },
    {
      title: "DATE CREATED",
      dataIndex: "dateCreated",
      key: "dateCreated",
      ...getColumnSearchProps("dateCreated"),
      render: (data) => {
        return moment(data).format("lll");
      },
      defaultSortOrder: "descend",
      sorter: (a, b) => moment(a.dateCreated).diff(moment(b.dateCreated)),
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
    dispatch(getAdminUsers());
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold">ADMIN USERS</h1>
      <Card
        type="inner"
        title="List"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={toggleVisible_addDrawer(true)}
          >
            ADD
          </Button>
        }
      >
        <Table
          scroll={{ x: "100%" }}
          columns={columns}
          dataSource={list}
          rowKey={"id"}
          className="w-full"
          loading={isLoading}
        />
      </Card>

      <AdminUser_Form
        title="Add Admin"
        form={addForm}
        onFinish={onFinishAdd}
        open={showAddDrawer}
        onClose={toggleVisible_addDrawer(false)}
      />

      <AdminUser_Form
        title="Edit Admin"
        form={editForm}
        onFinish={onFinishEdit}
        open={showEditDrawer}
        onClose={toggleVisible_editDrawer(false)}
      />

    </div>
  );
};

export default AdminUsers;
