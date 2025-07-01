import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute({ allowedRoles }) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return <Navigate to="/login" />;

  const userRole = Number(user.id_rol);

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" />;
  }
  return <Outlet />;
}
