import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdmin,
  fetchUserDetails,
  loginLogsDetails,
} from "../../features/apiSlice";
import Layout from "../../components/Layout";
import * as echarts from "echarts";
import ReactEcharts from "echarts-for-react";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Dashboard() {
  const dispatch = useDispatch();
  const {
    data: user,
    status,
    error,
    userDetailsData,
    loginLogsDetailsData,
  } = useSelector((state) => state.api);
  const userId = localStorage.getItem("id");

  const userDetail = userDetailsData?.[0];

  useEffect(() => {
    dispatch(fetchAdmin(userId));
    dispatch(fetchUserDetails());
    dispatch(loginLogsDetails());
  }, [dispatch]);

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);
  console.log(loginLogsDetailsData);
  const dashboardContent = [
    {
      id: 1,
      title: "Users",
      count: userDetail?.Total_Users,
      hike: true,
      percent: 16.24,
      icon: "ri-group-line",
      color: "info",
    },
    {
      id: 2,
      title: "Active Users",
      count: userDetail?.active_accounts,
      hike: true,
      percent: 10,
      icon: "ri-user-follow-line",
      color: "success",
    },
    {
      id: 3,
      title: "Inactive Users",
      count: userDetail?.inactive_accounts,
      hike: true,
      percent: 30,
      icon: "ri-user-unfollow-line",
      color: "danger",
    },
    {
      id: 4,
      title: "Email Verified Users",
      count: userDetail?.email_verified,
      hike: true,
      percent: 56.24,
      icon: "ri-mail-check-line",
      color: "info",
    },
    // {
    //   id: 5,
    //   title: "Email Unverified Users",
    //   count: userDetail?.email_unverified,
    //   hike: false,
    //   percent: 16.24,
    //   icon: "ri-mail-close-line",
    //   color: "info",
    // },
    // {
    //   id: 6,
    //   title: "Mobile Verified Users",
    //   count: userDetail?.sms_verified,
    //   hike: true,
    //   percent: 16.24,
    //   icon: "ri-phone-line",
    //   color: "info",
    // },
    // {
    //   id: 7,
    //   title: "Mobile Unverified Users",
    //   count: userDetail?.sms_unverified,
    //   hike: false,
    //   percent: 6.24,
    //   icon: "ri-phone-line",
    //   color: "warning",
    // },
    // {
    //   id: 8,
    //   title: "Deposits",
    //   count: "1000",
    //   hike: true,
    //   percent: 66.24,
    //   icon: " ri-money-dollar-circle-line",
    //   color: "primary",
    // },
    // {
    //   id: 9,
    //   title: "Withdrawals",
    //   count: "1000",
    //   hike: true,
    //   percent: 66.24,
    //   icon: " ri-safe-2-line",
    //   color: "success",
    // },
    // {
    //   id: 10,
    //   title: "Rejected Withdrawals",
    //   count: "1000",
    //   hike: true,
    //   percent: 66.24,
    //   icon: " ri-safe-2-line",
    //   color: "danger",
    // },
  ];

  // console.log(userDetailsData);

  const data = [
    { value: 335, name: "A" },
    { value: 310, name: "B" },
    { value: 234, name: "C" },
    { value: 135, name: "D" },
    { value: 154, name: "E" },
  ];

  const optionOs = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "bottom",
    },
    // toolbox: {
    //   show: true,
    //   feature: {
    //     mark: { show: true },
    //     dataView: { show: true, readOnly: false },
    //     restore: { show: true },
    //     saveAsImage: { show: true },
    //   },
    // },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["45%", "80%"],
        avoidLabelOverlap: false,
        bottom: "40",
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },

        data: loginLogsDetailsData?.os,
      },
    ],
  };
  const optionBrowsers = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "bottom",
    },
    // toolbox: {
    //   show: true,
    //   feature: {
    //     mark: { show: true },
    //     dataView: { show: true, readOnly: false },
    //     restore: { show: true },
    //     saveAsImage: { show: true },
    //   },
    // },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["45%", "80%"],
        avoidLabelOverlap: false,
        bottom: "40",
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },

        data: loginLogsDetailsData?.browser,
      },
    ],
  };

  const userDetails = {
    // title: {
    //   text: "Referer of a Website",
    //   subtext: "Fake Data",
    //   left: "center",
    // },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "80%",
        data: [
          { value: userDetail?.Total_Users, name: "Total Users" },
          { value: userDetail?.active_accounts, name: "Active Users" },
          { value: userDetail?.inactive_accounts, name: "Inactive Users" },
          { value: userDetail?.email_verified, name: "Email Verified" },
          { value: userDetail?.email_unverified, name: "Email Unverified" },
          { value: userDetail?.sms_verified, name: "Mobile Verified" },
          { value: userDetail?.sms_unverified, name: "Mobile Unverified" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  const option3 = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      show: false,
    },
    grid: {
      top: "5%",
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "value",
      },
    ],
    yAxis: [
      {
        type: "category",
        axisTick: {
          show: false,
        },
        data: loginLogsDetailsData?.country?.map((item) => item.name),
      },
    ],

    series: [
      {
        name: "Users",
        type: "bar",
        label: {
          show: true,
          position: "inside",
        },
        emphasis: {
          focus: "series",
        },
        data: loginLogsDetailsData?.country?.map((item) => item.value),
      },
    ],
  };

  console.log(userDetail);

  return (
    <Layout>
      <div>
        {/* <div className="row">
          <div className="col-12">
            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
              <h4 className="mb-sm-0">Analytics</h4>
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <a>Dashboards</a>
                  </li>
                  <li className="breadcrumb-item active">Analytics</li>
                </ol>
              </div>
            </div>
          </div>
        </div> */}

        <div className="row">
          <div className="">
            <div className="d-flex flex-column h-100">
              <div className="row h-100"> </div>
              <div className="row">
                <div className="row">
                  {dashboardContent.length > 0 &&
                    dashboardContent.map((item) => (
                      <div className="col-xl-3 col-md-6">
                        {/* card */}
                        <div className="card card-animate">
                          <div className="card-body">
                            <div className="d-flex align-items-center">
                              <div className="flex-grow-1 overflow-hidden">
                                <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                  {item?.title}
                                </p>
                              </div>
                              <div className="flex-shrink-0">
                                <h5
                                  className={`text-${
                                    item?.hike ? `success` : `danger`
                                  } fs-14 mb-0`}
                                >
                                  <i
                                    className={`${
                                      item?.hike
                                        ? `ri-arrow-right-up-line`
                                        : `ri-arrow-right-down-line`
                                    } fs-13 align-middle`}
                                  />
                                  +16.24 %
                                </h5>
                              </div>
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                              <div>
                                <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                  <span
                                    className="counter-value"
                                    data-target="559.25"
                                  >
                                    {item?.count}
                                  </span>
                                </h4>
                                <a href className="text-decoration-underline">
                                  View net earnings
                                </a>
                              </div>
                              <div className="avatar-sm flex-shrink-0">
                                <span
                                  className={`avatar-title bg-${item?.color}-subtle rounded fs-3`}
                                >
                                  <i
                                    className={`text-${item?.color} ${item?.icon}`}
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* end card body */}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xxl-12">
              <div className="row h-100">
                <div className="col-xl-12">
                  <div className="card card-height-100">
                    <div className="card-header align-items-center d-flex">
                      <h4 className="card-title mb-0 flex-grow-1">
                        Live Users Stats
                      </h4>
                      <div className="flex-shrink-0">
                        <button
                          type="button"
                          className="btn btn-soft-primary btn-sm"
                        >
                          Export Report
                        </button>
                      </div>
                    </div>

                    <div className="card-body">
                      <ReactEcharts
                        option={userDetails}
                        className="apex-charts"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-12">
              <div className="card card-height-100">
                <div className="card-header align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">
                    Session By Country
                  </h4>
                  <div className="flex-shrink-0">
                    <a href="#!" className="btn btn-soft-primary btn-sm">
                      View All Companies
                      <i className="ri-arrow-right-line align-bottom" />
                    </a>
                  </div>
                </div>

                <div className="card-body p-0">
                  <ReactEcharts option={option3} />

                  {/* <div className="align-items-center mt-4 pt-2 justify-content-between d-md-flex">
                    <div className="flex-shrink-0 mb-2 mb-md-0">
                      <div className="text-muted">
                        Showing <span className="fw-semibold">5</span> of
                        <span className="fw-semibold">25</span> Results
                      </div>
                    </div>
                    <ul className="pagination pagination-separated pagination-sm mb-0">
                      <li className="page-item disabled">
                        <a href="#" className="page-link">
                          ←
                        </a>
                      </li>
                      <li className="page-item">
                        <a href="#" className="page-link">
                          1
                        </a>
                      </li>
                      <li className="page-item active">
                        <a href="#" className="page-link">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a href="#" className="page-link">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a href="#" className="page-link">
                          →
                        </a>
                      </li>
                    </ul>
                  </div> */}
                </div>
              </div>
              {/* .card*/}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-6">
            <div className="card card-height-100">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">Users by OS</h4>
                <div className="flex-shrink-0">
                  <div className="dropdown card-header-dropdown">
                    <a
                      className="text-reset dropdown-btn"
                      href="#"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="text-muted fs-16">
                        <i className="mdi mdi-dots-vertical align-middle" />
                      </span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">
                      <a className="dropdown-item" href="#">
                        Today
                      </a>
                      <a className="dropdown-item" href="#">
                        Last Week
                      </a>
                      <a className="dropdown-item" href="#">
                        Last Month
                      </a>
                      <a className="dropdown-item" href="#">
                        Current Year
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <ReactEcharts option={optionBrowsers} className="apex-charts" />
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="card card-height-100">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">
                  Users by Browsers
                </h4>
                <div className="flex-shrink-0">
                  <div className="dropdown card-header-dropdown">
                    <a
                      className="text-reset dropdown-btn"
                      href="#"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <span className="text-muted fs-16">
                        <i className="mdi mdi-dots-vertical align-middle" />
                      </span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-end">
                      <a className="dropdown-item" href="#">
                        Today
                      </a>
                      <a className="dropdown-item" href="#">
                        Last Week
                      </a>
                      <a className="dropdown-item" href="#">
                        Last Month
                      </a>
                      <a className="dropdown-item" href="#">
                        Current Year
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-body">
                <ReactEcharts option={optionOs} className="apex-charts" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
