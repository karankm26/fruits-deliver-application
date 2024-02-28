import React, { useState } from "react";
import Layout from "../../components/Layout";
import { useEffect } from "react";
import {
  fetchSubscribersList,
  subscribersNotificationSend,
} from "../../features/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../utils/loader";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";
import Editor from "../../utils/editor";
import Pagination from "../../utils/pagination";

export default function SubscriberList() {
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
  } = useSelector((state) => state.api);

  const { subscribe } = subscribersListData;
  const count = subscribe ? subscribe.length : 0;

  useEffect(() => {
    dispatch(fetchSubscribersList({ search, limit }));
  }, [dispatch, search, limit]);

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
  return (
    <Layout>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Manage Subscribers</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a>Manage Subscribers</a>
                </li>
                <li className="breadcrumb-item active">Subscribers List</li>
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
              <h5 className="card-title mb-0">Subscribers List</h5>
            </div>
            <div className="card-body table-responsive">
              <div
                id="example_wrapper"
                className="dataTables_wrapper dt-bootstrap5 no-footer"
              >
                <div className="row">
                  <div className="col-sm-12 col-md-6">
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
                  <div className="col-sm-12 col-md-6 text-end">
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
                    <th data-ordering="false" style={{ width: 60 }}>
                      Sr No.
                    </th>
                    <th data-ordering="false">User</th>
                    <th>Subscribed By</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribersListData?.total
                    ? subscribersListData?.subscribe.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item?.email}</td>
                          <td>
                            {moment(item?.createdAt).format(
                              "MMM Do YYYY, h:mm:ss a"
                            )}
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                item?.status
                                  ? `bg-info-subtle text-info`
                                  : `bg-danger-subtle text-danger`
                              }`}
                            >
                              {item?.status ? "Active" : "Inactive"}
                            </span>
                          </td>

                          <td>
                            <div className="dropdown d-inline-block">
                              <button
                                className="btn btn-sm btn-soft-info"
                                onClick={() => setOpen(item)}
                              >
                                Send Mail
                              </button>
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
      {/* Modal */}

      <Modal show={open} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <h5 className="modal-title" id="varyingcontentModalLabel">
            Send Email Notification To {open?.email}
          </h5>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="customer-name" className="col-form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="customer-name"
                value={open?.email}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="customer-name" className="col-form-label">
                Subject:
              </label>
              <input
                type="text"
                className="form-control"
                id="customer-name"
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message-text" className="col-form-label">
                Message:
              </label>
              <Editor setEditorHtml={setEditorHtml} editorHtml={editorHtml} />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} className="btn btn-light">
            Close
          </Button>
          <Button
            onClick={handleSubscriberNotificationsSend}
            className="btn btn-primary"
          >
            {subscribersNotificationDataLoading ? (
              <div
                className="spinner-border spinner-border-sm text-light"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Send"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}
