import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import Context from "../Context";
import { useEffect } from "react";
import { fetchAdmin, fetchStaffById } from "../../features/apiSlice";

export default function Layout({ children }) {
  // const dispatch = useDispatch();
  // const { loginData } = useSelector((state) => state.login);
  // const { staffByIdData, data } = useSelector((state) => state.api);
  // const { id, role } = loginData;

  // useEffect(() => {
  //   if (role === "admin") {
  //     dispatch(fetchAdmin(id));
  //   } else {
  //     dispatch(fetchStaffById(id));
  //   }
  // }, [role, id]);
  // const adminData = role === "admin" ? data : staffByIdData;

  return (
    <div id="col-sidebar">
      <div id="layout-wrapper">
        <Navbar />
        <Sidebar />
        <div className="main-content">
          <div id="page-content" className="page-content">
            <div className="container-fluid">{children}</div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
