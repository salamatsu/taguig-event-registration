import { Route } from "react-router-dom";
import { Home, Login } from "../pages/admin";
import { Auth, UnAuth } from "../services/adminAuth";
import RegisterAttendee from "../components/admin/contents/RegisterAttendee";
import Attendees from "../pages/admin/Attendees";
import AdminUsers from "../pages/admin/AdminUsers";

const AdminRoutes = () => (
  <>
    <Route element={<UnAuth />}>
      <Route path="/" element={<Login />} />;
    </Route>
    <Route element={<Auth />}>
      <Route element={<Home />}>
        <Route path="/admin-addAttendee" element={<RegisterAttendee />} />;
        <Route path="admin-attendees" element={<Attendees />} />;
        <Route path="admin-users" element={<AdminUsers />} />;
      </Route>
    </Route>
  </>
);

export default AdminRoutes;
