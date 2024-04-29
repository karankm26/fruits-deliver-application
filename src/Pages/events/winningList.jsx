import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Loader from "../../utils/loader";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { fetchEvents } from "../../features/apiSlice";
import Pagination from "../../utils/pagination";
import { useNavigate } from "react-router-dom";

export default function EventWinningList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    updateEventStatusDataLoading,
    updateEventStatusDataSuccess,
    eventsData: { events, total },
  } = useSelector((state) => state.api);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [paginate, setPaginate] = useState({
    totalPages: 1,
    currentPage: 1,
  });
  const { totalPages, currentPage } = paginate;
  const count = total ?? 0;

  useEffect(() => {
    dispatch(fetchEvents({ search, limit, currentPage }));
  }, [
    dispatch,
    search,
    limit,
    currentPage,
    updateEventStatusDataLoading,
    updateEventStatusDataSuccess,
  ]);

  useEffect(() => {
    if (count) {
      setPaginate({ ...paginate, totalPages: Math.ceil(count / limit) });
    }
  }, [count]);

  const defineLimit = (p) => {
    setLimit(p);
    setPaginate({ ...paginate, currentPage: 1 });
  };

  const handlePagination = (current) => {
    setPaginate({ ...paginate, currentPage: current });
  };

  return (
    <Layout>
      <Loader isLoading={updateEventStatusDataLoading} />
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Manage Event</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a>Manage Event</a>
                </li>
                <li className="breadcrumb-item active">
                  Event Winning History List
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Event Winning History List</h5>
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
                    <th style={{ width: 60 }}>Sr No.</th>
                    <th>Event Name</th>
                    <th>Event Rounds</th>
                    <th>Total Player</th>
                    <th>Uploaded At</th>
                    <th>Created By</th>
                    <th>Winning Uploaded</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {events?.length
                    ? events.map((item, index) => (
                        <tr key={index}>
                          <td>{(currentPage - 1) * limit + 1 + index}</td>
                          <td className="d-flex align-items-center">
                            <div>
                              <img
                                className="table-image me-2"
                                src={item?.image}
                              />
                            </div>
                            <div>{item?.event_name}</div>
                          </td>
                          <td>{item?.event_round}</td>
                          <td className="text-capitalize">
                            {item?.players_details?.length}
                          </td>
                          <td>
                            {moment(item?.updatedAt).format(
                              "MMM Do YYYY, h:mm:ss a"
                            )}
                          </td>
                          <td>{item?.role}</td>
                          <td>{item?.positionsInfo?.length ? "Yes" : "No"}</td>

                          <td>
                            <button
                              disabled={!item?.positionsInfo?.length}
                              onClick={() => {
                                if (item?.positionsInfo?.length) {
                                  navigate("/event-winnings-list/" + item?.id);
                                }
                              }}
                              className="btn btn-sm btn-soft-info"
                            >
                              View
                            </button>
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
                    of {count} entries
                  </div>
                </div>
                <div className="col-sm-12 col-md-7 d-flex justify-content-end">
                  <Pagination
                    total={totalPages}
                    current={currentPage}
                    pagination={(crPage) => handlePagination(crPage)}
                  />
                  {/* <div
                    className="dataTables_paginate paging_simple_numbers"
                    id="example_paginate"
                  >
                    <ul className="pagination">
                      <li
                        className={`paginate_button page-item previous ${
                          page && `disabled`
                        }`}
                        id="example_previous"
                      >
                        <button
                          aria-controls="example"
                          data-dt-idx={0}
                          tabIndex={0}
                          className="page-link"
                          onClick={() => {
                            if (page > 1) {
                              definePage(page - 1);
                            }
                          }}
                          // disabled={page > 1}
                        >
                          Previous
                        </button>
                      </li>
                      {Array.from({ length: page }).map((_, index) => (
                        <li className="paginate_button page-item active">
                          <a
                            href="#"
                            aria-controls="example"
                            data-dt-idx={1}
                            tabIndex={0}
                            className={`page-link ${
                              page === index + 1 ? `active` : ""
                            }`}
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                          </a>
                        </li>
                      ))}{" "}
                      <li
                        className={`paginate_button page-item next ${
                          page && `disabled`
                        }`}
                        id="example_next"
                      >
                        <button
                          aria-controls="example"
                          data-dt-idx={3}
                          tabIndex={0}
                          className="page-link"
                          onClick={() => {
                            if (count > page * limit) {
                              definePage(page + 1);
                            }
                          }}
                          disabled={true}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
