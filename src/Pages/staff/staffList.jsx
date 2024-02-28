import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Loader from "../../utils/loader";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { fetchAllStaff, staffUpdate } from "../../features/apiSlice";
import Pagination from "../../utils/pagination";
import { Link } from "react-router-dom";

export default function StaffList() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [paginate, setPaginate] = useState({
    totalPages: 1,
    currentPage: 1,
  });
  const { totalPages, currentPage } = paginate;
  const {
    staffAllData: { results },
    staffAllDataLoading,
    staffUpdateDataLoading,
  } = useSelector((state) => state.api);

  const count = results ? results.length : 0;
  useEffect(() => {
    dispatch(fetchAllStaff({ search, limit }));
  }, [dispatch, search, limit, staffUpdateDataLoading]);

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
    dispatch(staffUpdate({ id, body: { status: type } }));
  };
  return (
    <Layout>
      <Loader isLoading={staffUpdateDataLoading} />
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Manage Staff</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a>Manage Staff</a>
                </li>
                <li className="breadcrumb-item active">Staff Members</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Staff Members</h5>
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
                        Show
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
                        </select>
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
                          placeholder="Name , Email"
                          aria-controls="example"
                          onChange={(e) => setSearch(e.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <table
                id="example"
                className="table table-bordered dt-responsive nowrap table-striped align-middle mt-2"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th style={{ width: 60 }}>Sr No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Created At</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {results?.length
                    ? results.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            {item?.firstName}&nbsp;{item?.lastName}
                          </td>
                          <td>
                            <div>{item?.email}</div>
                          </td>
                          <td>
                            {moment(item?.createdAt).format(
                              "MMM Do YYYY, h:mm:ss a"
                            )}
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
                                to={"/staff/" + item?.id}
                                className="btn btn-sm btn-soft-info"
                              >
                                Edit
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    : ""}
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
                    Showing {(currentPage - 1) * limit + 1} to
                    {count > currentPage * limit ? currentPage * limit : count}
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
