import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdmin, fetchUserDetails } from "../../features/apiSlice";
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
  } = useSelector((state) => state.api);
  const userId = localStorage.getItem("id");

  const userDetail = userDetailsData?.[0];

  useEffect(() => {
    dispatch(fetchAdmin(userId));
    dispatch(fetchUserDetails());
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

  const option = {
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

        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
      },
    ],
  };

  const option2 = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    dataset: {
      source: [
        ["score", "amount", "product"],
        [57.1, userDetail?.sms_unverified, "Mobile Unverified"],
        [34, userDetail?.sms_verified, "Mobile Verified"],
        [50.1, userDetail?.email_unverified, "Email Unverified"],
        [16.7, userDetail?.email_verified, "Email Verified"],
        [68.1, userDetail?.inactive_accounts, "Inactive"],
        [11, userDetail?.active_accounts, "Active "],
      ],
    },
    grid: { containLabel: true },
    xAxis: { name: "amount" },
    yAxis: { type: "category" },
    // visualMap: {
    //   orient: "horizontal",
    //   left: "center",
    //   min: 10,
    //   max: 100,
    //   text: ["High Score", "Low Score"],
    //   // Map the score column to color
    //   dimension: 0,
    //   inRange: {
    //     color: ["#65B581", "#FFCE34", "#FD665F"],
    //   },
    // },
    series: [
      {
        type: "bar",
        encode: {
          // Map the "amount" column to X axis.
          x: "amount",
          // Map the "product" column to Y axis
          y: "product",
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
        data: ["India", "USA", "South Korea", "Russia"],
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
        data: [200, 170, 240, 244, 200, 220, 210],
      },
    ],
  };

  console.log(userDetail);

  const option4 = {
    title: {
      text: "Stacked Line",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "Email",
        type: "line",
        stack: "Total",
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "Union Ads",
        type: "line",
        stack: "Total",
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "Video Ads",
        type: "line",
        stack: "Total",
        data: [150, 232, 201, 154, 190, 330, 410],
      },
      {
        name: "Direct",
        type: "line",
        stack: "Total",
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        name: "Search Engine",
        type: "line",
        stack: "Total",
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  };

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

        {/*  */}
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
                        {/* end card */}
                      </div>
                    ))}
                </div>

                {/* {dashboardContent.length > 0 &&
                  dashboardContent.map((item) => (
                    <div className="col-md-6" key={item?.id}>
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div>
                              <p className="fw-medium text-muted mb-0">
                                {item?.title}
                              </p>
                              <h2 className="mt-4 ff-secondary fw-semibold">
                                <span
                                  className="counter-value"
                                  data-target="28.05"
                                >
                                  {item?.count}
                                </span>
                              </h2>
                              <p className="mb-0 text-muted">
                                <span
                                  className={`badge bg-light text-${
                                    item?.hike ? `success` : `danger`
                                  } mb-0`}
                                >
                                  <i
                                    className={`${
                                      item?.hike
                                        ? `ri-arrow-up-line`
                                        : `ri-arrow-down-line`
                                    } align-middle`}
                                  />
                                  {item?.percent} %
                                </span>
                                vs. previous month
                              </p>
                            </div>
                            <div>
                              <div className="avatar-sm flex-shrink-0">
                                <span
                                  className={`avatar-title bg-${item?.color}-subtle rounded-circle fs-2`}
                                >
                                  <i
                                    data-feather="users"
                                    className={`text-${item?.color} ${item?.icon}`}
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))} */}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-6">
              <div className="d-flex flex-column h-100">
                <div className="row">
                  <div className="col-xl-6 col-md-6">
                    <div className="card card-animate overflow-hidden">
                      <div
                        className="position-absolute start-0"
                        style={{ zIndex: 0 }}
                      >
                        <svg
                          version="1.2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 200 120"
                          width={200}
                          height={120}
                        >
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n                                                            .s0 {\n                                                                opacity: .05;\n                                                                fill: var(--vz-success)\n                                                            }\n                                                        ",
                            }}
                          />
                          <path
                            id="Shape 8"
                            className="s0"
                            d="m189.5-25.8c0 0 20.1 46.2-26.7 71.4 0 0-60 15.4-62.3 65.3-2.2 49.8-50.6 59.3-57.8 61.5-7.2 2.3-60.8 0-60.8 0l-11.9-199.4z"
                          />
                        </svg>
                      </div>
                      <div className="card-body" style={{ zIndex: 1 }}>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase fw-medium text-muted text-truncate mb-3">
                              {" "}
                              Total Jobs
                            </p>
                            <h4 className="fs-22 fw-semibold ff-secondary mb-0">
                              <span
                                className="counter-value"
                                data-target={36894}
                              >
                                0
                              </span>
                            </h4>
                          </div>
                          <div className="flex-shrink-0">
                            <CircularProgressbar
                              value={55}
                              text={`${55}%`}
                              strokeWidth={10}
                            />
                          </div>
                        </div>
                      </div>
                      {/* end card body */}
                    </div>
                    {/* end card */}
                  </div>
                  {/*end col*/}
                  <div className="col-xl-6 col-md-6">
                    {/* card */}
                    <div className="card card-animate overflow-hidden">
                      <div
                        className="position-absolute start-0"
                        style={{ zIndex: 0 }}
                      >
                        <svg
                          version="1.2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 200 120"
                          width={200}
                          height={120}
                        >
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n                                                            .s0 {\n                                                                opacity: .05;\n                                                                fill: var(--vz-success)\n                                                            }\n                                                        ",
                            }}
                          />
                          <path
                            id="Shape 8"
                            className="s0"
                            d="m189.5-25.8c0 0 20.1 46.2-26.7 71.4 0 0-60 15.4-62.3 65.3-2.2 49.8-50.6 59.3-57.8 61.5-7.2 2.3-60.8 0-60.8 0l-11.9-199.4z"
                          />
                        </svg>
                      </div>
                      <div className="card-body" style={{ zIndex: 1 }}>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase fw-medium text-muted text-truncate mb-3">
                              {" "}
                              Apply Jobs
                            </p>
                            <h4 className="fs-22 fw-semibold ff-secondary mb-0">
                              <span
                                className="counter-value"
                                data-target={28410}
                              >
                                0
                              </span>
                            </h4>
                          </div>
                          <div className="flex-shrink-0">
                            <div
                              id="apply_jobs"
                              data-colors='["--vz-success"]'
                              className="apex-charts"
                              dir="ltr"
                            />
                          </div>
                        </div>
                      </div>
                      {/* end card body */}
                    </div>
                    {/* end card */}
                  </div>
                  {/* end col */}
                  <div className="col-xl-6 col-md-6">
                    {/* card */}
                    <div className="card card-animate overflow-hidden">
                      <div
                        className="position-absolute start-0"
                        style={{ zIndex: 0 }}
                      >
                        <svg
                          version="1.2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 200 120"
                          width={200}
                          height={120}
                        >
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n                                                            .s0 {\n                                                                opacity: .05;\n                                                                fill: var(--vz-success)\n                                                            }\n                                                        ",
                            }}
                          />
                          <path
                            id="Shape 8"
                            className="s0"
                            d="m189.5-25.8c0 0 20.1 46.2-26.7 71.4 0 0-60 15.4-62.3 65.3-2.2 49.8-50.6 59.3-57.8 61.5-7.2 2.3-60.8 0-60.8 0l-11.9-199.4z"
                          />
                        </svg>
                      </div>
                      <div className="card-body" style={{ zIndex: 1 }}>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase fw-medium text-muted text-truncate mb-3">
                              New Jobs
                            </p>
                            <h4 className="fs-22 fw-semibold ff-secondary mb-0">
                              <span
                                className="counter-value"
                                data-target={4305}
                              >
                                0
                              </span>
                            </h4>
                          </div>
                          <div className="flex-shrink-0">
                            <div
                              id="new_jobs_chart"
                              data-colors='["--vz-success"]'
                              className="apex-charts"
                              dir="ltr"
                            />
                          </div>
                        </div>
                      </div>
                      {/* end card body */}
                    </div>
                    {/* end card */}
                  </div>
                  {/* end col */}
                  <div className="col-xl-6 col-md-6">
                    {/* card */}
                    <div className="card card-animate overflow-hidden">
                      <div
                        className="position-absolute start-0"
                        style={{ zIndex: 0 }}
                      >
                        <svg
                          version="1.2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 200 120"
                          width={200}
                          height={120}
                        >
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n                                                            .s0 {\n                                                                opacity: .05;\n                                                                fill: var(--vz-success)\n                                                            }\n                                                        ",
                            }}
                          />
                          <path
                            id="Shape 8"
                            className="s0"
                            d="m189.5-25.8c0 0 20.1 46.2-26.7 71.4 0 0-60 15.4-62.3 65.3-2.2 49.8-50.6 59.3-57.8 61.5-7.2 2.3-60.8 0-60.8 0l-11.9-199.4z"
                          />
                        </svg>
                      </div>
                      <div className="card-body" style={{ zIndex: 1 }}>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase fw-medium text-muted text-truncate mb-3">
                              {" "}
                              Interview
                            </p>
                            <h4 className="fs-22 fw-semibold ff-secondary mb-0">
                              <span
                                className="counter-value"
                                data-target={5021}
                              >
                                0
                              </span>
                            </h4>
                          </div>
                          <div className="flex-shrink-0">
                            <div
                              id="interview_chart"
                              data-colors='["--vz-danger"]'
                              className="apex-charts"
                              dir="ltr"
                            />
                          </div>
                        </div>
                      </div>
                      {/* end card body */}
                    </div>
                    {/* end card */}
                  </div>
                  {/* end col */}
                  <div className="col-xl-6 col-md-6">
                    <div className="card card-animate overflow-hidden">
                      <div
                        className="position-absolute start-0"
                        style={{ zIndex: 0 }}
                      >
                        <svg
                          version="1.2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 200 120"
                          width={200}
                          height={120}
                        >
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n                                                            .s0 {\n                                                                opacity: .05;\n                                                                fill: var(--vz-success)\n                                                            }\n                                                        ",
                            }}
                          />
                          <path
                            id="Shape 8"
                            className="s0"
                            d="m189.5-25.8c0 0 20.1 46.2-26.7 71.4 0 0-60 15.4-62.3 65.3-2.2 49.8-50.6 59.3-57.8 61.5-7.2 2.3-60.8 0-60.8 0l-11.9-199.4z"
                          />
                        </svg>
                      </div>
                      <div className="card-body" style={{ zIndex: 1 }}>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase fw-medium text-muted text-truncate mb-3">
                              {" "}
                              Hired
                            </p>
                            <h4 className="fs-22 fw-semibold ff-secondary mb-0">
                              <span
                                className="counter-value"
                                data-target={3948}
                              >
                                0
                              </span>
                            </h4>
                          </div>
                          <div className="flex-shrink-0">
                            <div
                              id="hired_chart"
                              data-colors='["--vz-success"]'
                              className="apex-charts"
                              dir="ltr"
                            />
                          </div>
                        </div>
                      </div>
                      {/* end card body */}
                    </div>
                    {/* end card */}
                  </div>
                  {/*end col*/}
                  <div className="col-xl-6 col-md-6">
                    {/* card */}
                    <div className="card card-animate overflow-hidden">
                      <div
                        className="position-absolute start-0"
                        style={{ zIndex: 0 }}
                      >
                        <svg
                          version="1.2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 200 120"
                          width={200}
                          height={120}
                        >
                          <style
                            dangerouslySetInnerHTML={{
                              __html:
                                "\n                                                            .s0 {\n                                                                opacity: .05;\n                                                                fill: var(--vz-success)\n                                                            }\n                                                        ",
                            }}
                          />
                          <path
                            id="Shape 8"
                            className="s0"
                            d="m189.5-25.8c0 0 20.1 46.2-26.7 71.4 0 0-60 15.4-62.3 65.3-2.2 49.8-50.6 59.3-57.8 61.5-7.2 2.3-60.8 0-60.8 0l-11.9-199.4z"
                          />
                        </svg>
                      </div>
                      <div className="card-body" style={{ zIndex: 1 }}>
                        <div className="d-flex align-items-center">
                          <div className="flex-grow-1 overflow-hidden">
                            <p className="text-uppercase fw-medium text-muted text-truncate mb-3">
                              Rejected
                            </p>
                            <h4 className="fs-22 fw-semibold ff-secondary mb-0">
                              <span
                                className="counter-value"
                                data-target={1340}
                              >
                                0
                              </span>
                            </h4>
                          </div>
                          <div className="flex-shrink-0">
                            <div
                              id="rejected_chart"
                              data-colors='["--vz-danger"]'
                              className="apex-charts"
                              dir="ltr"
                            />
                          </div>
                        </div>
                      </div>
                      {/* end card body */}
                    </div>
                    {/* end card */}
                  </div>
                  {/* end col */}
                </div>
                {/*end row*/}
              </div>
            </div>
            {/*end col*/}
            <div className="col-xl-6">
              <div className="card card-height-100">
                <div className="card-header align-items-center d-flex">
                  <h4 className="card-title mb-0 flex-grow-1">
                    Session By Country
                  </h4>
                  <div className="flex-shrink-0">
                    <a href="#!" className="btn btn-soft-primary btn-sm">
                      View All Companies{" "}
                      <i className="ri-arrow-right-line align-bottom" />
                    </a>
                  </div>
                </div>
                {/* end card header */}
                <div className="card-body p-0">
                  <ReactEcharts option={option3} />

                  {/* <div className="align-items-center mt-4 pt-2 justify-content-between d-md-flex">
                    <div className="flex-shrink-0 mb-2 mb-md-0">
                      <div className="text-muted">
                        Showing <span className="fw-semibold">5</span> of{" "}
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
              </div>{" "}
              {/* .card*/}
            </div>
            {/*end col*/}
          </div>
          {/*end row*/}

          <div className="col-xxl-7">
            <div className="row h-100">
              <div className="col-xl-6">
                <div className="card card-height-100">
                  <div className="card-header align-items-center d-flex">
                    <h4 className="card-title mb-0 flex-grow-1">
                      Live Users By Country
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
                  {/* end card header */}
                  {/* card body */}
                  <div className="card-body">
                    <div
                      id="users-by-country"
                      data-colors='["--vz-light"]'
                      className="text-center"
                      style={{ height: 252 }}
                    />

                    <div className="table-responsive table-card mt-3">
                      <table className="table table-borderless table-sm table-centered align-middle table-nowrap mb-1">
                        <thead className="text-muted border-dashed border border-start-0 border-end-0 bg-light-subtle">
                          <tr>
                            <th>Duration (Secs)</th>
                            <th style={{ width: "30%" }}>Sessions</th>
                            <th style={{ width: "30%" }}>Views</th>
                          </tr>
                        </thead>
                        <tbody className="border-0">
                          <tr>
                            <td>0-30</td>
                            <td>2,250</td>
                            <td>4,250</td>
                          </tr>
                          <tr>
                            <td>31-60</td>
                            <td>1,501</td>
                            <td>2,050</td>
                          </tr>
                          <tr>
                            <td>61-120</td>
                            <td>750</td>
                            <td>1,600</td>
                          </tr>
                          <tr>
                            <td>121-240</td>
                            <td>540</td>
                            <td>1,040</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* end card */}
              </div>
              {/* end col */}
              <div className="col-xl-6">
                <div className="card card-height-100">
                  <div className="card-header align-items-center d-flex">
                    <h4 className="card-title mb-0 flex-grow-1">
                      Sessions by Countries
                    </h4>
                    <div>
                      <button
                        type="button"
                        className="btn btn-soft-secondary btn-sm"
                      >
                        ALL
                      </button>
                      <button
                        type="button"
                        className="btn btn-soft-primary btn-sm"
                      >
                        1M
                      </button>
                      <button
                        type="button"
                        className="btn btn-soft-secondary btn-sm"
                      >
                        6M
                      </button>
                    </div>
                  </div>
                  <div className="card-body p-0">
                    <div>
                      {/* <div
                        id="countries_charts"
                        data-colors='["--vz-info", "--vz-info", "--vz-info", "--vz-info", "--vz-danger", "--vz-info", "--vz-info", "--vz-info", "--vz-info", "--vz-info"]'
                        className="apex-charts"
                        dir="ltr"
                      /> */}

                      <ReactEcharts option={option2} className="apex-charts" />
                    </div>
                  </div>
                </div>
                {/* end card */}
              </div>
            </div>
          </div>
          {/* end col */}
        </div>

        <div className="row">
          <div className="col-xl-6">
            <div className="card">
              <div className="card-header border-0 align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">
                  Audiences Metrics
                </h4>
                <div>
                  <button
                    type="button"
                    className="btn btn-soft-secondary btn-sm"
                  >
                    ALL
                  </button>
                  <button
                    type="button"
                    className="btn btn-soft-secondary btn-sm"
                  >
                    1M
                  </button>
                  <button
                    type="button"
                    className="btn btn-soft-secondary btn-sm"
                  >
                    6M
                  </button>
                  <button type="button" className="btn btn-soft-primary btn-sm">
                    1Y
                  </button>
                </div>
              </div>
              {/* end card header */}
              <div className="card-header p-0 border-0 bg-light-subtle">
                <div className="row g-0 text-center">
                  <div className="col-6 col-sm-4">
                    <div className="p-3 border border-dashed border-start-0">
                      <h5 className="mb-1">
                        <span className="counter-value" data-target={854}>
                          0
                        </span>
                        <span className="text-success ms-1 fs-12">
                          49%
                          <i className="ri-arrow-right-up-line ms-1 align-middle" />
                        </span>
                      </h5>
                      <p className="text-muted mb-0">Avg. Session</p>
                    </div>
                  </div>
                  {/*end col*/}
                  <div className="col-6 col-sm-4">
                    <div className="p-3 border border-dashed border-start-0">
                      <h5 className="mb-1">
                        <span className="counter-value" data-target={1278}>
                          0
                        </span>
                        <span className="text-success ms-1 fs-12">
                          60%
                          <i className="ri-arrow-right-up-line ms-1 align-middle" />
                        </span>
                      </h5>
                      <p className="text-muted mb-0">Conversion Rate</p>
                    </div>
                  </div>
                  {/*end col*/}
                  <div className="col-6 col-sm-4">
                    <div className="p-3 border border-dashed border-start-0 border-end-0">
                      <h5 className="mb-1">
                        <span className="counter-value" data-target={3}>
                          0
                        </span>
                        m
                        <span className="counter-value" data-target={40}>
                          0
                        </span>
                        sec
                        <span className="text-success ms-1 fs-12">
                          37%
                          <i className="ri-arrow-right-up-line ms-1 align-middle" />
                        </span>
                      </h5>
                      <p className="text-muted mb-0">Avg. Session Duration</p>
                    </div>
                  </div>
                  {/*end col*/}
                </div>
              </div>
              {/* end card header */}
              <div className="card-body p-0 pb-2">
                <div>
                  <div
                    id="audiences_metrics_charts"
                    data-colors='["--vz-success", "--vz-light"]'
                    className="apex-charts"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>
            {/* end card */}
          </div>
          {/* end col */}
          <div className="col-xl-6">
            <div className="card card-height-100">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">
                  Audiences Sessions by Country
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
                      <span className="fw-semibold text-uppercase fs-12">
                        Sort by:
                      </span>
                      <span className="text-muted">
                        Current Week
                        <i className="mdi mdi-chevron-down ms-1" />
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
              {/* end card header */}
              <div className="card-body p-0">
                <div>
                  <div
                    id="audiences-sessions-country-charts"
                    data-colors='["--vz-success", "--vz-info"]'
                    className="apex-charts"
                    dir="ltr"
                  ></div>
                </div>
              </div>
              {/* end cardbody */}
            </div>
            {/* end card */}
          </div>
          {/* end col */}
        </div>
        {/* end row */}

        <div className="row">
          <div className="col-xl-4">
            <div className="card card-height-100">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">Users by Device</h4>
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
              {/* end card header */}
              <div className="card-body">
                {/* <div
                  id="user_device_pie_charts"
                  data-colors='["--vz-primary", "--vz-warning", "--vz-info"]'
                  className="apex-charts"
                  dir="ltr"
                /> */}

                <ReactEcharts option={option} className="apex-charts" />
                <div className="table-responsive mt-3">
                  <table className="table table-borderless table-sm table-centered align-middle table-nowrap mb-0">
                    <tbody className="border-0">
                      <tr>
                        <td>
                          <h4 className="text-truncate fs-14 fs-medium mb-0">
                            <i className="ri-stop-fill align-middle fs-18 text-primary me-2" />
                            Desktop Users
                          </h4>
                        </td>
                        <td>
                          <p className="text-muted mb-0">
                            <i data-feather="users" className="me-2 icon-sm" />
                            78.56k
                          </p>
                        </td>
                        <td className="text-end">
                          <p className="text-success fw-medium fs-12 mb-0">
                            <i className="ri-arrow-up-s-fill fs-5 align-middle" />
                            2.08%
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h4 className="text-truncate fs-14 fs-medium mb-0">
                            <i className="ri-stop-fill align-middle fs-18 text-warning me-2" />
                            Mobile Users
                          </h4>
                        </td>
                        <td>
                          <p className="text-muted mb-0">
                            <i data-feather="users" className="me-2 icon-sm" />
                            105.02k
                          </p>
                        </td>
                        <td className="text-end">
                          <p className="text-danger fw-medium fs-12 mb-0">
                            <i className="ri-arrow-down-s-fill fs-5 align-middle" />
                            10.52%
                          </p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <h4 className="text-truncate fs-14 fs-medium mb-0">
                            <i className="ri-stop-fill align-middle fs-18 text-info me-2" />
                            Tablet Users
                          </h4>
                        </td>
                        <td>
                          <p className="text-muted mb-0">
                            <i data-feather="users" className="me-2 icon-sm" />
                            42.89k
                          </p>
                        </td>
                        <td className="text-end">
                          <p className="text-danger fw-medium fs-12 mb-0">
                            <i className="ri-arrow-down-s-fill fs-5 align-middle" />
                            7.36%
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* end card */}
          </div>
          {/* end col */}
          <div className="col-xl-4 col-md-6">
            <div className="card card-height-100">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">
                  Top Referrals Pages
                </h4>
                <div className="flex-shrink-0">
                  <button type="button" className="btn btn-soft-primary btn-sm">
                    Export Report
                  </button>
                </div>
              </div>
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-6">
                    <h6 className="text-muted text-uppercase fw-semibold text-truncate fs-12 mb-3">
                      Total Referrals Page
                    </h6>
                    <h4 className="mb-0">725,800</h4>
                    <p className="mb-0 mt-2 text-muted">
                      <span className="badge bg-success-subtle text-success mb-0">
                        <i className="ri-arrow-up-line align-middle" /> 15.72 %
                      </span>
                      vs. previous month
                    </p>
                  </div>
                  {/* end col */}
                  <div className="col-6">
                    <div className="text-center">
                      <img
                        src="assets/images/illustrator-1.png"
                        className="img-fluid"
                        alt="image"
                      />
                    </div>
                  </div>
                  {/* end col */}
                </div>
                {/* end row */}
                <div className="mt-3 pt-2">
                  <div className="progress progress-lg rounded-pill">
                    <div
                      className="progress-bar bg-primary"
                      role="progressbar"
                      style={{ width: "25%" }}
                      aria-valuenow={25}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                    <div
                      className="progress-bar bg-info"
                      role="progressbar"
                      style={{ width: "18%" }}
                      aria-valuenow={18}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                    <div
                      className="progress-bar bg-success"
                      role="progressbar"
                      style={{ width: "22%" }}
                      aria-valuenow={22}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                    <div
                      className="progress-bar bg-warning"
                      role="progressbar"
                      style={{ width: "16%" }}
                      aria-valuenow={16}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                    <div
                      className="progress-bar bg-danger"
                      role="progressbar"
                      style={{ width: "19%" }}
                      aria-valuenow={19}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    />
                  </div>
                </div>
                {/* end */}
                <div className="mt-3 pt-2">
                  <div className="d-flex mb-2">
                    <div className="flex-grow-1">
                      <p className="text-truncate text-muted fs-14 mb-0">
                        <i className="mdi mdi-circle align-middle text-primary me-2" />
                        www.google.com
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <p className="mb-0">24.58%</p>
                    </div>
                  </div>
                  {/* end */}
                  <div className="d-flex mb-2">
                    <div className="flex-grow-1">
                      <p className="text-truncate text-muted fs-14 mb-0">
                        <i className="mdi mdi-circle align-middle text-info me-2" />
                        www.youtube.com
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <p className="mb-0">17.51%</p>
                    </div>
                  </div>
                  {/* end */}
                  <div className="d-flex mb-2">
                    <div className="flex-grow-1">
                      <p className="text-truncate text-muted fs-14 mb-0">
                        <i className="mdi mdi-circle align-middle text-success me-2" />
                        www.meta.com
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <p className="mb-0">23.05%</p>
                    </div>
                  </div>
                  {/* end */}
                  <div className="d-flex mb-2">
                    <div className="flex-grow-1">
                      <p className="text-truncate text-muted fs-14 mb-0">
                        <i className="mdi mdi-circle align-middle text-warning me-2" />
                        www.medium.com
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <p className="mb-0">12.22%</p>
                    </div>
                  </div>
                  {/* end */}
                  <div className="d-flex">
                    <div className="flex-grow-1">
                      <p className="text-truncate text-muted fs-14 mb-0">
                        <i className="mdi mdi-circle align-middle text-danger me-2" />
                        Other
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <p className="mb-0">17.58%</p>
                    </div>
                  </div>
                  {/* end */}
                </div>
                {/* end */}
                <div className="mt-2 text-center">
                  <a className="text-muted text-decoration-underline">
                    Show All
                  </a>
                </div>
              </div>
            </div>
            {/* end card */}
          </div>
          {/* end col */}
          <div className="col-xl-4 col-md-6">
            <div className="card card-height-100">
              <div className="card-header align-items-center d-flex">
                <h4 className="card-title mb-0 flex-grow-1">Top Pages</h4>
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
              {/* end card header */}
              <div className="card-body">
                <div className="table-responsive table-card">
                  <table className="table align-middle table-borderless table-centered table-nowrap mb-0">
                    <thead className="text-muted table-light">
                      <tr>
                        <th scope="col" style={{ width: 62 }}>
                          Active Page
                        </th>
                        <th scope="col">Active</th>
                        <th scope="col">Users</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <a>/themesbrand/skote-25867</a>
                        </td>
                        <td>99</td>
                        <td>25.3%</td>
                      </tr>
                      {/* end */}
                      <tr>
                        <td>
                          <a>/dashonic/chat-24518</a>
                        </td>
                        <td>86</td>
                        <td>22.7%</td>
                      </tr>
                      {/* end */}
                      <tr>
                        <td>
                          <a>/skote/timeline-27391</a>
                        </td>
                        <td>64</td>
                        <td>18.7%</td>
                      </tr>
                      {/* end */}
                      <tr>
                        <td>
                          <a>/themesbrand/minia-26441</a>
                        </td>
                        <td>53</td>
                        <td>14.2%</td>
                      </tr>
                      {/* end */}
                      <tr>
                        <td>
                          <a>/dashon/dashboard-29873</a>
                        </td>
                        <td>33</td>
                        <td>12.6%</td>
                      </tr>
                      {/* end */}
                      <tr>
                        <td>
                          <a>/doot/chats-29964</a>
                        </td>
                        <td>20</td>
                        <td>10.9%</td>
                      </tr>
                      {/* end */}
                      <tr>
                        <td>
                          <a>/minton/pages-29739</a>
                        </td>
                        <td>10</td>
                        <td>07.3%</td>
                      </tr>
                      {/* end */}
                    </tbody>
                    {/* end tbody */}
                  </table>
                  {/* end table */}
                </div>
                {/* end */}
              </div>
              {/* end cardbody */}
            </div>
            {/* end card */}
          </div>
          {/* end col */}
        </div>

        {/* <ReactEcharts id="main" /> */}
        {/* end row */}
      </div>
    </Layout>
  );
}
