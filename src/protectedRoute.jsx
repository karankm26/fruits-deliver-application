import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

export default function ProtectedRoute() {
  const { loginData } = useSelector((state) => state.login);
  return loginData?.id ? <Outlet /> : <Navigate to={"/login"} />;
}
