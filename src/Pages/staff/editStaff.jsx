import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/index.jsx";
import Loader from "../../utils/loader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchStaffById, staffUpdate } from "../../features/apiSlice.js";
import { useNavigate, useParams } from "react-router-dom";

const emptyData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  manage_events: {
    events: false,
    add_event: false,
    add_winning: false,
    uploaded_winning_history: false,
  },
  manage_reports: {
    transaction_log: false,
    login_history: false,
    email_history: false,
    winning_log: false,
  },
  manage_users: false,
  manage_deposits: false,
  manage_withdrawals: false,
  manage_supportTickets: false,
  manage_subscribers: false,
};
export default function EditStaff() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    staffByIdData,
    staffByIdDataLoading,
    staffUpdateDataLoading,
    staffUpdateDataSuccess,
  } = useSelector((state) => state.api);
  const [selected, setSelected] = useState(emptyData);
  const [showPassword, setShowPassword] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (id) dispatch(fetchStaffById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (staffByIdData) setSelected({ ...selected, ...staffByIdData });
  }, [dispatch, staffByIdData]);

  useEffect(() => {
    if (staffUpdateDataSuccess && isSaved) {
      navigate("/staff");
    }
  }, [staffUpdateDataSuccess, isSaved]);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setSelected({ ...selected, [name]: value });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelected({ ...selected, [name]: value });
  };

  const handleChangeChecked = (e) => {
    const { name, checked } = e.target;
    setSelected({ ...selected, [name]: checked });
  };

  const handleButtonClick = (e) => {
    const toggle = e.target.checked;
    const updatedData = { ...selected };
    for (const category in updatedData) {
      if (category.startsWith("manage")) {
        if (typeof updatedData[category] === "object") {
          updatedData[category] = Object.fromEntries(
            Object.entries(updatedData[category]).map(
              ([subCategory, value]) => [subCategory, toggle]
            )
          );
        } else {
          updatedData[category] = toggle;
        }
      }
    }
    setSelected(updatedData);
  };

  const allManageFieldsAreTrue = () => {
    for (const category in selected) {
      if (category.startsWith("manage")) {
        if (typeof selected[category] === "object") {
          for (const subCategory in selected[category]) {
            if (selected[category][subCategory] !== true) {
              return false;
            }
          }
        } else {
          if (selected[category] !== true) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      selected?.firstName &&
      selected.lastName &&
      selected.email &&
      selected.password
    ) {
      dispatch(staffUpdate({ id, body: selected }));
      setIsSaved(true);
    }
  };

  console.log(selected);
  return (
    <Layout>
      <Loader isLoading={staffUpdateDataLoading || staffByIdDataLoading} />
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Manage Staff</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a>Manage Staff</a>
                </li>
                <li className="breadcrumb-item active">Add Staff</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Add Staff</h5>
            </div>
            <form onSubmit={handleSubmit} className="card-body">
              <div className="live-preview">
                <div className="row gy-4">
                  <div className="col-xxl-3 col-md-3">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        First Name
                      </label>
                      <span className="text-danger">*</span>
                      <input
                        type="text"
                        className="form-control"
                        id="basiInput"
                        name="firstName"
                        value={selected.firstName}
                        onChange={handleChange}
                        placeholder="Enter First Name"
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-md-3">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        Last Name
                      </label>
                      <span className="text-danger">*</span>
                      <input
                        type="text"
                        className="form-control"
                        id="basiInput"
                        name="lastName"
                        placeholder="Enter Last Name"
                        value={selected.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-md-3">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        Email
                      </label>
                      <span className="text-danger">*</span>
                      <input
                        type="email"
                        className="form-control"
                        id="basiInput"
                        name="email"
                        value={selected?.email ?? ""}
                        onChange={handleChange}
                        placeholder="Enter Email"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-md-3">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        Password
                      </label>
                      <span className="text-danger">*</span>
                      <div className="position-relative auth-pass-inputgroup mb-3">
                        <input
                          type={showPassword ? "password" : "text"}
                          className="form-control pe-5 password-input"
                          placeholder="Enter password"
                          id="password"
                          name="password"
                          value={selected?.password ?? ""}
                          onChange={handleChange}
                          required
                        />
                        <button
                          className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                          type="button"
                          id="password-addon"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <i className="ri-eye-fill align-middle" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row gy-4  pt-3">
                  <div className="col-xxl-3 col-md-6">
                    <h5 className="card-title mb-0"> Select Modules</h5>
                  </div>
                  <div className="col-xxl-3 col-md-6">
                    <div
                      className="form-check form-switch mb-3 d-lg-flex justify-content-end"
                      dir="ltr"
                    >
                      <input
                        type="checkbox"
                        className="form-check-input me-2"
                        id="all-modules"
                        checked={allManageFieldsAreTrue()}
                        onChange={handleButtonClick}
                      />
                      <label className="form-check-label" htmlFor="all-modules">
                        <h5 className="card-title mb-0"> All Modules</h5>

                        {/* All Modules */}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row gy-4  pt-3">
                  <div className="col-xxl-3 col-md-4">
                    <div className="form-check form-switch mb-3" dir="ltr">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="user"
                        name="manage_users"
                        checked={selected?.manage_users}
                        onChange={handleChangeChecked}
                      />
                      <label className="form-check-label" htmlFor="user">
                        Manage Users
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row gy-4  pt-3">
                  <div className="col-xxl-3 col-md-4">
                    <div className="form-check form-switch mb-3" dir="ltr">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="manage_subscribers"
                        checked={selected?.manage_subscribers}
                        name="manage_subscribers"
                        onChange={handleChangeChecked}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="manage_subscribers"
                      >
                        Manage Subscribers
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row gy-4  pt-3">
                  <div className="col-xxl-3 col-md-4">
                    <div className="form-check form-switch mb-3" dir="ltr">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="manage_supportTickets"
                        checked={selected?.manage_supportTickets}
                        name="manage_supportTickets"
                        onChange={handleChangeChecked}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="manage_supportTickets"
                      >
                        Manage Support Tickets
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row gy-4  pt-3">
                  <div className="col-xxl-3 col-md-4">
                    <div className="form-check form-switch mb-3" dir="ltr">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="manage_withdrawals"
                        checked={selected?.manage_withdrawals}
                        name="manage_withdrawals"
                        onChange={handleChangeChecked}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="manage_withdrawals"
                      >
                        Manage Withdrawals
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row gy-4  pt-3">
                  <div className="col-xxl-3 col-md-4">
                    <div className="form-check form-switch mb-3" dir="ltr">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="manage_deposits"
                        checked={selected?.manage_deposits}
                        name="manage_deposits"
                        onChange={handleChangeChecked}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="manage_deposits"
                      >
                        Manage Deposits
                      </label>
                    </div>
                  </div>
                </div>{" "}
                <div className="row gy-4 pt-3">
                  <div className="col-xxl-3 col-md-12">
                    <div className="form-check form-switch" dir="ltr">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="events"
                        checked={
                          selected?.manage_events &&
                          Object?.values(selected?.manage_events)?.every(
                            (value) => value
                          )
                        }
                        name="manage_users"
                        onChange={(e) =>
                          setSelected({
                            ...selected,
                            manage_events: {
                              ...selected.manage_events,
                              events: e.target.checked,
                              add_event: e.target.checked,
                              add_winning: e.target.checked,
                              uploaded_winning_history: e.target.checked,
                            },
                          })
                        }
                      />
                      <label className="form-check-label" htmlFor="events">
                        Manage Events
                      </label>
                    </div>
                  </div>
                  <div className="px-5 pt-3 row">
                    <div className="col-xxl-3 col-md-3">
                      <div className="form-check form-switch mb-3" dir="ltr">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="events"
                          checked={selected?.manage_events?.events}
                          name="events"
                          onChange={(e) =>
                            setSelected({
                              ...selected,
                              manage_events: {
                                ...selected.manage_events,
                                events: e.target.checked,
                              },
                            })
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="transaction_log"
                        >
                          Events
                        </label>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-md-3">
                      <div className="form-check form-switch mb-3" dir="ltr">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="add_event"
                          checked={selected?.manage_events?.add_event}
                          name="add_event"
                          onChange={(e) =>
                            setSelected({
                              ...selected,
                              manage_events: {
                                ...selected.manage_events,
                                add_event: e.target.checked,
                              },
                            })
                          }
                        />
                        <label className="form-check-label" htmlFor="add_event">
                          Add Event
                        </label>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-lg-3">
                      <div className="form-check form-switch mb-3" dir="ltr">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="add_winning"
                          checked={selected?.manage_events?.add_winning}
                          name="add_winning"
                          onChange={(e) =>
                            setSelected({
                              ...selected,
                              manage_events: {
                                ...selected.manage_events,
                                add_winning: e.target.checked,
                              },
                            })
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="add_winning"
                        >
                          Add Winning
                        </label>
                      </div>
                    </div>{" "}
                    <div className="col-xxl-3 col-lg-3">
                      <div className="form-check form-switch mb-3" dir="ltr">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="uploaded_winning_history"
                          checked={
                            selected?.manage_events?.uploaded_winning_history
                          }
                          name="uploaded_winning_history"
                          onChange={(e) =>
                            setSelected({
                              ...selected,
                              manage_events: {
                                ...selected.manage_events,
                                uploaded_winning_history: e.target.checked,
                              },
                            })
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="uploaded_winning_history"
                        >
                          Uploaded Winning History
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row gy-4 pt-3">
                  <div className="col-xxl-3 col-md-12">
                    <div className="form-check form-switch" dir="ltr">
                      <input
                        type="checkbox"
                        className="form-check-input "
                        id="report"
                        checked={
                          selected?.manage_reports &&
                          Object.values(selected?.manage_reports).every(
                            (value) => value
                          )
                        }
                        name="manage_users"
                        onChange={(e) =>
                          setSelected({
                            ...selected,
                            manage_reports: {
                              ...selected.manage_reports,
                              transaction_log: e.target.checked,
                              login_history: e.target.checked,
                              email_history: e.target.checked,
                              winning_log: e.target.checked,
                            },
                          })
                        }
                      />
                      <label className="form-check-label" htmlFor="report">
                        Manage Reports
                      </label>
                    </div>
                  </div>
                  <div className="px-5 pt-3 row">
                    <div className="col-xxl-3 col-md-3">
                      <div className="form-check form-switch mb-3" dir="ltr">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="transaction_log"
                          checked={selected?.manage_reports?.transaction_log}
                          name="transaction_log"
                          onChange={(e) =>
                            setSelected({
                              ...selected,
                              manage_reports: {
                                ...selected.manage_reports,
                                transaction_log: e.target.checked,
                              },
                            })
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="transaction_log"
                        >
                          Transaction Logs
                        </label>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-md-3">
                      <div className="form-check form-switch mb-3" dir="ltr">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="login_history"
                          checked={selected?.manage_reports?.login_history}
                          name="login_history"
                          onChange={(e) =>
                            setSelected({
                              ...selected,
                              manage_reports: {
                                ...selected.manage_reports,
                                login_history: e.target.checked,
                              },
                            })
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="login_history"
                        >
                          Login Logs
                        </label>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-md-3">
                      <div className="form-check form-switch mb-3" dir="ltr">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="email_history"
                          checked={selected?.manage_reports?.email_history}
                          name="email_history"
                          onChange={(e) =>
                            setSelected({
                              ...selected,
                              manage_reports: {
                                ...selected.manage_reports,
                                email_history: e.target.checked,
                              },
                            })
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="email_history"
                        >
                          Email Logs
                        </label>
                      </div>
                    </div>
                    <div className="col-xxl-3 col-lg-3">
                      <div className="form-check form-switch mb-3" dir="ltr">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="winning_log"
                          checked={selected?.manage_reports?.winning_log}
                          name="winning_log"
                          onChange={(e) =>
                            setSelected({
                              ...selected,
                              manage_reports: {
                                ...selected.manage_reports,
                                winning_log: e.target.checked,
                              },
                            })
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="winning_log"
                        >
                          Winning Log
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row gy-4  pt-3">
                  <div className="col-12">
                    <button className="btn btn-sm btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
