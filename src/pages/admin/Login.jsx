import { Card, Divider, Image, Typography, theme } from "antd";
import { dynamic, logo } from "../../assets/images/logos";
import LoginForm from "../../components/admin/forms/LoginFrom";

const Login = () => {
  const { token } = theme.useToken();

  return (
    <div
      className="h-screen w-screen"
      style={{
        display: "flex",
        justifyContent: "center",
        backgroundColor: token.colorPrimary,
      }}
    >
      <Card
        className=" my-auto p-5"
        style={{
          maxWidth: 900,
        }}
      >
        <Image preview={false} src={logo} className=" max-w-[300px]" alt="" />
        <center>
          <h3>Sign in your account.</h3>
        </center>
        <LoginForm />

        <Divider />
        <center>
          <Typography.Title level={5}>Powered By:</Typography.Title>
          <div className=" grid grid-2">
            <Image
              preview={false}
              src={dynamic}
              className=" max-w-[150px]"
              alt=""
            />
          </div>
        </center>
      </Card>
    </div>
  );
};

export default Login;
