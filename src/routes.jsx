import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/dashboard/Dashboard";
import ProtectedRoute from "./protectedRoute";
import Profile from "./Pages/Profile/profile";
import ProfileEdit from "./Pages/Profile/profileEdit";
import Error from "./Pages/error/error";
import Login from "./Pages/login/login";
import React, { Suspense, useContext } from "react";
import Context from "./components/Context.js";
import Loader from "./utils/loader.jsx";
import ScrollToTopOnNavigate from "./components/ScrollToTopOnNavigate.jsx";
import AllMemos from "./Pages/memo/allMemos.jsx";
import TodaysMemos from "./Pages/memo/todaysMemo.jsx";
import ThisMonthMemos from "./Pages/memo/thisMonthMemo.jsx";
import UnseenMemos from "./Pages/memo/unseenMemos.jsx";
import AddOpertor from "./Pages/operator/addOpertor.jsx";
import OpertorList from "./Pages/operator/opertorList.jsx";
import AddMemo from "./Pages/memo/addMemo.jsx";
import ViewMemo from "./Pages/memo/viewMemo.jsx";
import AddOwner from "./Pages/owner/addOwner.jsx";
import OwnerList from "./Pages/owner/ownerList.jsx";
import LoginLogsOwner from "./Pages/owner/loginLogOwner.jsx";
import LoginLogsOperator from "./Pages/operator/loginLogOperator.jsx";
import EditMemo from "./Pages/memo/editMemo.jsx";
import Permission from "./Permission.jsx";
import DownloadApk from "./Pages/androidApplication/downloadApk.jsx";
import UploadApk from "./Pages/androidApplication/uploadApk.jsx";

export default function RoutePath() {
  const adminData = useContext(Context);

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
  const operatorPermissions = [
    "all-memos",
    "add-memo",
    "edit-memo",
    "view-memo",
    "today-memos",
    "Unseen-memos",
    "this-month-memos",
    "profile",
  ];
  const adminPermissions = [
    "all-memos",
    "edit-memo",
    "view-memo",
    "today-memos",
    "this-month-memos",
    "Unseen-memos",
    "profile",
    "profile-edit",
    "upload-apk",
    "add-owner",
    "owner-list",
    "owner-login-history",
    "add-operator",
    "operator-list",
    "operator-login-history",
  ];
  const isPermission = (route) => {
    if (adminData?.role === "operator") {
      return operatorPermissions.includes(route);
    } else {
      return adminPermissions.includes(route);
    }
  };

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <ScrollToTopOnNavigate />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/profile-edit"
              element={
                <Permission permission={isPermission("profile-edit")}>
                  <ProfileEdit />{" "}
                </Permission>
              }
            />
            <Route path="/all-memos" element={<AllMemos />} />
            <Route
              path="/add-memo"
              element={
                <Permission permission={isPermission("add-memo")}>
                  <AddMemo />
                </Permission>
              }
            />
            <Route path="/edit-memo/:id" element={<EditMemo />} />
            <Route path="/view-memo/:id" element={<ViewMemo />} />
            <Route path="/unseen-memos" element={<UnseenMemos />} />
            <Route path="/today-memos" element={<TodaysMemos />} />
            <Route path="/this-month-memos" element={<ThisMonthMemos />} />
            <Route
              path="/add-owner"
              element={
                <Permission permission={isPermission("add-owner")}>
                  <AddOwner />
                </Permission>
              }
            />
            <Route
              path="/owner-list"
              element={
                <Permission permission={isPermission("owner-list")}>
                  <OwnerList />
                </Permission>
              }
            />
            <Route
              path="/owner-login-history"
              element={
                <Permission permission={isPermission("owner-login-history")}>
                  <LoginLogsOwner />
                </Permission>
              }
            />
            <Route
              path="/add-operator"
              element={
                <Permission permission={isPermission("add-operator")}>
                  <AddOpertor />
                </Permission>
              }
            />
            <Route
              path="/operator-list"
              element={
                <Permission permission={isPermission("operator-list")}>
                  <OpertorList />
                </Permission>
              }
            />
            <Route
              path="/operator-login-history"
              element={
                <Permission permission={isPermission("operator-login-history")}>
                  <LoginLogsOperator />
                </Permission>
              }
            />
            <Route
              path="/upload-apk"
              element={
                <Permission permission={isPermission("upload-apk")}>
                  <UploadApk />
                </Permission>
              }
            />{" "}
            <Route path="/get-apk" element={<DownloadApk />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
