/* eslint-disable react/prop-types */
import { Avatar, Dropdown, Layout, Space, Typography } from "antd";
import React, { useState } from "react";
import {
  DownOutlined,
  LockOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import AdminUser_NewPass_Form from "../forms/AdminUser_NewPass_Form";

const { Header } = Layout;
const NavBar = ({
  collapsed,
  handleCollapse,
  handleSignout,
  setDropdownIcon,
  dropdownIcon,
}) => {
  const { currentUser } = useSelector((state) => state.authSlice);
  const [changePassModal, setChangePassModal] = useState(false);

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
        className=" cursor-pointer"
        menu={{
          items: [
            {
              key: "password",
              label: "Change Password",
              icon: <LockOutlined />,
              onClick: ()=> setChangePassModal(true)
            },
            {
              type: "divider",
            },
            {
              key: "logout",
              danger: true,
              label: "Sign out",
              icon: <LogoutOutlined />,
              onClick: handleSignout,
            },
          ],
        }}
        // dropdownRender={() => (
        //   <Button type="primary" className=" w-full" onClick={handleSignout}>
        //     Logout
        //   </Button>
        // )}
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
      <AdminUser_NewPass_Form open={changePassModal} onClose={()=>setChangePassModal(false)} />

    </Header>
  );
};

export default NavBar;
