import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/slices/admin/authSlice";
import LoadingModal from "../modal/LoadingModal";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.authSlice);

  const successCb = () => {
    setTimeout(() => {
      location.reload();
    }, 10);
  };

  const onFinish = async (values) => {
    dispatch(
      login({
        successCb,
        body: values,
      })
    );
  };

  return (
    <div>
      <LoadingModal open={isLoading} message="Logging in . . ." />

      <Form
        disabled={isLoading}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{
          username: "eventadmin@gmail.com",
          password: "Pass2023@!",
        }}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Invalid email format.",
            },
          ]}
        >
          <Input
            size="large"
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
            autoComplete="off"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password
            autoComplete="current-password"
            size="large"
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className=" w-full"
            color="#76813A"
          >
            LOGIN
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
