import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoutes() {
  const accessToken = localStorage.getItem("accessToken");
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;
