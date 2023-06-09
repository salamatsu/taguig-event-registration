/* eslint-disable react/prop-types */
import { LoadingOutlined } from "@ant-design/icons";
import { Modal, Typography, theme } from "antd";

const LoadingModal = ({ open, message = "" }) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  return (
    <Modal
      destroyOnClose={true}
      centered
      open={open}
      footer={[]}
      closable={false}
      width={200}
      className=" flex content-center justify-center"
    >
      <center>
        <LoadingOutlined
          className=" text-7xl"
          style={{ color: colorPrimary }}
        />
        {message && (
          <div>
            <br />
            <Typography.Title level={5}>{message}</Typography.Title>
          </div>
        )}
      </center>
    </Modal>
  );
};

export default LoadingModal;
