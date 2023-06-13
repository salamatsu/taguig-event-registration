/* eslint-disable react/prop-types */
import { Button, Drawer, Form, Input } from "antd";
import { useSelector } from "react-redux";
import { regExp_Email } from "../../../helpers/regExp";
import { MailOutlined } from "@ant-design/icons";

const AdminUser_Form = ({
  title = "",
  form,
  open = false,
  onClose = () => {},
  onFinish = () => {},
}) => {
  const { isLoading_addAdminUser } = useSelector((state) => state.adminUsers_Slice);

  return (
    <Drawer title={title} placement="right" onClose={onClose} open={open}>
      <div className="pt-10 px-3 flex justify-center items-center h-full ">
        <div>
          <h1 className="text-4xl font-bold hidden md:block">{title}</h1>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              className="w-full"
              label="First name"
              name="firstName"
              rules={[
                {
                  required: true,
                  message: "Please enter first name!",
                },
              ]}
            >
              <Input
                placeholder="Enter first name"
                className="form-control w-full block"
                style={{ width: "100%" }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              className="w-full"
              label="Last Name"
              name="lastName"
              rules={[
                {
                  required: true,
                  message: "Please enter last name!",
                },
              ]}
            >
              <Input
                placeholder="Enter last name"
                className="form-control w-full block"
                style={{ width: "100%" }}
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  pattern: regExp_Email,
                  message: "Invalid email format",
                },
              ]}
            >
              <Input
                size="large"
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Enter your username"
              />
            </Form.Item>
            <center>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isLoading_addAdminUser}
                >
                  SUBMIT 
                </Button>
              </Form.Item>
            </center>
          </Form>
        </div>
      </div>
    </Drawer>
  );
};

export default AdminUser_Form;
