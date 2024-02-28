import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Loader from "../../utils/loader";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { fetchUsers } from "../../features/apiSlice";
import { Link } from "react-router-dom";
import Pagination from "../../utils/pagination";
export default function ActiveUsers() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [paginate, setPaginate] = useState({
    totalPages: 1,
    currentPage: 1,
  });
  const { totalPages, currentPage } = paginate;
  const {
    usersData: { rows, count },
    userDataLoading,
  } = useSelector((state) => state.api);

  useEffect(() => {
    dispatch(fetchUsers({ search, limit, type: "active-user", currentPage }));
  }, [dispatch, search, limit, currentPage]);

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
      <Loader isLoading={userDataLoading} />
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Manage Users</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a>Manage Users</a>
                </li>
                <li className="breadcrumb-item active">Active Users</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Active Users</h5>
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
                    <th>Name</th>
                    <th>Email-Phone</th>
                    <th>Country</th>
                    <th>Joined At</th>
                    {/* <th>Status</th> */}
                    <th>Balance</th>
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
                          <td>${item?.balance}</td>
                          {/* <td>
                            <span
                              className={`badge ${
                                item?.status
                                  ? `bg-info-subtle text-info`
                                  : `bg-danger-subtle text-danger`
                              }`}
                            >
                              {item?.status ? "Active" : "Inactive"}
                            </span>
                          </td> */}

                          <td>
                            <div className="dropdown d-inline-block">
                              <Link
                                to={"/user/" + item.id}
                                className="btn btn-sm btn-soft-info"
                              >
                                Details
                              </Link>
                            </div>
                          </td>

                          {/* <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-soft-secondary btn-sm dropdown"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <i className="ri-more-fill align-middle" />
                              </button>
                              <ul
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuLink1"
                              >
                                <li>
                                  <a className="dropdown-item" href="#">
                                    View
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Edit
                                  </a>
                                </li>
                                <li>
                                  <a className="dropdown-item" href="#">
                                    Delete
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </td> */}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
