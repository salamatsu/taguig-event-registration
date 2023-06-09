import { UserAddOutlined, UserOutlined } from "@ant-design/icons";
import { Image, Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { logo } from "../../../assets/images/logos";
import { getItem } from "../../../helpers/itemFormat";

const { Sider } = Layout;

const items = [
  getItem(
    <Link to="/admin-addAttendee">Add Attendee</Link>,
    "/admin-addAttendee",
    <UserAddOutlined className="h-6 w-6" />
  ),
  getItem(
    <Link to="/admin-attendees">Attendees</Link>,
    "/admin-attendees",
    <UserOutlined className="h-6 w-6" />
  ),
];

// eslint-disable-next-line react/prop-types
const Sidebar = ({ collapsed, handleCollapse }) => {
  return (
    <Sider
      breakpoint="lg"
      collapsible
      collapsed={collapsed}
      theme="light"
      onCollapse={(value) => handleCollapse(value)}
      width={250}
    >
      <div className="logo">
        <Image preview={false} src={logo} className=" p-4" />
      </div>

      <Menu
        mode="inline"
        items={items}
        defaultSelectedKeys={useLocation().pathname}
      />
    </Sider>
  );
};
export default Sidebar;
