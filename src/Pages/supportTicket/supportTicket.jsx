import React, { useState } from "react";
import Layout from "../../components/Layout";
import { useEffect } from "react";
import {
  fetchAllSupportTicket,
  fetchSubscribersList,
  subscribersNotificationSend,
} from "../../features/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../utils/loader";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";
import Editor from "../../utils/editor";
import Pagination from "../../utils/pagination";
import { Link } from "react-router-dom";

export default function SupportTicket() {
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
    allSupportTicketData,
    allSupportTicketDataLoading,
    subscribersNotificationDataLoading,
    subscribersNotificationDataSuccess,
    subscribersNotificationData,
  } = useSelector((state) => state.api);

  const { rows, count } = allSupportTicketData;
  // const count = subscribe ? subscribe.length : 0;

  useEffect(() => {
    dispatch(fetchAllSupportTicket({ search, limit }));
  }, [dispatch, search, limit]);

  const defineLimit = (p) => {
    setLimit(p);
    setPaginate({ ...paginate, currentPage: 1 });
  };

  const definePriority = (p) => {
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


  return (
    <Layout>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Manage Support Ticket</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a>Manage Support Ticket</a>
                </li>
                <li className="breadcrumb-item active">Support Tickets </li>
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

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Support Tickets </h5>
            </div>
            <div className="card-body table-responsive">
              <div
                id="example_wrapper"
                className="dataTables_wrapper dt-bootstrap5 no-footer"
              >
                <div className="row">
                  <div className="col-sm-12 col-md-4">
                    <div className="dataTables_length " id="example_length">
                      <label className="d-inline-flex align-items-center">
                        Show{" "}
                        <select
                          name="example_length"
                          aria-controls="example"
                          className="form-select form-select-sm"
                          onChange={(e) => defineLimit(e.target.value)}
                        >
                          <option value={10}>10</option>
                          <option value={25}>25</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </select>{" "}
                        entries
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4">
                    <div className="dataTables_length " id="example_length">
                      <label className="d-inline-flex align-items-center">
                        Priority&nbsp;
                        <select
                          name="example_length"
                          aria-controls="example"
                          className="form-select form-select-sm"
                          onChange={(e) => definePriority(e.target.value)}
                        >
                          <option value={""}>All</option>
                          <option value={1}>Low</option>
                          <option value={2}>Medium</option>
                          <option value={3}>High</option>
                        </select>{" "}
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4 text-end">
                    <div id="example_filter" className="dataTables_filter">
                      <label className="d-inline-flex align-items-center">
                        Search:
                        <input
                          type="search"
                          className="form-control form-control-sm"
                          placeholder
                          aria-controls="example"
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <table
                      id="example"
                      className="table table-bordered dt-responsive nowrap table-striped align-middle dataTable no-footer dtr-inline collapsed"
                      style={{ width: "100%" }}
                      aria-describedby="example_info"
                    ></table>
                  </div>
                </div>
              </div>

              <table
                id="example"
                className="table table-bordered dt-responsive nowrap table-striped align-middle"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th style={{ width: 60 }}>Sr No.</th>
                    <th>User</th>
                    <th>Email</th>
                    <th>Submitted By</th>
                    <th>Priority</th>
                    <th>Status</th>
                    {/* <th>Last Reply</th> */}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows?.length
                    ? rows?.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td className="text-capitalize">{item?.name}</td>
                          <td>{item?.email}</td>
                          <td>
                            {moment(item?.createdAt).format(
                              "MMM Do YYYY, h:mm:ss a"
                            )}
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                item?.priority
                                  ? `bg-info-subtle text-info`
                                  : `bg-danger-subtle text-danger`
                              }`}
                            >
                              {item?.status ? "High" : "Low"}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                item?.status === 1
                                  ? `bg-info-subtle text-info`
                                  : item?.status === 2
                                  ? `bg-success-subtle text-success`
                                  : item?.status === 3
                                  ? `bg-danger-subtle text-danger`
                                  : `bg-warning-subtle text-warning`
                              }`}
                            >
                              {item?.status === 1
                                ? "Open"
                                : item?.status === 2
                                ? "Answered"
                                : item?.status === 3
                                ? "Closed"
                                : "Pending"}
                            </span>
                          </td>

                          <td>
                            <div className="dropdown d-inline-block">
                              <Link
                                className="btn btn-sm btn-soft-info"
                                to={"/support-tickets/" + item?.id}
                              >
                                View
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    : ""}
                  {/* <tr className="text-center">
                    {subscribersListData?.message}
                  </tr> */}
                </tbody>
              </table>

              <div className="row">
                <div className="col-sm-12 col-md-5">
                  <div
                    className="dataTables_info"
                    id="example_info"
                    role="status"
                    aria-live="polite"
                  >
                    Showing {(currentPage - 1) * limit + 1} to{" "}
                    {count > currentPage * limit ? currentPage * limit : count}{" "}
                    of {count} entries{" "}
                  </div>
                </div>
                <div className="col-sm-12 col-md-7 d-flex justify-content-end">
                  <Pagination
                    total={totalPages}
                    current={currentPage}
                    pagination={(crPage) => handlePagination(crPage)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
