import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Context from "../Context";

export default function Sidebar() {
  const location = useLocation();
  const handleSidebar = () => {
    const sidebar = document.getElementById("col-sidebar");
    sidebar.classList.remove("vertical-sidebar-enable");
  };
  const path = location.pathname;
  const adminData = useContext(Context);

  // const isPermission = (isGiven, isGivenInside) => {
  //   if (adminData?.role === "admin") {
  //     return true;
  //   }
  //   if (adminData?.role === "sub-admin") {
  //     if (typeof adminData[isGiven] === "object") {
  //       if (isGivenInside === "all") {
  //         const data = Object.values(adminData[isGiven]).some((value) => value);
  //         return data;
  //       } else {
  //         const data = adminData[isGiven][isGivenInside];
  //         return data;
  //       }
  //     } else {
  //       const data = adminData[isGiven];
  //       return data;
  //     }
  //   }
  // };

  return (
    <div>
      <div className="app-menu navbar-menu">
        <div className="-navbarbrand-box">
          {" "}
          <Link to={"/"} className="logo d-flex">
            <span className="logo-sm">
              <img src="/assets/images/image-2.png" alt="logo" height={35} />
            </span>
            <span className="logo-lg">
              <img src="/assets/images/image-2.png" alt="logo" height={55} />
            </span>
            <h4
              href="index.html"
              className="logo logo-dark"
              style={{ fontWeight: 800 }}
            >
              Jai Laxmi Fruits
            </h4>
          </Link>
          <button
            type="button"
            className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover"
          >
            <i className="ri-record-circle-line" />
          </button>
        </div>
        <div
          id="scrollbar"
          className="simplebar-content-wrapper"
          data-simplebar="init"
        >
          <div className="container-fluid">
            <div id="two-column-menu"></div>
            <ul className="navbar-nav" id="navbar-nav">
              <li className="menu-title d-flex align-items-center justify-content-between me-3">
                <span data-key="t-menu">Menu</span>
                <i
                  className="ri-close-line fs-5 d-lg-none d-md-none d-block"
                  style={{ cursor: "pointer" }}
                  onClick={handleSidebar}
                />
              </li>
              <li className="nav-item">
                <Link
                  to={"/"}
                  className={`nav-link menu-link ${path === `/` && `active`}`}
                  role="button"
                  href="#sidebarDashboards"
                  aria-expanded="false"
                  aria-controls="sidebarDashboards"
                  // data-bs-toggle="collapse"
                >
                  <i className="ri-dashboard-line" />{" "}
                  <span data-key="t-dashboards">Dashboards</span>
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link menu-link ${
                    (path === `/all-memos` ||
                      path === `/unseen-memos` ||
                      path === `/today-memos` ||
                      path === `/this-month-memos` ||
                      path === `/add-memo`) &&
                    `active`
                  }`}
                  role="button"
                  href="#sidebarDashboards"
                  aria-expanded="false"
                  aria-controls="sidebarDashboards"
                  data-bs-toggle="collapse"
                >
                  <i className="ri-group-line" />
                  <span data-key="t-dashboards">Manage Memo</span>
                </a>

                <div
                  className={`collapse menu-dropdown ${
                    (path === `/all-memos` ||
                      path === `/unseen-memos` ||
                      path === `/today-memos` ||
                      path === `/this-month-memos` ||
                      path === `/add-memo`) &&
                    `show`
                  }`}
                  id="sidebarDashboards"
                >
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        to={"/all-memos"}
                        className={`nav-link ${
                          path === `/all-memos` && `active`
                        }`}
                        data-key="t-user"
                      >
                        All Memo's
                      </Link>
                    </li>
                    <li
                      className="nav-item"
                      hidden={adminData?.role !== "operator"}
                    >
                      <Link
                        to={"/add-memo"}
                        className={`nav-link ${
                          path === `/add-memo` && `active`
                        }`}
                        data-key="t-user"
                      >
                        Add Memo
                      </Link>
                    </li>
                    <li
                      className="nav-item"
                      hidden={adminData.role === "operator"}
                    >
                      <Link
                        to={"/unseen-memos"}
                        className={`nav-link ${
                          path === `/unseen-memos` && `active`
                        }`}
                        data-key="t-user"
                      >
                        Unseen Memo's
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        to={"/today-memos"}
                        className={`nav-link ${
                          path === `/today-memos` && `active`
                        }`}
                        data-key="t-user"
                      >
                        Today's Memo
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"/this-month-memos"}
                        className={`nav-link ${
                          path === `/this-month-memos` && `active`
                        }`}
                        data-key="t-user"
                      >
                        This Month’s Memo
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item" hidden={adminData?.role === "operator"}>
                <a
                  className={`nav-link menu-link ${
                    (path === `/add-owner` ||
                      path === `/owner-list` ||
                      path === `/owner-login-history`) &&
                    `active`
                  }`}
                  role="button"
                  href="#sidebar-owner"
                  aria-expanded="false"
                  aria-controls="sidebar-owner"
                  data-bs-toggle="collapse"
                >
                  <i className="ri-team-line" />
                  <span data-key="t-staff">Manage Owner's</span>
                </a>

                <div
                  className={`collapse menu-dropdown ${
                    (path === `/add-owner` ||
                      path === `/owner-list` ||
                      path === `/owner-login-history`) &&
                    `show`
                  }`}
                  id="sidebar-owner"
                >
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        to={"/add-owner"}
                        className={`nav-link ${
                          path === `/add-owner` && `active`
                        }`}
                        data-key="t-owner"
                      >
                        Add New Owner
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"/owner-list"}
                        className={`nav-link ${
                          path === `/owner-list` && `active`
                        }`}
                        data-key="t-owner"
                      >
                        Owner List
                      </Link>
                    </li>{" "}
                    <li className="nav-item">
                      <Link
                        to={"/owner-login-history"}
                        className={`nav-link ${
                          path === `/owner-login-history` && `active`
                        }`}
                        data-key="t-owner"
                      >
                        Login History
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item" hidden={adminData?.role === "operator"}>
                <a
                  className={`nav-link menu-link ${
                    (path === `/add-operator` ||
                      path === `/operator-list` ||
                      path === `/operator-login-history`) &&
                    `active`
                  }`}
                  role="button"
                  href="#sidebar-operator"
                  aria-expanded="false"
                  aria-controls="sidebar-operator"
                  data-bs-toggle="collapse"
                >
                  <i className="ri-team-line" />
                  <span data-key="t-operator">Manage Operator</span>
                </a>

                <div
                  className={`collapse menu-dropdown ${
                    (path === `/add-operator` ||
                      path === `/operator-list` ||
                      path === `/operator-login-history`) &&
                    `show`
                  }`}
                  id="sidebar-operator"
                >
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        to={"/add-operator"}
                        className={`nav-link ${
                          path === `/add-operator` && `active`
                        }`}
                        data-key="t-operator"
                      >
                        Add Operator
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"/operator-list"}
                        className={`nav-link ${
                          path === `/operator-list` && `active`
                        }`}
                        data-key="t-operator"
                      >
                        Operator List
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"/operator-login-history"}
                        className={`nav-link ${
                          path === `/operator-login-history` && `active`
                        }`}
                        data-key="t-operator"
                      >
                        Login History
                      </Link>
                    </li>{" "}
                  </ul>
                </div>
              </li>

              <li className="nav-item">
                <a
                  className={`nav-link menu-link ${
                    (path === `/upload-apk` || path === `/get-apk`) && `active`
                  }`}
                  role="button"
                  href="#sidebar-apk"
                  aria-expanded="false"
                  aria-controls="sidebar-apk"
                  data-bs-toggle="collapse"
                >
                  <i className="ri-dashboard-line" />
                  <span data-key="t-apk">Android Application</span>
                </a>

                <div
                  className={`collapse menu-dropdown ${
                    (path === `/upload-apk` || path === `/get-apk`) && `show`
                  }`}
                  id="sidebar-apk"
                >
                  <ul className="nav nav-sm flex-column">
                    <li
                      className="nav-item"
                      hidden={adminData?.role === "operator"}
                    >
                      <Link
                        to={"/upload-apk"}
                        className={`nav-link ${
                          path === `/upload-apk` && `active`
                        }`}
                        data-key="t-apk"
                      >
                        Upload apk
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"/get-apk"}
                        className={`nav-link ${
                          path === `/get-apk` && `active`
                        }`}
                        data-key="t-apk"
                      >
                        Get apk
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="sidebar-background" />
      </div>
    </div>
  );
}
