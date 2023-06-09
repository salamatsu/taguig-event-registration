/* eslint-disable react/prop-types */
import { Avatar, Button, Dropdown, Layout, Space, Typography } from "antd";
import React from "react";
import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";

const { Header } = Layout;
const NavBar = ({
  collapsed,
  handleCollapse,
  handleSignout,
  setDropdownIcon,
  dropdownIcon,
}) => {
  const { currentUser } = useSelector((state) => state.authSlice);

  return (
    <Header
      className="site-layout-background flex justify-between px-3"
      style={{
        backgroundColor: "white",
      }}
    >
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: () => handleCollapse(!collapsed),
      })}

      <Dropdown
        trigger="click"
        dropdownRender={() => (
          <Button type="primary" className=" w-full" onClick={handleSignout}>
            Logout
          </Button>
        )}
        onOpenChange={setDropdownIcon}
      >
        <Space className=" userHeader">
          <Avatar size={50} icon={<UserOutlined />} />
          <Typography.Text className=" hidden md:block">
            {[currentUser?.firstName, currentUser?.lastName].join(" ").trim()}
          </Typography.Text>
          {dropdownIcon ? <DownOutlined /> : <RightOutlined />}
        </Space>
      </Dropdown>
    </Header>
  );
};

export default NavBar;
