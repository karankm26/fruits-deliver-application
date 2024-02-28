import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {
  const { loginData } = useSelector((state) => state.login);
  return loginData?.id ? <Outlet /> : <Navigate to={"/login"} />;
}
