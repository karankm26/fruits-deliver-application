import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/loginSlice";
import Context from "../Context";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modeNav, setModeNav] = useState(false);
  const [sidebarCollapse, setSidebarCollapse] = useState(false);
  const [isMobileSidebarCollapse, setisMobileSidebarCollapse] = useState(false);
  const modeType = localStorage.getItem("mode");
  const data = useContext(Context);

  useEffect(() => {
    if (modeType === "true") {
      setModeNav(true);
      handleModeChange(true);
    }
  }, [modeType]);

  const handleModeChange = (item) => {
    const theme = document.getElementById("data-theme-template");
    const themeClass = document.getElementById("page-content");
    theme.setAttribute("data-bs-theme", item ? "dark" : "light");
    theme.setAttribute("data-sidebar", item ? "dark" : "light");
    themeClass.setAttribute("data-bs-theme", item ? "dark" : "light");
    localStorage.setItem("mode", item);
  };

  const handleSidebar = (mode) => {
    const theme = document.getElementById("data-theme-template");
    const sidebar = document.getElementById("col-sidebar");

    if (isMobileSidebarCollapse) {
      theme.setAttribute("data-sidebar-size", "lg");
      sidebar.classList.add("vertical-sidebar-enable");
    } else {
      theme.setAttribute("data-sidebar-size", mode ? "sm" : "lg");
    }
  };

  useEffect(() => {
    const screeenSizeChange = () => {
      if (window.innerWidth <= 767) {
        setisMobileSidebarCollapse(true);
        document.body.classList.add("twocolumn-panel");
        document
          .getElementById("data-theme-template")
          .setAttribute("data-sidebar-size", "lg");
      } else {
        setisMobileSidebarCollapse(false);
        document.body.classList.remove("twocolumn-panel");
      }
    };
    screeenSizeChange();
    window.addEventListener("resize", screeenSizeChange);
    return () => {
      window.removeEventListener("resize", screeenSizeChange);
    };
  }, [window.innerWidth]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("persist:root");
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <header id="page-topbar">
      <div className="layout-width">
        <div className="navbar-header">
          <div className="d-flex">
            {/* LOGO */}
            <div className="navbar-brand-box horizontal-logo">
              <a href="index.html" className="logo logo-dark">
                <span className="logo-sm">
                  <img src="assets/images/logo-sm.png" alt="logo" height={22} />
                </span>
                <span className="logo-lg">
                  <img src="assets/img/logo-dark.png" alt="logo" height={17} />
                </span>
              </a>
              <a href="index.html" className="logo logo-light">
                <span className="logo-sm">
                  <img src="assets/images/logo-sm.png" alt="logo" height={22} />
                </span>
                <span className="logo-lg">
                  <img src="assets/img/logo-light.png" alt="logo" height={17} />
                </span>
              </a>
            </div>
            <button
              type="button"
              className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
              id="topnav-hamburger-icon"
              onClick={() => {
                setSidebarCollapse(!sidebarCollapse);
                handleSidebar(!sidebarCollapse);
              }}
            >
              <span className={`hamburger-icon ${sidebarCollapse && "open"}`}>
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
          <div className="d-flex align-items-center">
            <div className="dropdown ms-sm-3 header-item topbar-user">
              <button
                type="button"
                className="btn"
                id="page-header-user-dropdown"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="d-flex align-items-center">
                  {data?.image ? (
                    <img
                      className="rounded-circle header-profile-user"
                      src={
                        data?.image
                          ? data?.image
                          : "assets/images/users/avatar-1.jpg"
                      }
                      alt="Header Avatar"
                    />
                  ) : (
                    <i className="ri-admin-line fs-2" />
                  )}
                  <span className="text-start ms-xl-2">
                    <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                      {data?.firstName} {data?.lastName}
                    </span>
                    <span className="d-none d-xl-block ms-1 fs-12 user-name-sub-text">
                      {data?.role === "admin" ? "Admin" : "Operator"}
                    </span>
                  </span>
                </span>
              </button>
              <div className="dropdown-menu dropdown-menu-end">
                <h6 className="dropdown-header">Welcome {data?.firstName}!</h6>
                <Link to={"/profile"} className="dropdown-item">
                  <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1" />{" "}
                  <span className="align-middle">Profile</span>
                </Link>
                <button className="dropdown-item" onClick={handleLogout}>
                  <i className="mdi mdi-logout text-muted fs-16 align-middle me-1" />{" "}
                  <span className="align-middle" data-key="t-logout">
                    Logout
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
