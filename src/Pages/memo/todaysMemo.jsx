import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Loader from "../../utils/loader";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Pagination from "../../utils/pagination";
import { Link } from "react-router-dom";
import { getMemo } from "../../features/apiSlice";

export default function TodaysMemos() {
  const dispatch = useDispatch();
  const { getMemoDataLoading, getMemoData } = useSelector((state) => state.api);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [type, setType] = useState("");
  const [paginate, setPaginate] = useState({
    totalPages: 1,
    currentPage: 1,
  });
  const { totalPages, currentPage } = paginate;
  const rows = getMemoData?.Memo?.rows;
  const count = getMemoData?.Memo?.count;

  useEffect(() => {
    dispatch(
      getMemo({ type: "today", status: "", startDate: "", endDate: "", search })
    );
  }, [dispatch, search]);

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
      <Loader isLoading={getMemoDataLoading} />
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Manage Memo's</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a>Manage Memo's</a>
                </li>
                <li className="breadcrumb-item active">Today's Memo's</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Today's Memo's</h5>
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

                  <div className="col-sm-12 col-md-6 text-lg-end">
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
                    <th>Memo Id</th>
                    <th>Memo To</th>
                    <th>Date and Time</th>
                    <th>Total Fare</th>
                    <th>Created By</th>
                    <th>Last updated </th>
                    <th>Updated By</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {rows?.length
                    ? rows.map((item, index) => (
                        <tr key={index}>
                          <td>{(currentPage - 1) * limit + 1 + index}</td>
                          <td>{item?.memoId}</td>
                          <td>{item?.recipient}</td>
                          <td>
                            {moment(item?.createdAt).format(
                              "MMM Do YYYY, h:mm:ss a"
                            )}
                          </td>
                          <td>{item?.total_fare} ₹</td>
                          <td>
                            {item?.Operator?.firstName}
                            {item?.Operator?.lastName}
                          </td>
                          <td>
                            {moment(item?.updatedAt).format(
                              "MMM Do YYYY, h:mm:ss a"
                            )}
                          </td>
                          <td>{item?.updatedBy}</td>
                          {/* <td>
                            <div className="dropdown d-inline-block">
                              <Link
                                to={"/view-memo/" + item?.id}
                                className="btn btn-sm btn-soft-info"
                              >
                                View
                              </Link>
                            </div>
                            <div className="dropdown d-inline-block ms-1">
                              <Link
                                to={"/edit-memo/" + item?.id}
                                className="btn btn-sm btn-soft-primary"
                              >
                                Edit
                              </Link>
                            </div>
                            <div className="dropdown d-inline-block ms-1">
                              <button
                                className="btn btn-sm btn-soft-success"
                                onClick={() => handleDownload(item.id)}
                              >
                                Print
                              </button>
                            </div>
                          </td> */}
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
