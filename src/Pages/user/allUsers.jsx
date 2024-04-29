import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Loader from "../../utils/loader";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { fetchUsers, updateUser } from "../../features/apiSlice";
import Pagination from "../../utils/pagination";
import { Link } from "react-router-dom";

export default function AllUsers() {
  const dispatch = useDispatch();
  const {
    usersData: { rows, count },
    userDataLoading,
    userUpdateDataLoading,
    userUpdateDataSuccess,
  } = useSelector((state) => state.api);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [type, setType] = useState("");
  const [paginate, setPaginate] = useState({
    totalPages: 1,
    currentPage: 1,
  });
  const { totalPages, currentPage } = paginate;

  useEffect(() => {
    dispatch(fetchUsers({ search, limit, currentPage, type }));
  }, [
    dispatch,
    search,
    limit,
    userUpdateDataSuccess,
    userUpdateDataLoading,
    currentPage,
    type,
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

  const handleChangeStatus = (type, id) => {
    dispatch(updateUser({ id, body: { status: type.toString() } }));
  };

  return (
    <Layout>
      <Loader isLoading={userDataLoading || userUpdateDataLoading} />
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Manage Users</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a>Manage Users</a>
                </li>
                <li className="breadcrumb-item active">All Users</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">All Users</h5>
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
                  <div className="col-sm-12 col-md-4 text-lg-center">
                    <div className="dataTables_length " id="example_length">
                      <label className="d-inline-flex align-items-center">
                        Filter{" "}
                        <select
                          name="example_length"
                          aria-controls="example"
                          className="form-select form-select-sm"
                          onChange={(e) => setType(e.target.value)}
                        >
                          <option value={""} selected>
                            All
                          </option>
                          <option value={"isBacker"}>Backer</option>
                          <option value={"isSubscriber"}>Player</option>
                        </select>{" "}
                      </label>
                    </div>
                  </div>
                  <div className="col-sm-12 col-md-4 text-lg-end">
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
                    <th>Name</th>
                    <th>Email-Phone</th>
                    <th>Country</th>
                    <th>Joined At</th>
                    <th>Balance</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {rows?.length
                    ? rows.map((item, index) => (
                        <tr key={index}>
                          <td>{(currentPage - 1) * limit + 1 + index}</td>
                          <td>
                            {item?.fname} {item?.lname}
                          </td>
                          <td>
                            <div>{item?.email}</div>
                            <div>{item?.mobileNo}</div>
                          </td>
                          <td className="text-capitalize">{item?.country}</td>
                          <td>
                            {moment(item?.createdAt).format(
                              "MMM Do YYYY, h:mm:ss a"
                            )}
                          </td>
                          <td>
                            ${item?.balance?.toLocaleString()?.toLocaleString()}
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                item?.status
                                  ? `bg-success-subtle text-success`
                                  : `bg-danger-subtle text-danger`
                              }`}
                            >
                              {item?.status ? "Active" : "Inactive"}
                            </span>
                          </td>

                          <td>
                            <div className="dropdown d-inline-block">
                              <button
                                onClick={() =>
                                  handleChangeStatus(
                                    item?.status ? 0 : 1,
                                    item?.id
                                  )
                                }
                                className={`btn btn-sm ${
                                  item?.status
                                    ? "btn-soft-danger"
                                    : "btn-soft-success"
                                }`}
                              >
                                {item?.status ? "Inactive" : "Active"}
                              </button>
                            </div>
                            <div className="dropdown d-inline-block ms-1">
                              <Link
                                to={"/user/" + item?.id}
                                className="btn btn-sm btn-soft-info"
                              >
                                Details
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
