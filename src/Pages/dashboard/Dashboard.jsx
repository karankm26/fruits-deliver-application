import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import ReactEcharts from "echarts-for-react";
import { getMemo } from "../../features/apiSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { userDetailsData, getMemoData } = useSelector((state) => state.api);
  const userDetail = userDetailsData?.[0];

  useEffect(() => {
    dispatch(
      getMemo({ type: "", status: "", startDate: "", endDate: "", search: "" })
    );
  }, [dispatch]);

  const dashboardContent = [
    {
      id: 1,
      title: "Total Memo",
      count: getMemoData?.seenMemo + getMemoData?.unseenMemo,
      hike: true,
      percent: 16.24,
      icon: "ri-group-line",
      color: "info",
    },
    {
      id: 2,
      title: "Seen Memo",
      count: getMemoData?.seenMemo,
      hike: true,
      percent: 10,
      icon: "ri-user-follow-line",
      color: "success",
    },
    // {
    //   id: 3,
    //   title: "Unseen Memo",
    //   count: getMemoData?.unseenMemo,
    //   hike: true,
    //   percent: 30,
    //   icon: "ri-user-unfollow-line",
    //   color: "danger",
    // },
    {
      id: 4,
      title: "Today's Memo",
      count: getMemoData?.todayMemoCount,
      hike: true,
      percent: 56.24,
      icon: "ri-mail-check-line",
      color: "info",
    },
    {
      id: 5,
      title: "This Month Memo",
      count: getMemoData?.monthMemoCount,
      hike: false,
      percent: 16.24,
      icon: "ri-mail-close-line",
      color: "info",
    },
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
          {
            value: getMemoData?.seenMemo + getMemoData?.unseenMemo,
            name: "Total Memo",
          },
          { value: getMemoData?.seenMemo, name: "Seen Memo" },
          { value: getMemoData?.unseenMemo, name: "Unseen Memo" },
          { value: getMemoData?.todayMemoCount, name: "Today's Memo" },
          { value: getMemoData?.monthMemoCount, name: "This Month Memo" },
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
                    dashboardContent.map((item, index) => (
                      <div className="col-xl-3 col-md-6" key={index}>
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
                                {/* <h5
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
                                </h5> */}
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
                                {/* <a href className="text-decoration-underline">
                                  View net earnings
                                </a> */}
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
                        Live Memo Stats
                      </h4>
                    </div>

                    <div className="card-body">
                      <ReactEcharts
                        option={userDetails}
                        className="apex-charts"
                        // theme={"dark"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
