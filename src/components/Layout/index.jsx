import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import Sidebar from "../Sidebar/Sidebar";

export default function Layout({ children }) {
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
