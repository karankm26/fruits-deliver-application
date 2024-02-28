import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdmin, fetchStaffById } from "../../features/apiSlice";
import Context from "../Context";
import RoutePath from "../../routes";

export default function Wrapper() {
  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state.login);
  const { staffByIdData, data } = useSelector((state) => state.api);
  // const { id, role } = loginData;

  useEffect(() => {
    if (loginData?.role === "admin") {
      dispatch(fetchAdmin(loginData?.id));
    } else {
      dispatch(fetchStaffById(loginData?.id));
    }
  }, [loginData?.role, loginData?.id]);

  const adminData = loginData?.role === "admin" ? data : staffByIdData;

  useEffect(() => {
    const checkLogout = () => {
      const currentTime = new Date().toISOString();
      const expiresAt = loginData?.expiresAt;
      if ((expiresAt && expiresAt < currentTime) || loginData?.status === 0) {
        localStorage.clear("persist:root");
        localStorage.clear("id");
        localStorage.clear("token");
        window.location.reload();
      }
    };
    const intervalId = setInterval(checkLogout, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [loginData]);

  return (
    <Context.Provider value={adminData}>
      <RoutePath />
    </Context.Provider>
  );
}
