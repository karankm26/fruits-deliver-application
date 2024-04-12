import React, { useState } from "react";
import Layout from "../../components/Layout";
import { useEffect } from "react";
import {
  allSubscription,
  fetchSubscribersList,
  subscribersNotificationSend,
  updateSubscription,
} from "../../features/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../utils/loader";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";
import Editor from "../../utils/editor";
import Pagination from "../../utils/pagination";
import { Link } from "react-router-dom";

export default function SubscriptionsPlan() {
  const dispatch = useDispatch();
  const [subject, setSubject] = useState("");
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [paginate, setPaginate] = useState({
    totalPages: 1,
    currentPage: 1,
  });
  const { totalPages, currentPage } = paginate;

  const [open, setOpen] = useState(false);
  const [editorHtml, setEditorHtml] = useState("");

  const {
    subscribersListData,
    subscribersListDataLoading,
    subscribersNotificationDataLoading,
    subscribersNotificationDataSuccess,
    subscribersNotificationData,
    allSubscriptionData,
    allSubscriptionDataLoading,
    updateSubscriptionDataSuccess,
    updateSubscriptionDataLoading,
  } = useSelector((state) => state.api);

  const { subscribe } = subscribersListData;
  const count = subscribe ? subscribe.length : 0;

  useEffect(() => {
    dispatch(allSubscription());
  }, [dispatch, updateSubscriptionDataSuccess]);

  const defineLimit = (p) => {
    setLimit(p);
    setPaginate({ ...paginate, currentPage: 1 });
  };

  const handlePagination = (current) => {
    setPaginate({ ...paginate, currentPage: current });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubscriberNotificationsSend = () => {
    dispatch(
      subscribersNotificationSend({
        to: open?.email,
        subject: subject,
        text: editorHtml,
      })
    );
  };

  useEffect(() => {
    if (subscribersNotificationDataSuccess) {
      setOpen(false);
    }
  }, [subscribersNotificationDataSuccess]);

  const subscriptionData = [];
  console.log(allSubscriptionData?.SubscriptionForm);

  const handleStatusUpdate = (id, status) => {
    dispatch(updateSubscription({ id, body: { status } }));
  };
  return (
    <Layout>
      <Loader
        isLoading={allSubscriptionDataLoading || updateSubscriptionDataLoading}
      />
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Manage Subscription</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a>Manage Subscription</a>
                </li>
                <li className="breadcrumb-item active">Subscription Plans</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      {/* end page title */}
      {/* <div className="alert alert-danger" role="alert">
        This is <strong>Datatable</strong> page in wihch we have used{" "}
        <b>jQuery</b> with cnd link!
      </div> */}
      {/* <div class="card ribbon-box border shadow-none mb-lg-0 right">
        <div class="card-body text-muted">
          <div class="ribbon-two ribbon-two-success">
            <span>Standard</span>
          </div>
          <h5 class="fs-14 text-end mb-3">Box Ribbon</h5>
          <p class="mb-0">
            Quisque nec turpis at urna dictum luctus. Suspendisse convallis
            dignissim eros at volutpat. In egestas mattis dui. Aliquam mattis
            dictum aliquet. Nulla sapien mauris, eleifend et sem ac, commodo
            dapibus odio. Vivamus pretium nec odio cursus.
          </p>
        </div>
      </div> */}
      <div className="row ">
        {allSubscriptionData?.SubscriptionForm?.length
          ? allSubscriptionData?.SubscriptionForm?.map((item, index) => (
              <div className="col-lg-6" key={index}>
                <div className="card ribbon-box right">
                  <div className="card-body">
                    <div
                      className={`ribbon-two ${`ribbon-two-${
                        item?.planType === `basic` ? `primary` : `info`
                      }`}`}
                    >
                      <span className="text-capitalize">{item?.planType}</span>
                    </div>

                    <div className="text-center">
                      <div className="row justify-content-center">
                        <div className="col-lg-9 ">
                          <h3
                            className="mt-4 fw-semibold text-uppercase"
                            // style={{
                            //   borderBottom: "1px solid black",
                            //   borderBottomStyle: "2px",
                            // }}
                          >
                            {item?.title}
                          </h3>
                          <div
                            style={{ borderTop: "1px", borderTopColor: "red" }}
                          />

                          <h2 className="mt-4 text-capitalize">
                            ${item?.price?.toLocaleString()}/{item?.duration}
                          </h2>

                          <p className="text-muted mt-3"></p>
                          <ul className="text-start">
                            {item.features.map((feature, featureIndex) => (
                              <li key={featureIndex}>{feature?.label}</li>
                            ))}
                          </ul>
                          <div className="mt-4">
                            <Link
                              className="btn btn-primary"
                              to={"/edit-subscriptions/" + item.id}
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() =>
                                handleStatusUpdate(item.id, !item.status)
                              }
                              className={`ms-1 btn btn-${
                                item.status ? `danger` : `success`
                              }`}
                            >
                              {item.status ? "Inactive" : "Active"}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*end card*/}
              </div>
            ))
          : "No Plans Available"}

        {/*end col*/}
      </div>
      {/* Modal */}
    </Layout>
  );
}
