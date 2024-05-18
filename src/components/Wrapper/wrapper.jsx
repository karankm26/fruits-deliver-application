import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdmin, fetchOperator } from "../../features/apiSlice";
import Context from "../Context";
import RoutePath from "../../routes";

export default function Wrapper() {
  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state.login);
  const { data } = useSelector((state) => state.api);

  useEffect(() => {
    if (loginData?.id) {
      if (loginData?.role === "admin") {
        dispatch(fetchAdmin(loginData?.id));
      } else {
        dispatch(fetchOperator(loginData?.id));
      }
    }
  }, [dispatch, loginData?.role, loginData?.id]);

  const adminData = data;
  // useEffect(() => {
  //   const checkLogout = () => {
  //     const currentTime = new Date().toISOString();
  //     const expiresAt = loginData?.expiresAt;
  //     if ((expiresAt && expiresAt < currentTime) || loginData?.status === 0) {
  //       localStorage.clear("persist:root");
  //       localStorage.clear("id");
  //       localStorage.clear("token");
  //       window.location.reload();
  //     }
  //   };
  //   const intervalId = setInterval(checkLogout, 1000);
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [loginData]);

  return (
    <Context.Provider value={adminData}>
      <title>
        Jai Laxmi Fruits{" "}
        {adminData.role
          ? "- " +
            adminData?.role?.charAt(0)?.toUpperCase() +
            adminData?.role?.slice(1)
          : ""}
      </title>
      <RoutePath />
    </Context.Provider>
  );
}
