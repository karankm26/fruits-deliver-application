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

  const isPermission = (isGiven, isGivenInside) => {
    const isAdmin = adminData?.role === "admin";
    const isSubAdmin = adminData?.role === "sub-admin";
    if (isAdmin) {
      return true;
    }
    if (isSubAdmin) {
      if (typeof adminData[isGiven] === "object") {
        return isGivenInside === "all"
          ? Object.values(adminData[isGiven]).some((value) => value)
          : adminData[isGiven][isGivenInside];
      } else {
        return adminData[isGiven];
      }
    }
    return false;
  };

  return (
    <div>
      <div className="app-menu navbar-menu">
        <div className="-navbarbrand-box">
          <a href="index.html" className="logo logo-dark">
            <span className="logo-sm">
              <img src="/assets/img/logo-dark.png" alt="logo" height={35} />
            </span>
            <span className="logo-lg">
              <img src="/assets/img/logo-dark.png" alt="logo" height={55} />
            </span>
          </a>
          <a href="index.html" className="logo logo-light">
            <span className="logo-sm">
              <img src="/assets/img/logo-light.png" alt="logo" height={35} />
            </span>
            <span className="logo-lg">
              <img src="/assets/img/logo-light.png" alt="logo" height={55} />
            </span>
          </a>
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
          // className="h-100 simplebar-scrollable-y"
          // style={{ overflow: "auto" }}
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
              <li className="nav-item" hidden={!isPermission("manage_users")}>
                <a
                  className={`nav-link menu-link ${
                    (path === `/all-users` ||
                      path === `/active-users` ||
                      path === `/inactive-users` ||
                      path === `/email-verfied-users` ||
                      path === `/email-unverfied-users` ||
                      path === `/mobile-verified-users` ||
                      path === `/mobile-unverified-users` ||
                      path === `/notification-to-all`) &&
                    `active`
                  }`}
                  role="button"
                  href="#sidebarDashboards"
                  aria-expanded="false"
                  aria-controls="sidebarDashboards"
                  data-bs-toggle="collapse"
                >
                  <i className="ri-group-line" />
                  <span data-key="t-dashboards">Manage Users</span>
                </a>

                <div
                  className={`collapse menu-dropdown ${
                    (path === `/all-users` ||
                      path === `/active-users` ||
                      path === `/inactive-users` ||
                      path === `/email-verfied-users` ||
                      path === `/email-unverfied-users` ||
                      path === `/mobile-verified-users` ||
                      path === `/mobile-unverified-users` ||
                      path === `/notification-to-all`) &&
                    `show`
                  }`}
                  id="sidebarDashboards"
                >
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        to={"/all-users"}
                        className={`nav-link ${
                          path === `/all-users` && `active`
                        }`}
                        data-key="t-user"
                      >
                        All User
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"/active-users"}
                        className={`nav-link ${
                          path === `/active-users` && `active`
                        }`}
                        data-key="t-user"
                      >
                        Active Users
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        to={"/inactive-users"}
                        className={`nav-link ${
                          path === `/inactive-users` && `active`
                        }`}
                        data-key="t-user"
                      >
                        Inactive Users
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"/email-verfied-users"}
                        className={`nav-link ${
                          path === `/email-verfied-users` && `active`
                        }`}
                        data-key="t-user"
                      >
                        Email Verified Users
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"/email-unverfied-users"}
                        className={`nav-link ${
                          path === `/email-unverfied-users` && `active`
                        }`}
                        data-key="t-user"
                      >
                        Email Unverfied Users
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"/mobile-verified-users"}
                        className={`nav-link ${
                          path === `/mobile-verified-user` && `active`
                        }`}
                        data-key="t-user"
                      >
                        Mobile Verified Users
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"/mobile-unverified-users"}
                        className={`nav-link ${
                          path === `/mobile-unverified-users` && `active`
                        }`}
                        data-key="t-user"
                      >
                        Mobile Unverified Users
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"/notification-to-all"}
                        className={`nav-link ${
                          path === `/notification-to-all` && `active`
                        }`}
                        data-key="t-user"
                      >
                        Notification to All Users
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nav-item" hidden={adminData?.role === "sub-admin"}>
                <a
                  className={`nav-link menu-link ${
                    (path === `/add-staff` || path === `/staff`) && `active`
                  }`}
                  role="button"
                  href="#sidebar-staff"
                  aria-expanded="false"
                  aria-controls="sidebar-staff"
                  data-bs-toggle="collapse"
                >
                  <i className="ri-team-line" />
                  <span data-key="t-staff">Manage Staff</span>
                </a>

                <div
                  className={`collapse menu-dropdown ${
                    (path === `/add-staff` || path === `/staff`) && `show`
                  }`}
                  id="sidebar-staff"
                >
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        to={"/add-staff"}
                        className={`nav-link ${
                          path === `/add-staff` && `active`
                        }`}
                        data-key="t-staff"
                      >
                        Add Staff
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"/staff"}
                        className={`nav-link ${path === `/staff` && `active`}`}
                        data-key="t-subscribe-notifications"
                      >
                        Staff Members
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li
                className="nav-item"
                hidden={!isPermission("manage_events", "all")}
              >
                <a
                  className={`nav-link menu-link ${
                    (path === `/add-event` ||
                      path === `/events` ||
                      path === `/event-winnings` ||
                      path === `/event-winnings-list`) &&
                    `active`
                  }`}
                  role="button"
                  href="#sidebar-events"
                  aria-expanded="false"
                  aria-controls="sidebar-events"
                  data-bs-toggle="collapse"
                >
                  <i className="ri-gamepad-line" />
                  <span data-key="t-events">Manage Events</span>
                </a>

                <div
                  className={`collapse menu-dropdown ${
                    (path === `/add-event` ||
                      path === `/events` ||
                      path === `/event-winnings` ||
                      path === `/event-winnings-list`) &&
                    `show`
                  }`}
                  id="sidebar-events"
                >
                  <ul className="nav nav-sm flex-column">
                    <li
                      className="nav-item"
                      hidden={!isPermission("manage_events", "add_event")}
                    >
                      <Link
                        to={"/add-event"}
                        className={`nav-link ${
                          path === `/add-event` && `active`
                        }`}
                        data-key="t-events"
                      >
                        Add Event
                      </Link>
                    </li>
                    <li
                      className="nav-item"
                      hidden={!isPermission("manage_events", "events")}
                    >
                      <Link
                        to={"/events"}
                        className={`nav-link ${path === `/events` && `active`}`}
                        data-key="t-events"
                      >
                        All Events
                      </Link>
                    </li>
                    <li
                      className="nav-item"
                      hidden={!isPermission("manage_events", "add_winning")}
                    >
                      <Link
                        to={"/event-winnings"}
                        className={`nav-link ${
                          path === `/event-winnings` && `active`
                        }`}
                        data-key="t-events"
                      >
                        Set Event Winnings
                      </Link>
                    </li>{" "}
                    <li
                      className="nav-item"
                      hidden={
                        !isPermission(
                          "manage_events",
                          "uploaded_winning_history"
                        )
                      }
                    >
                      <Link
                        to={"/event-winnings-list"}
                        className={`nav-link ${
                          path === `/event-winnings-list` && `active`
                        }`}
                        data-key="t-events"
                      >
                        Event Win History
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li
                className="nav-item"
                hidden={!isPermission("manage_reports", "all")}
              >
                <a
                  className={`nav-link menu-link ${
                    (path === `/transaction-logs` ||
                      path === `/email-logs` ||
                      path === `/login-logs` ||
                      path === `/winning-logs`) &&
                    `active`
                  }`}
                  role="button"
                  href="#sidebar-reports"
                  aria-expanded="false"
                  aria-controls="sidebar-reports"
                  data-bs-toggle="collapse"
                >
                  <i className="ri-file-chart-line" />
                  <span data-key="t-subscribe">Manage Reports</span>
                </a>

                <div
                  className={`collapse menu-dropdown ${
                    (path === `/transaction-logs` ||
                      path === `/email-logs` ||
                      path === `/login-logs` ||
                      path === `/winning-logs`) &&
                    `show`
                  }`}
                  id="sidebar-reports"
                >
                  <ul className="nav nav-sm flex-column">
                    <li
                      className="nav-item"
                      hidden={!isPermission("manage_reports", "login_history")}
                    >
                      <Link
                        to={"/login-logs"}
                        className={`nav-link ${
                          path === `/login-logs` && `active`
                        }`}
                        data-key="t-subscribe-list"
                      >
                        Login Logs
                      </Link>
                    </li>
                    <li
                      className="nav-item"
                      hidden={!isPermission("manage_reports", "email_history")}
                    >
                      <Link
                        to={"/email-logs"}
                        className={`nav-link ${
                          path === `/email-logs` && `active`
                        }`}
                        data-key="t-subscribe-notifications"
                      >
                        Email Logs
                      </Link>
                    </li>
                    <li
                      className="nav-item"
                      hidden={
                        !isPermission("manage_reports", "transaction_log")
                      }
                    >
                      <Link
                        to={"/transaction-logs"}
                        className={`nav-link ${
                          path === `/transaction-logs` && `active`
                        }`}
                        data-key="t-subscribe-notifications"
                      >
                        Transaction Logs
                      </Link>
                    </li>
                    <li
                      className="nav-item"
                      hidden={!isPermission("manage_reports", "winning_log")}
                    >
                      <Link
                        to={"/winning-logs"}
                        className={`nav-link ${
                          path === `/winning-logs` && `active`
                        }`}
                        data-key="t-subscribe-notifications"
                      >
                        Winning Logs
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li
                className="nav-item"
                hidden={!isPermission("manage_deposits")}
              >
                <a
                  className={`nav-link menu-link ${
                    path === `/deposits` && `active`
                  }`}
                  role="button"
                  href="#sidebar-deposits"
                  aria-expanded="false"
                  aria-controls="sidebar-deposits"
                  data-bs-toggle="collapse"
                >
                  <i className="bx bx-dollar" />
                  <span data-key="t-deposits">Manage Deposits</span>
                </a>

                <div
                  className={`collapse menu-dropdown ${
                    path === `/deposits` && `show`
                  }`}
                  id="sidebar-deposits"
                >
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        to={"/deposits"}
                        className={`nav-link ${
                          path === `/deposits` && `active`
                        }`}
                        data-key="t-deposits"
                      >
                        Deposits
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>{" "}
              <li
                className="nav-item"
                hidden={!isPermission("manage_withdrawals")}
              >
                <a
                  className={`nav-link menu-link ${
                    (path === `/withdrawals` ||
                      path === `/pending-withdrawals` ||
                      path === `/approved-withdrawals` ||
                      path === `/rejected-withdrawals`) &&
                    `active`
                  }`}
                  role="button"
                  href="#sidebar-withdrawals"
                  aria-expanded="false"
                  aria-controls="sidebar-withdrawals"
                  data-bs-toggle="collapse"
                >
                  {/* <i className="ri-message-line" /> */}
                  <i className="bx bx-money-withdraw" />
                  <span data-key="t-withdrawals">Manage Withdrawals</span>
                </a>

                <div
                  className={`collapse menu-dropdown ${
                    (path === `/withdrawals` ||
                      path === `/pending-withdrawals` ||
                      path === `/approved-withdrawals` ||
                      path === `/rejected-withdrawals`) &&
                    `show`
                  }`}
                  id="sidebar-withdrawals"
                >
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        to={"/withdrawals"}
                        className={`nav-link ${
                          path === `/withdrawals` && `active`
                        }`}
                        data-key="t-withdrawals"
                      >
                        All Withdrawals
                      </Link>
                    </li>
                    {/* <li className="nav-item">
                      <Link
                        to={"/rejected-withdrawals"}
                        className={`nav-link ${
                          path === `/rejected-withdrawals` && `active`
                        }`}
                        data-key="t-withdrawals"
                      >
                        Rejected Withdrawals
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"/pending-withdrawals"}
                        className={`nav-link ${
                          path === `/pending-withdrawals` && `active`
                        }`}
                        data-key="t-withdrawals"
                      >
                        Pending Withdrawals
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"/approved-withdrawals"}
                        className={`nav-link ${
                          path === `/approved-withdrawals` && `active`
                        }`}
                        data-key="t-withdrawals"
                      >
                        Approved Withdrawals
                      </Link>
                    </li> */}
                  </ul>
                </div>
              </li>
              <li
                className="nav-item"
                hidden={!isPermission("manage_subscribers")}
              >
                <a
                  className={`nav-link menu-link ${
                    (path === `/subscribers-list` ||
                      path === `/subscribers-notifications`) &&
                    `active`
                  }`}
                  role="button"
                  href="#sidebar-subscription"
                  aria-expanded="false"
                  aria-controls="sidebar-subscription"
                  data-bs-toggle="collapse"
                >
                  <i className="ri-arrow-up-circle-line" />
                  <span data-key="t-subscription">Manage Subscriptions</span>
                </a>

                <div
                  className={`collapse menu-dropdown ${
                    (path === `/subscriptions-plans` ||
                      path === `/add-subscriptions` ||
                      path === `/user-subscriptions`) &&
                    `show`
                  }`}
                  id="sidebar-subscription"
                >
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        to={"/add-subscriptions"}
                        className={`nav-link ${
                          path === `/add-subscriptions` && `active`
                        }`}
                        data-key="t-subscription-add"
                      >
                        Add Subscription Plan
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"/subscriptions-plans"}
                        className={`nav-link ${
                          path === `/subscriptions-plans` && `active`
                        }`}
                        data-key="t-subscription-plan"
                      >
                        Subscriptions Plans
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"/user-subscriptions"}
                        className={`nav-link ${
                          path === `/user-subscriptions` && `active`
                        }`}
                        data-key="t-user-subscription"
                      >
                        User Subscriptions
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li
                className="nav-item"
                hidden={!isPermission("manage_subscribers")}
              >
                <a
                  className={`nav-link menu-link ${
                    (path === `/subscribers-list` ||
                      path === `/subscribers-notifications`) &&
                    `active`
                  }`}
                  role="button"
                  href="#sidebar-subscriber"
                  aria-expanded="false"
                  aria-controls="sidebar-subscriber"
                  data-bs-toggle="collapse"
                >
                  <i className="ri-rss-line" />
                  <span data-key="t-subscribe">Manage Subscribers</span>
                </a>

                <div
                  className={`collapse menu-dropdown ${
                    (path === `/subscribers-list` ||
                      path === `/subscribers-notifications`) &&
                    `show`
                  }`}
                  id="sidebar-subscriber"
                >
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        to={"/subscribers-list"}
                        className={`nav-link ${
                          path === `/subscribers-list` && `active`
                        }`}
                        data-key="t-subscribe-list"
                      >
                        Subscribers List
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"/subscribers-notifications"}
                        className={`nav-link ${
                          path === `/subscribers-notifications` && `active`
                        }`}
                        data-key="t-subscribe-notifications"
                      >
                        Notify All Subscribers
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li
                className="nav-item"
                hidden={!isPermission("manage_supportTickets")}
              >
                <a
                  className={`nav-link menu-link ${
                    path === `/support-tickets` && `active`
                  }`}
                  role="button"
                  href="#sidebar-support-ticket"
                  aria-expanded="false"
                  aria-controls="sidebar-support-ticket"
                  data-bs-toggle="collapse"
                >
                  <i className="ri-message-line" />
                  <span data-key="t-support-ticket">
                    Manage Support Tickets
                  </span>
                </a>

                <div
                  className={`collapse menu-dropdown ${
                    path === `/support-tickets` && `show`
                  }`}
                  id="sidebar-support-ticket"
                >
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        to={"/support-tickets"}
                        className={`nav-link ${
                          path === `/support-tickets` && `active`
                        }`}
                        data-key="t-support-ticket"
                      >
                        Support Tickets
                      </Link>
                    </li>
                    {/* <li className="nav-item">
                      <Link
                        to={"/subscribers-notifications"}
                        className={`nav-link ${
                          path === `/subscribers-notifications` && `active`
                        }`}
                        data-key="t-subscribe-notifications"
                      >
                        Notify All Subscribers
                      </Link>
                    </li> */}
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
