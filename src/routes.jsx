import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/dashboard/Dashboard";
import ProtectedRoute from "./protectedRoute";
import Profile from "./Pages/Profile/profile";
import ProfileEdit from "./Pages/Profile/profileEdit";
import SubscriberList from "./Pages/subscribers/subscriberList";
import SubscriberNotification from "./Pages/subscribers/subscriberNotification";
import Error from "./Pages/error/error";
import Registration from "./Pages/registeration/registration";
import Login from "./Pages/login/login";
import AllUsers from "./Pages/user/allUsers";
import ActiveUsers from "./Pages/user/activeUser";
import InActiveUsers from "./Pages/user/inactiveUser";
import EmailUnverfiedUsers from "./Pages/user/emailUnverfied";
import EmailVerfiedUsers from "./Pages/user/emailVerfied";
import MobileUnverfiedUsers from "./Pages/user/mobileUnverfiedUser";
import MobileVerfiedUsers from "./Pages/user/mobileVerfiedUser.jsx";
import NotificationToAllUsers from "./Pages/user/notificationToAllUsers.jsx";
import UserView from "./Pages/user/userView.jsx";
import StaffList from "./Pages/staff/staffList.jsx";
import AddStaff from "./Pages/staff/addStaff.jsx";
import EditStaff from "./Pages/staff/editStaff.jsx";
import { Suspense, useContext } from "react";
import Context from "./components/Context.js";
import SupportTicket from "./Pages/supportTicket/supportTicket.jsx";
import SupportTicketView from "./Pages/supportTicket/supportTicketView.jsx";
import TransactionLog from "./Pages/reports/transactionLog.jsx";
import LoginLogs from "./Pages/reports/loginLog.jsx";
import Deposits from "./Pages/deposits/deposits.jsx";
import AllWithdrawals from "./Pages/withdrawals/allWithdrawals.jsx";
import RejectedWithdrawals from "./Pages/withdrawals/rejectedWithdrawals.jsx";
import PendingWithdrawals from "./Pages/withdrawals/PendingWithdrawals.jsx";
import ApprovedWithdrawals from "./Pages/withdrawals/approvedWithdrawals.jsx";
import AllEvents from "./Pages/events/allEvents.jsx";
import AddEvent from "./Pages/events/addEvent.jsx";
import Loader from "./utils/loader.jsx";
import Permission from "./Permission.jsx";
import EditEvent from "./Pages/events/editEvent.jsx";
import ViewEvent from "./Pages/events/viewEvent.jsx";
import EmailLogsView from "./Pages/reports/emailLogs/emailLogView.jsx";
import EmailLogs from "./Pages/reports/emailLogs/emailLog.jsx";
import WithdrawalsView from "./Pages/withdrawals/withdrawalsView.jsx";
import DepositsView from "./Pages/deposits/depositsView.jsx";
import TwoFactorError from "./Pages/2fa/twoFactorError.jsx";
import TwoFactor from "./Pages/2fa/twoFactor.jsx";

export default function RoutePath() {
  const adminData = useContext(Context);
  const id = localStorage.getItem("id");

  // const isPermission = (isGiven, isGivenInside) => {
  //   const isAdmin = adminData?.role === "admin";
  //   const isSubAdmin = adminData?.role === "sub-admin";
  //   if (isAdmin) {
  //     return true;
  //   }
  //   if (isSubAdmin) {
  //     if (typeof adminData[isGiven] === "object") {
  //       return isGivenInside === "all"
  //         ? Object.values(adminData[isGiven]).some((value) => value)
  //         : adminData[isGiven][isGivenInside];
  //     } else {
  //       return adminData[isGiven];
  //     }
  //   }
  //   return false;
  // };

  const isPermission = (isGiven, isGivenInside) => {
    const isAdmin = adminData?.role === "admin";
    const isSubAdmin = adminData?.role === "sub-admin";
    if (isAdmin) {
      return true;
    }
    const adminProperty = adminData[isGiven];
    if (isSubAdmin) {
      if (typeof adminProperty === "object") {
        return isGivenInside === "all"
          ? Object.keys(adminProperty).some((key) => adminProperty[key])
          : adminProperty[isGivenInside];
      } else {
        return adminProperty;
      }
    }
  };

  return (
    <HashRouter basename="/">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route
              path="/"
              element={
                <Permission permission={true}>
                  <Dashboard />
                </Permission>
              }
            />
            <Route
              path="/profile"
              element={
                <Permission permission={true}>
                  <Profile />
                </Permission>
              }
            />
            <Route
              path="/profile-edit"
              element={
                <Permission permission={true}>
                  <ProfileEdit />
                </Permission>
              }
            />
            <Route
              path="/subscribers-list"
              element={
                <Permission permission={isPermission("manage_subscribers")}>
                  <SubscriberList />
                </Permission>
              }
            />
            <Route
              path="/subscribers-notifications"
              element={
                <Permission permission={isPermission("manage_subscribers")}>
                  <SubscriberNotification />
                </Permission>
              }
            />
            <Route
              path="/all-users"
              element={
                <Permission permission={isPermission("manage_users")}>
                  <AllUsers />
                </Permission>
              }
            />
            <Route
              path="/active-users"
              element={
                <Permission permission={isPermission("manage_users")}>
                  <ActiveUsers />
                </Permission>
              }
            />
            <Route
              path="/inactive-users"
              element={
                <Permission permission={isPermission("manage_users")}>
                  <InActiveUsers />
                </Permission>
              }
            />
            <Route
              path="/email-verfied-users"
              element={
                <Permission permission={isPermission("manage_users")}>
                  <EmailVerfiedUsers />
                </Permission>
              }
            />
            <Route
              path="/email-unverfied-users"
              element={
                <Permission permission={isPermission("manage_users")}>
                  <EmailUnverfiedUsers />
                </Permission>
              }
            />
            <Route
              path="/mobile-verified-users"
              element={
                <Permission permission={isPermission("manage_users")}>
                  <MobileVerfiedUsers />
                </Permission>
              }
            />
            <Route
              path="/mobile-unverified-users"
              element={
                <Permission permission={isPermission("manage_users")}>
                  <MobileUnverfiedUsers />
                </Permission>
              }
            />
            <Route
              path="/notification-to-all"
              element={
                <Permission permission={isPermission("manage_users")}>
                  <NotificationToAllUsers />
                </Permission>
              }
            />
            <Route
              path="/user/:id"
              element={
                <Permission permission={isPermission("manage_users")}>
                  <UserView />
                </Permission>
              }
            />
            <Route
              path="/add-staff"
              element={
                <Permission permission={adminData?.role === "admin" && true}>
                  <AddStaff />
                </Permission>
              }
            />
            <Route
              path="/staff"
              element={
                <Permission permission={adminData?.role === "admin" && true}>
                  <StaffList />
                </Permission>
              }
            />
            <Route
              path="/staff/:id"
              element={
                <Permission permission={adminData?.role === "admin" && true}>
                  <EditStaff />
                </Permission>
              }
            />
            <Route
              path="/support-tickets"
              element={
                <Permission permission={isPermission("manage_supportTickets")}>
                  <SupportTicket />
                </Permission>
              }
            />
            <Route
              path="/support-tickets/:id"
              element={
                <Permission permission={isPermission("manage_supportTickets")}>
                  <SupportTicketView />
                </Permission>
              }
            />

            <Route
              path="/transaction-logs"
              element={
                <Permission
                  permission={isPermission(
                    "manage_reports",
                    "transaction_logs"
                  )}
                >
                  <TransactionLog />
                </Permission>
              }
            />
            <Route
              path="/email-logs"
              element={
                <Permission
                  permission={isPermission("manage_reports", "email_history")}
                >
                  <EmailLogs />
                </Permission>
              }
            />
            <Route
              path="/email-logs/:id"
              element={
                <Permission
                  permission={isPermission("manage_reports", "email_history")}
                >
                  <EmailLogsView />
                </Permission>
              }
            />
            <Route
              path="/login-logs"
              element={
                <Permission
                  permission={isPermission("manage_reports", "login_history")}
                >
                  <LoginLogs />
                </Permission>
              }
            />
            <Route
              path="/deposits"
              element={
                <Permission permission={isPermission("manage_deposits")}>
                  <Deposits />
                </Permission>
              }
            />
            <Route
              path="/deposits/:id"
              element={
                <Permission permission={isPermission("manage_deposits")}>
                  <DepositsView />
                </Permission>
              }
            />
            <Route
              path="/withdrawals"
              element={
                <Permission permission={isPermission("manage_withdrawals")}>
                  <AllWithdrawals />
                </Permission>
              }
            />
            <Route
              path="/rejected-withdrawals"
              element={
                <Permission permission={isPermission("manage_withdrawals")}>
                  <RejectedWithdrawals />
                </Permission>
              }
            />
            <Route
              path="/pending-withdrawals"
              element={
                <Permission permission={isPermission("manage_withdrawals")}>
                  <PendingWithdrawals />
                </Permission>
              }
            />
            <Route
              path="/approved-withdrawals"
              element={
                <Permission permission={isPermission("manage_withdrawals")}>
                  <ApprovedWithdrawals />
                </Permission>
              }
            />
            <Route
              path="/withdrawals/:id"
              element={
                <Permission permission={isPermission("manage_withdrawals")}>
                  <WithdrawalsView />
                </Permission>
              }
            />
            <Route
              path="/add-event"
              element={
                <Permission
                  permission={isPermission("manage_events", "add_event")}
                >
                  <AddEvent />
                </Permission>
              }
            />
            <Route
              path="/events"
              element={
                <Permission
                  permission={isPermission("manage_events", "events")}
                >
                  <AllEvents />
                </Permission>
              }
            />

            <Route
              path="/view-event/:id"
              element={
                <Permission
                  permission={isPermission("manage_events", "events")}
                >
                  <ViewEvent />
                </Permission>
              }
            />
            <Route
              path="/edit-event/:id"
              element={
                <Permission
                  permission={isPermission("manage_events", "add_event")}
                >
                  <EditEvent />
                </Permission>
              }
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route
            path="/session/two-factor-required"
            element={<TwoFactorError />}
          />
          <Route path="/session/two-factor" element={<TwoFactor />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}
