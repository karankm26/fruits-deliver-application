import React, { useState } from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import Context from "../Context";
import { useEffect } from "react";
import { fetchAdmin, fetchStaffById } from "../../features/apiSlice";
import SnackBar from "../../utils/snackBar";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Layout({ children }) {
  const [state, setState] = useState({
    open: true,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

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
      {/* <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        key={vertical + horizontal}
      >
        <Alert severity={"error"} sx={{ width: "100%" }}>
          Please Complete Your Two Factor Verfication in Order to Continue Your
          Account
        </Alert>
      </Snackbar> */}
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
