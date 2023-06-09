import { Navigate, Outlet, useLocation } from "react-router-dom";

const Auth = () => {
  const storage = JSON.parse(localStorage.getItem("persist:authAdmin"));
  const auth = storage?.currentUser ? JSON.parse(storage.currentUser) : null;
  const location = useLocation();

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

const UnAuth = () => {
  const storage = JSON.parse(localStorage.getItem("persist:authAdmin"));
  const auth = storage?.currentUser ? JSON.parse(storage.currentUser) : null;
  const location = useLocation();
  return auth ? (
    <Navigate to="/admin-addAttendee" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export { Auth, UnAuth };
