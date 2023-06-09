import { Layout } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import { logout } from "../../../store/slices/admin/authSlice";
import NavBar from "../contents/NavBar";
import Sidebar from "../contents/Sidebar";

const { Content } = Layout;

const SideTopLayout = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [dropdownIcon, setDropdownIcon] = useState(false);

  const handleSignout = () => {
    dispatch(logout());
    window.location.reload();
  };

  const handleCollapse = (value) => {
    setCollapsed(value);
  };

  return (
    <Layout className="  h-screen">
      <Sidebar handleCollapse={handleCollapse} collapsed={collapsed} />
      <Layout className="site-layout">
        <NavBar
          collapsed={collapsed}
          handleCollapse={handleCollapse}
          handleSignout={handleSignout}
          setDropdownIcon={setDropdownIcon}
          dropdownIcon={dropdownIcon}
        />
        <Content
          className="site-layout-background"
          style={{
            padding: 10,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default SideTopLayout;
