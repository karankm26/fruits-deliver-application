import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/index.jsx";
import Loader from "../../utils/loader.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  admiSubtractedUserBalance,
  adminAddedUserBalance,
  fetchCities,
  fetchCountries,
  fetchStates,
  fetchUser,
  updateUser,
  userAllDetails,
  userNotification,
} from "../../features/apiSlice.js";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Editor from "../../utils/editor.jsx";

export default function UserView() {
  const dispatch = useDispatch();

  const {
    userData,
    countriesData,
    StatesData,
    CitiesData,
    userUpdateDataLoading,
    balanceUpdateDataLoading,
    balanceUpdateDataSuccess,
    userNotificationDataLoading,
    userAllDetailsData,
  } = useSelector((state) => state.api);
  // const id = localStorage.getItem("id");
  const [selected, setSelected] = useState({});
  const [open, setOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [amount, setAmount] = useState("");
  const [subject, setSubject] = useState("");
  const [editorHtml, setEditorHtml] = useState("");

  const [discription, setDiscription] = useState("");
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchUser(id));
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    if (userData) {
      setSelected(userData);
    }
  }, [userData]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (type) => {
    setOpen(type);
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setSelected({ ...selected, [name]: value });
  };

  useEffect(() => {
    if (selected.country) {
      const countryId = countriesData?.find(
        (item) => item?.name === selected.country
      );
      if (countryId?.id) dispatch(fetchStates(countryId?.id));
    }
  }, [dispatch, countriesData, selected]);

  useEffect(() => {
    if (id) dispatch(userAllDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selected?.state) {
      const StateId = StatesData?.States?.find(
        (item) => item?.stateName === selected.state
      );
      if (StateId?.id) dispatch(fetchCities(StateId?.id));
    }
  }, [dispatch, StatesData, selected]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      fname: selected.fname,
      lname: selected.lname,
      email: selected.email,
      mobileNo: selected.mobileNo,
      twitch_link: selected.twitch_link,
      bio: selected.bio,
      country: selected.country,
      twofa_status: selected.twofa_status,
      sms_verify: selected.sms_verify,
    };
    dispatch(updateUser({ id, body }));
  };

  const handleBalanceSubmit = (e) => {
    e.preventDefault();
    if (open === "subtract") {
      dispatch(
        admiSubtractedUserBalance({
          transactionType: "AdminWithdraw",
          amount: amount,
          userId: id,
          sender: "Admin",
          receiver: "User",
          description: discription,
        })
      );
    } else {
      dispatch(
        adminAddedUserBalance({
          transactionType: "AdminDeposit",
          amount: amount,
          userId: id,
          sender: "Admin",
          receiver: "User",
          description: discription,
        })
      );
    }
  };

  useEffect(() => {
    if (balanceUpdateDataSuccess) {
      handleClose();
    }
  }, [balanceUpdateDataSuccess]);

  const handleSentUserNotification = () => {
    if (subject && editorHtml) {
      dispatch(
        userNotification({
          to: selected?.email,
          subject: subject,
          html: editorHtml,
        })
      );
    }
  };

  return (
    <Layout>
      <Loader isLoading={userUpdateDataLoading || balanceUpdateDataLoading} />
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Manage Users</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a>Manage Users</a>
                </li>
                <li className="breadcrumb-item active">Users</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="row project-wrapper">
        <div className="col-xxl-12">
          <div className="row">
            <div className="col-lg-4">
              <div className="card card-animate">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-primary-subtle text-primary rounded-2 fs-2">
                        <i className="text-primary ri-wallet-line" />
                      </span>
                    </div>
                    <div className="flex-grow-1 overflow-hidden ms-3">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-3">
                        Balance
                      </p>
                      <div className="d-flex align-items-center mb-3">
                        <h4 className="fs-4 flex-grow-1 mb-0">
                          <span className="counter-value" data-target={825}>
                            $ {selected?.balance?.toLocaleString()}
                          </span>
                        </h4>
                        <span className="badge bg-danger-subtle text-danger fs-12">
                          <i className="ri-arrow-down-s-line fs-13 align-middle me-1" />
                          5.02 %
                        </span>
                      </div>
                      <p className="text-muted text-truncate mb-0"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card card-animate">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-warning-subtle text-warning rounded-2 fs-2">
                        <i
                          data-feather="award"
                          className="text-warning  ri-exchange-dollar-line"
                        />
                      </span>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <p className="text-uppercase fw-medium text-muted mb-3">
                        Deposits
                      </p>
                      <div className="d-flex align-items-center mb-3">
                        <h4 className="fs-4 flex-grow-1 mb-0">
                          <span className="counter-value" data-target={7522}>
                            $ {userAllDetailsData?.total_transaction_deposit}
                          </span>
                        </h4>
                        <span className="badge bg-success-subtle text-success fs-12">
                          <i className="ri-arrow-up-s-line fs-13 align-middle me-1" />
                          3.58 %
                        </span>
                      </div>
                      <p className="text-muted mb-0"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card card-animate">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-success-subtle text-success rounded-2 fs-2">
                        <i
                          data-feather="clock"
                          className="text-success  ri-safe-2-line"
                        />
                      </span>
                    </div>
                    <div className="flex-grow-1 overflow-hidden ms-3">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-3">
                        Withdrawls
                      </p>
                      <div className="d-flex align-items-center mb-3">
                        <h4 className="fs-4 flex-grow-1 mb-0">
                          $ {userAllDetailsData?.total_transaction_withdraw}
                        </h4>
                        <span className="badge bg-danger-subtle text-danger fs-12">
                          <i className="ri-arrow-down-s-line fs-13 align-middle me-1" />
                          10.35 %
                        </span>
                      </div>
                      <p className="text-muted text-truncate mb-0"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card card-animate">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-danger-subtle text-info rounded-2 fs-2">
                        <i
                          data-feather="clock"
                          className="text-danger  ri-safe-2-line"
                        />
                      </span>
                    </div>
                    <div className="flex-grow-1 overflow-hidden ms-3">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-3">
                        Rejected Withdrawls
                      </p>
                      <div className="d-flex align-items-center mb-3">
                        <h4 className="fs-4 flex-grow-1 mb-0">
                          $ {userAllDetailsData?.total_transaction_rejected}
                        </h4>
                        <span className="badge bg-danger-subtle text-danger fs-12">
                          <i className="ri-arrow-down-s-line fs-13 align-middle me-1" />
                          10.35 %
                        </span>
                      </div>
                      <p className="text-muted text-truncate mb-0"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div className="col-lg-4">
              <div className="card card-animate">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-info-subtle text-info rounded-2 fs-2">
                        <i
                          data-feather="clock"
                          className="text-info ri-exchange-line"
                        />
                      </span>
                    </div>
                    <div className="flex-grow-1 overflow-hidden ms-3">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-3">
                        Transactions
                      </p>
                      <div className="d-flex align-items-center mb-3">
                        <h4 className="fs-4 flex-grow-1 mb-0">
                          $ {userAllDetailsData?.total_transaction_deposit}
                        </h4>
                        <span className="badge bg-danger-subtle text-danger fs-12">
                          <i className="ri-arrow-down-s-line fs-13 align-middle me-1" />
                          10.35 %
                        </span>
                      </div>
                      <p className="text-muted text-truncate mb-0"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card card-animate">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="avatar-sm flex-shrink-0">
                      <span className="avatar-title bg-info-subtle text-info rounded-2 fs-2">
                        <i
                          data-feather="clock"
                          className="text-info ri-exchange-line"
                        />
                      </span>
                    </div>
                    <div className="flex-grow-1 overflow-hidden ms-3">
                      <p className="text-uppercase fw-medium text-muted text-truncate mb-3">
                        Total Win Amount
                      </p>
                      <div className="d-flex align-items-center mb-3">
                        <h4 className="fs-4 flex-grow-1 mb-0">$ 0</h4>
                        <span className="badge bg-danger-subtle text-danger fs-12">
                          <i className="ri-arrow-down-s-line fs-13 align-middle me-1" />
                          10.35 %
                        </span>
                      </div>
                      <p className="text-muted text-truncate mb-0"></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div className="row mb-2">
          <div className="col-4">
            <button
              className="btn btn-primary d-flex align-item-center"
              onClick={() => handleOpen("add")}
            >
              <i className="ri-add-line" />
              Balance
            </button>
          </div>
          <div className="col-4">
            <button
              className="btn btn-primary d-flex align-item-center"
              onClick={() => handleOpen("subtract")}
            >
              <i className="ri-subtract-line" />
              Balance
            </button>
          </div>
          <div className="col-4">
            <button
              className="btn btn-primary d-flex align-item-center"
              onClick={() => setOpenNotification(true)}
            >
              <i className="ri-notification-3-line"></i> Notification
            </button>
          </div>

          {/* <div className="col-4">
            <button className="btn btn-primary">Add Balance</button>
          </div> */}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Users</h5>
            </div>
            <form onSubmit={handleSubmit} className="card-body ">
              <div className="live-preview">
                <div className="row gy-4">
                  <div className=" col-md-4">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        First Name
                      </label>
                      <input
                        value={selected.fname}
                        type="text"
                        className="form-control"
                        id="basiInput"
                        name="fname"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className=" col-md-4">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        Last Name
                      </label>
                      <input
                        value={selected.lname}
                        type="text"
                        className="form-control"
                        id="basiInput"
                        name="lname"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className=" col-md-4">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        Email
                      </label>
                      <input
                        value={selected.email}
                        type="email"
                        className="form-control"
                        id="basiInput"
                        name="email"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row gy-4 pt-2 pb-3">
                  <div className=" col-md-4">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        Mobile
                      </label>
                      <input
                        value={selected.mobileNo}
                        type="text"
                        className="form-control"
                        id="basiInput"
                        name="mobileNo"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className=" col-md-4">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        Twitch Link
                      </label>
                      <input
                        value={selected.twitch_link}
                        type="text"
                        className="form-control"
                        id="basiInput"
                        name="twitch_link"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className=" col-md-4">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        Bio
                      </label>
                      <input
                        value={selected.bio}
                        type="text"
                        className="form-control"
                        id="basiInput"
                        name="bio"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className=" col-md-4">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        Country
                      </label>

                      <select
                        className="form-select"
                        value={selected.country}
                        name="country"
                        onChange={handleChange}
                      >
                        <option selected value="">
                          Choose Country
                        </option>
                        {countriesData.length &&
                          countriesData?.map((item) => (
                            <option key={item?.id} value={item?.name}>
                              {item?.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  {/* <div className=" col-md-4">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        Address
                      </label>
                      <input
                        value={selected.address}
                        type="text"
                        className="form-control"
                        id="basiInput"
                        name="address"
                        onChange={handleChange}
                      />
                    </div>
                  </div>{" "}
                  <div className=" col-md-4">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        Zip/Postal
                      </label>
                      <input
                        value={selected.zip}
                        type="text"
                        className="form-control"
                        id="basiInput"
                        name="zip"
                        onChange={handleChange}
                      />
                    </div>
                  </div> */}
                </div>

                <div className="row gy-4  pt-2">
                  {/* <div className=" col-md-4">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        State
                      </label>
                      <select
                        className="form-select"
                        value={selected.state}
                        name="state"
                        onChange={handleChange}
                      >
                        <option selected disabled value="">
                          Choose State
                        </option>
                        {StatesData?.States?.length &&
                          StatesData?.States?.map((item) => (
                            <option key={item?.id} value={item?.stateName}>
                              {item?.stateName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>{" "}
                  <div className=" col-md-4">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        City
                      </label>
                      <select
                        className="form-select"
                        value={selected.city}
                        name="city"
                        onChange={handleChange}
                      >
                        <option selected disabled value="">
                          Choose State
                        </option>
                        {CitiesData?.Cities?.length &&
                          CitiesData?.Cities?.map((item) => (
                            <option key={item?.id} value={item?.cityName}>
                              {item?.cityName}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div> */}
                </div>
                <div className="row gy-4  pt-3">
                  <div className=" col-md-4">
                    <div className="form-check form-switch mb-3" dir="ltr">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="emailswitch"
                        checked={selected?.email_verify}
                        name="email_verify"
                        onChange={(e) => {
                          setSelected({
                            ...selected,
                            email_verify: e.target.checked ? 1 : 0,
                          });
                        }}
                      />
                      <label className="form-check-label" htmlFor="emailswitch">
                        Email Verification
                      </label>
                    </div>
                  </div>
                  <div className=" col-md-4">
                    <div className="form-check form-switch mb-3" dir="ltr">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="smsswitch"
                        checked={selected?.sms_verify}
                        name="sms_verify"
                        onChange={(e) => {
                          setSelected({
                            ...selected,
                            sms_verify: e.target.checked ? 1 : 0,
                          });
                        }}
                      />
                      <label className="form-check-label" htmlFor="smsswitch">
                        Mobile Verification
                      </label>
                    </div>
                  </div>{" "}
                  <div className=" col-md-4">
                    <div className="form-check form-switch mb-3" dir="ltr">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="kycswitch"
                      />
                      <label className="form-check-label" htmlFor="kycswitch">
                        KYC
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row gy-4  pt-3">
                  <div className="col-12">
                    <button className="btn btn-sm btn-primary" type="submit">
                      Submit form
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/*Balance Modal */}

      <Modal show={open} onHide={handleClose} size="md">
        <form onSubmit={handleBalanceSubmit}>
          <Modal.Header closeButton>
            <h5 className="modal-title" id="varyingcontentModalLabel">
              {open === "subtract" ? "Subtract Balance" : "Add Balance"}
            </h5>
          </Modal.Header>
          <Modal.Body>
            <div>
              <label htmlFor="customer-name" className="col-form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="customer-name"
                value={selected?.email}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="customer-name" className="col-form-label">
                Amount:
              </label>
              <input
                type="number"
                className="form-control"
                id="customer-name"
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="customer-name" className="col-form-label">
                Remark:
              </label>
              <textarea
                type="text"
                className="form-control"
                id="customer-name"
                onChange={(e) => setDiscription(e.target.value)}
              />
            </div>
            {/* <div className="mb-3">
              <label htmlFor="message-text" className="col-form-label">
                Message:
              </label>
              <Editor setEditorHtml={setEditorHtml} editorHtml={editorHtml} />
            </div> */}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose} className="btn btn-light">
              Close
            </Button>
            <Button
              // onClick={handleSubscriberNotificationsSend}
              className="btn btn-primary"
              type="submit"
            >
              Submit
              {/* {subscribersNotificationDataLoading ? (
              <div
                className="spinner-border spinner-border-sm text-light"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Send"
            )} */}
            </Button>
          </Modal.Footer>{" "}
        </form>
      </Modal>

      {/* Notification Modal */}

      <Modal
        show={openNotification}
        onHide={() => setOpenNotification(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <h5 className="modal-title" id="varyingcontentModalLabel">
            Send Notification To {selected?.fname} {selected?.lname}
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
                value={selected?.email}
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
          <Button
            onClick={() => setOpenNotification(false)}
            className="btn btn-light"
          >
            Close
          </Button>
          <Button
            onClick={handleSentUserNotification}
            className="btn btn-primary"
            disabled={userNotificationDataLoading}
          >
            {userNotificationDataLoading ? (
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
