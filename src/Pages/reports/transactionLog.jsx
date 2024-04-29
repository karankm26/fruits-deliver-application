import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Loader from "../../utils/loader";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { fetchTransactions } from "../../features/apiSlice";
import Pagination from "../../utils/pagination";
import CustomDateRangePicker from "../../utils/customDateRangePicker";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { CSVLink } from "react-csv";

export default function TransactionLog() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState(10);
  const [dateRange, setDateRange] = useState({
    Duration_Start: "",
    Duration_End: "",
  });
  const [paginate, setPaginate] = useState({
    totalPages: 1,
    currentPage: 1,
  });
  const { totalPages, currentPage } = paginate;
  const {
    transactionsData: { result },
    userDataLoading,
    transactionsData,
    transactionsDataSuccess,
  } = useSelector((state) => state.api);

  const rows = result?.rows;
  const count = result?.count;

  useEffect(() => {
    dispatch(
      fetchTransactions({
        search,
        limit,
        type: "",
        currentPage,
        ...(dateRange?.Duration_Start && dateRange?.Duration_End
          ? {
              startDate: dateRange?.Duration_Start,
              endDate: dateRange?.Duration_End,
            }
          : { startDate: "", endDate: "" }),
      })
    );
  }, [dispatch, search, limit, currentPage, dateRange]);

  useEffect(() => {
    if (count) {
      setPaginate({ ...paginate, totalPages: Math.ceil(count / limit) });
    }
  }, [count]);

  const defineLimit = (p) => {
    setLimit(p);
    setPaginate({ ...paginate, currentPage: current });
  };

  const handlePagination = (current) => {
    setPaginate({ ...paginate, currentPage: current });
  };

  console.log(transactionsData);

  const handleExportPDF = () => {
    const statement = "dddd";
    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(12);

    const title = `BKRM Games Transaction Log Report  |  Date: ${moment().format(
      "MM/DD/YYYY hh:mm:ss A"
    )}\n${
      dateRange.Duration_Start &&
      dateRange.Duration_End &&
      `From ${moment(dateRange.Duration_Start).format(
        "MM/DD/YYYY"
      )} to ${moment(dateRange.Duration_End).format("MM/DD/YYYY")}`
    }`;
    const headers = [
      [
        "S.No",
        "Name",
        "Email",
        "Transaction Id",
        "Transaction Type",
        "Amount",
        "Post Balance",
        "Description",
        "Transaction Date",
      ],
    ];

    const data =
      rows?.length &&
      rows.map((elt, index) => {
        return [
          index + 1,
          elt.User.fname + " " + elt.User.lname,
          elt.User.email,
          elt.tansactionId,
          elt.transactionType,
          "$" + elt.amount.toLocaleString(),
          "$" + elt.balance.toLocaleString(),
          elt.description.replace(/^\s+|\s+$/gm, ""),
          moment(elt.createdAt).format("MM/DD/YYYY hh:mm:ss A"),
        ];
      });

    let content = {
      startY: 70,
      startX: 50,
      head: headers,
      body: data,
      tableWidth: "auto",
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save(
      `BKRM Games transaction log report ${moment().format(
        "MM/DD/YYYY_hh:mm:ss_A"
      )}.pdf`
    );
  };
  const csvData = rows?.length
    ? rows.map((elt, index) => {
        return {
          "S.No:": index + 1,
          Name: elt.User.fname + " " + elt.User.lname,
          Email: elt.User.email,
          "Transaction ID": elt.tansactionId,
          "Transaction Type": elt.transactionType,
          Amount: "$" + elt.amount.toLocaleString(),
          "Post Balance": "$" + elt.balance.toLocaleString(),
          Description: elt.description.replace(/^\s+|\s+$/gm, ""),
          "Date & Time": moment(elt.createdAt).format("MM/DD/YYYY hh:mm:ss A"),
        };
      })
    : [];

  console.log(csvData);
  return (
    <Layout>
      <Loader isLoading={userDataLoading} />
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Manage Reports</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a>Manage Reports</a>
                </li>
                <li className="breadcrumb-item active">Transaction Logs</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-lg-6">
                  <h5 className="card-title mb-0">Transaction Logs</h5>
                </div>
                <div className="col-lg-6 text-lg-end">
                  {/* <button className="btn btn-sm btn-soft-info">Excel</button> */}
                  <button
                    className="btn btn-sm btn-soft-info ms-1"
                    onClick={handleExportPDF}
                  >
                    PDF
                  </button>
                  {/* <button className="btn btn-sm btn-soft-info ms-1">CSV</button> */}
                  <CSVLink
                    data={csvData}
                    filename={`transaction log report ${new Date().toLocaleString()}.csv`}
                    className="btn btn-sm btn-soft-info ms-1"
                  >
                    CSV
                  </CSVLink>
                </div>
              </div>
            </div>
            <div className="card-body table-responsive">
              <div
                id="example_wrapper"
                className="dataTables_wrapper dt-bootstrap5 no-footer"
              >
                <div className="row">
                  <div className="col-sm-12 col-md-3">
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
                  <div className="col-sm-12 col-md-6 text-center">
                    <label className="d-inline-flex align-items-center">
                      Date Filter:
                      <CustomDateRangePicker
                        setDateRange={setDateRange}
                        dateRange={dateRange}
                      />
                    </label>
                  </div>
                  <div className="col-sm-12 col-md-3 text-end">
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
                    <th>Transaction ID</th>
                    <th>Transaction Type</th>
                    <th>Joined At</th>
                    {/* <th>Status</th> */}
                    <th>Amount</th>
                    {/* <th>Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {rows?.length
                    ? rows.map((item, index) => (
                        <tr key={index}>
                          <td>{(currentPage - 1) * limit + 1 + index}</td>
                          <td>
                            <div>
                              {item?.User?.fname} {item?.User?.lname}
                            </div>
                            <div>{item?.User?.email}</div>
                          </td>
                          <td>
                            <div>{item?.tansactionId}</div>
                          </td>
                          <td className="text-capitalize">
                            {item?.transactionType}
                          </td>
                          <td>
                            {moment(item?.createdAt).format(
                              "MMM Do YYYY, h:mm:ss a"
                            )}
                          </td>
                          <td>
                            <h6
                              className={`text-${
                                item?.transactionType === `Deposit` ||
                                item?.transactionType === `AdminDeposit`
                                  ? `success`
                                  : `danger`
                              } fs-13 mb-0`}
                            >
                              {item?.transactionType === `Deposit` ||
                              item?.transactionType === `AdminDeposit`
                                ? `+`
                                : `-`}
                              ${item?.amount}
                            </h6>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
