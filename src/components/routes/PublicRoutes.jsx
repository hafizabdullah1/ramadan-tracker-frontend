import { Navigate, Outlet, useLocation } from "react-router-dom";

function PublicRoutes() {
  const accessToken = localStorage.getItem("accessToken");
  const location = useLocation();

  if (accessToken) {
    const from = location.state?.from?.pathname || "/ramadan-calendar";
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
}

export default PublicRoutes;
