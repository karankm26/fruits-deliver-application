import React, { useEffect, useState, useCallback } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { memoSchema } from "../../schema/memoSchema";
import { createMemo, getMemoID } from "../../features/apiSlice";
import Loader from "../../utils/loader";
import { useNavigate } from "react-router-dom";
import isEqual from "lodash/isEqual";

const emptyData = {
  recipient: "",
  mobile_no: "",
  date: "",
  details_of_box: [
    {
      trade_mark: "",
      box: "",
      receiver: "",
    },
  ],
  details_of_quantity: [
    {
      type: "",
      weight: "",
      quantity: "",
      per_boxes_rate: "",
      fare_rate: "",
    },
  ],
  total_box: "",
  total_fare: "",
  advance_amount: "",
  balance_amount: "",
  reward: {
    vehicle_departure_date: "",
    departure_time: "",
    vehicle_reaching_date: "",
    reaching_time: "",
    driver_reaches_within: "",
    reward_amount: "",
    reword_amount_word: "",
  },
  vehicle_owner_name: "",
  vehicle_owner_address: "",
  vehicle_owner_phone: "",
  vehicle_driver_name: "",
  vehicle_driver_address: "",
  vehicle_driver_phone: "",
  vehicle_number: "",
  attached_transport: "",
  attached_transport_mobile_number: "",
  license_number: "",
};
export default function AddMemo() {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const dispatch = useDispatch();
  const { createMemoDataLoading, createMemoDataSuccess, getMemoIDData } =
    useSelector((state) => state.api);
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    setValues,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: { ...emptyData },
    validationSchema: memoSchema,
    onSubmit: () => {
      dispatch(createMemo(values));
      setIsSaved(true);
    },
  });

  useEffect(() => {
    dispatch(getMemoID());
  }, [dispatch]);

  const addBox = () => {
    setValues((prevValues) => ({
      ...prevValues,
      details_of_box: [
        ...prevValues.details_of_box,
        {
          trade_mark: "",
          box: "",
          receiver: "",
        },
      ],
    }));
  };

  const removeBox = (index) => {
    setValues((prevValues) => ({
      ...prevValues,
      details_of_box: [
        ...prevValues.details_of_box.slice(0, index),
        ...prevValues.details_of_box.slice(index + 1),
      ],
    }));
  };

  const handleChangeBox = (e, index) => {
    const { value, name } = e.target;
    const updatedInputs = [...values.details_of_box];
    updatedInputs[index] = {
      ...updatedInputs[index],
      [name]: value,
    };
    setValues({
      ...values,
      details_of_box: updatedInputs,
    });
  };

  const addQuantity = () => {
    setValues((prevValues) => ({
      ...prevValues,
      details_of_quantity: [
        ...prevValues.details_of_quantity,
        {
          type: "",
          weight: "",
          quantity: "",
          per_boxes_rate: "",
          fare_rate: "",
        },
      ],
    }));
  };

  const removeQuantity = (index) => {
    setValues((prevValues) => ({
      ...prevValues,
      details_of_quantity: [
        ...prevValues.details_of_quantity.slice(0, index),
        ...prevValues.details_of_quantity.slice(index + 1),
      ],
    }));
  };

  const handleChangeQuantity = (e, index) => {
    const { value, name } = e.target;
    const updatedInputs = [...values.details_of_quantity];
    updatedInputs[index] = {
      ...updatedInputs[index],
      [name]: value,
    };
    setValues({
      ...values,
      details_of_quantity: updatedInputs,
    });
  };

  useEffect(() => {
    if (createMemoDataSuccess && isSaved) {
      navigate("/all-memos");
    }
  }, [createMemoDataSuccess, isSaved]);

  const calculateFareRates = useCallback((details) => {
    return details.map((item) => ({
      ...item,
      fare_rate: +item.quantity * +item.per_boxes_rate,
    }));
  }, []);

  const calculateSums = useCallback((details) => {
    return details.reduce(
      (acc, item) => {
        acc.totalQuantity += +item.quantity;
        acc.totalPerBoxesRate += +item.fare_rate;
        return acc;
      },
      { totalQuantity: 0, totalPerBoxesRate: 0 }
    );
  }, []);

  useEffect(() => {
    if (values.details_of_quantity.length) {
      const newCalculation = calculateFareRates(values.details_of_quantity);
      const { totalQuantity, totalPerBoxesRate } =
        calculateSums(newCalculation);

      if (!isEqual(newCalculation, values.details_of_quantity)) {
        setValues((prevValues) => ({
          ...prevValues,
          details_of_quantity: newCalculation,
          total_box: totalQuantity,
          total_fare: totalPerBoxesRate,
          balance_amount: values.advance_amount
            ? totalPerBoxesRate - values.advance_amount
            : totalPerBoxesRate,
        }));
      } else {
        setValues((prevValues) => ({
          ...prevValues,
          total_box: totalQuantity,
          total_fare: totalPerBoxesRate,
          balance_amount: values.advance_amount
            ? totalPerBoxesRate - values.advance_amount
            : totalPerBoxesRate,
        }));
      }
    }
  }, [
    values.details_of_quantity,
    calculateFareRates,
    calculateSums,
    values.advance_amount,
  ]);

  return (
    <Layout>
      <Loader isLoading={createMemoDataLoading} />

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

      <div className="row memo-form">
        <section className="header">
          <form onSubmit={handleSubmit} className="container page-invoice">
            <div className="row row-header d-flex align-items-center">
              <div className="col-lg-2 col-md-2 col-sm col-4">
                <img src="assets/images/image-2.png" className="img-fluid" />
              </div>
              <div className="col-lg-8 text-center d-none d-lg-block d-md-block">
                <p className="m-0 p1">Shree Swami Samarth</p>
                <h4 className="m-0 py-0">
                  Jai Laxmi Fruit Supplier Service Center, ugaon
                </h4>
                <p className="m-0 p2">
                  At/Post-Ugaon, Tal-Niphad, Dist-Nashik (Maharashtra)
                </p>
              </div>
              <div
                className="col-lg-2 col-md-8 col-sm col-8 pe-0 text-end pe-4"
                style={{
                  borderRadius: "0px 20px 0px 0px",
                  backgroundColor: "#ff4545",
                  clipPath: "polygon(100% 100%, 100% 0, 25% 0%, 0 100%)",
                }}
              >
                {/* <img src="/assets/images/rectangle-15.png" /> */}
                <h5 className="text-white pt-3">Memo No.</h5>
                <button className="btn btn-secondary" disabled type="button">
                  #{getMemoIDData?.memoId}
                </button>
                <p className="text-white">Delivery Challan</p>
              </div>
            </div>
            <div className="row py-4">
              <div className="col-lg-4 col-md-4">
                <label>Party name who receiving the order</label>
                <input
                  className="form-control"
                  placeholder="Enter party name"
                  id="recipient"
                  name="recipient"
                  value={values.recipient}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div
                  className={`invalid-feedback ${
                    touched.recipient && errors.recipient && "d-block"
                  }`}
                >
                  {errors.recipient}
                </div>
              </div>
              <div className="col-lg-4 col-md-4">
                <label>Mobile Number</label>
                <input
                  className="form-control"
                  placeholder="Enter party mobile number"
                  id="mobile_no"
                  type="number"
                  name="mobile_no"
                  value={values.mobile_no}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div
                  className={`invalid-feedback ${
                    touched.mobile_no && errors.mobile_no && "d-block"
                  }`}
                >
                  {errors.mobile_no}
                </div>
              </div>
              <div className="col-lg-4 col-md-4 position-relative">
                <label>Date</label>

                <input
                  className="form-control date"
                  placeholder="Enter Date"
                  type="date"
                  id="date"
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div
                  className={`invalid-feedback ${
                    touched.date && errors.date && "d-block"
                  }`}
                >
                  {errors.date}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="card mb-4">
                  <div className="card-body px-0 py-0">
                    <div className="table-responsive">
                      <table className="table mb-2">
                        <thead>
                          <tr>
                            <th>Trade Mark</th>
                            <th>Box</th>
                            <th>Receiver</th>
                            <th />
                          </tr>
                        </thead>
                        <tbody>
                          {values?.details_of_box?.length &&
                            values.details_of_box.map((_, index) => (
                              <tr key={index}>
                                <td>
                                  <input
                                    className="form-control"
                                    placeholder="Trade mark"
                                    id="trade_mark"
                                    name="trade_mark"
                                    value={
                                      values.details_of_box[index]?.trade_mark
                                    }
                                    onChange={(e) => handleChangeBox(e, index)}
                                    onBlur={handleBlur}
                                  />
                                  <div
                                    className={`invalid-feedback ${
                                      touched?.details_of_box?.[index]
                                        ?.trade_mark &&
                                      errors.details_of_box?.[index]
                                        ?.trade_mark &&
                                      "d-block"
                                    }`}
                                  >
                                    {errors.details_of_box?.[index]?.trade_mark}
                                  </div>
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Box"
                                    id="box"
                                    name="box"
                                    value={values.details_of_box[index]?.box}
                                    onChange={(e) => handleChangeBox(e, index)}
                                    onBlur={handleBlur}
                                  />{" "}
                                  <div
                                    className={`invalid-feedback ${
                                      touched?.details_of_box?.[index]?.box &&
                                      errors.details_of_box?.[index]?.box &&
                                      "d-block"
                                    }`}
                                  >
                                    {errors.details_of_box?.[index]?.box}
                                  </div>
                                </td>
                                <td>
                                  <input
                                    className="form-control"
                                    placeholder="Receiver name"
                                    id="receiver"
                                    name="receiver"
                                    value={
                                      values.details_of_box[index]?.receiver
                                    }
                                    onChange={(e) => handleChangeBox(e, index)}
                                    onBlur={handleBlur}
                                  />{" "}
                                  <div
                                    className={`invalid-feedback ${
                                      touched?.details_of_box?.[index]
                                        ?.receiver &&
                                      errors.details_of_box?.[index]
                                        ?.receiver &&
                                      "d-block"
                                    }`}
                                  >
                                    {errors.details_of_box?.[index]?.receiver}
                                  </div>
                                </td>
                                <td className="text-center">
                                  <img
                                    onClick={() => removeBox(index)}
                                    src="/assets/images/delete-icon.svg"
                                    className="mt-1 cursor-pointer"
                                  />
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm rounded-pill float-end mb-2 me-2"
                      onClick={addBox}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <div className="card mb-4">
                  <div className="card-body px-0 py-0">
                    <div className="table-responsive">
                      <table className="table mb-0">
                        <thead>
                          <tr>
                            <th>Tapshil</th>
                            <th>Weight</th>
                            <th>Qty</th>
                            <th>Per boxe rate</th>
                            <th>This Fare</th>
                          </tr>
                        </thead>
                        <tbody>
                          {values?.details_of_quantity?.length &&
                            values.details_of_quantity.map((_, index) => (
                              <tr>
                                <td className="w-120">
                                  <select
                                    className="form-control form-select"
                                    id="type"
                                    name="type"
                                    value={
                                      values.details_of_quantity[index]?.type
                                    }
                                    onChange={(e) =>
                                      handleChangeQuantity(e, index)
                                    }
                                    onBlur={handleBlur}
                                  >
                                    <option value="" disabled>
                                      Select
                                    </option>
                                    <option value="Crate">Crate</option>
                                    <option value="Box">Box</option>
                                  </select>{" "}
                                  <div
                                    className={`invalid-feedback ${
                                      touched?.details_of_quantity?.[index]
                                        ?.type &&
                                      errors.details_of_quantity?.[index]
                                        ?.type &&
                                      "d-block"
                                    }`}
                                  >
                                    {errors.details_of_quantity?.[index]?.type}
                                  </div>
                                </td>
                                <td>
                                  <div className="input-group">
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="weight"
                                      name="weight"
                                      value={
                                        values.details_of_quantity[index]
                                          ?.weight
                                      }
                                      onChange={(e) =>
                                        handleChangeQuantity(e, index)
                                      }
                                      onBlur={handleBlur}
                                    />
                                    <span
                                      className="input-group-text"
                                      id="basic-addon1"
                                    >
                                      kg
                                    </span>
                                  </div>
                                  <div
                                    className={`invalid-feedback ${
                                      touched?.details_of_quantity?.[index]
                                        ?.weight &&
                                      errors.details_of_quantity?.[index]
                                        ?.weight &&
                                      "d-block"
                                    }`}
                                  >
                                    {
                                      errors.details_of_quantity?.[index]
                                        ?.weight
                                    }
                                  </div>
                                </td>
                                <td>
                                  <input
                                    className="form-control"
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    value={
                                      values.details_of_quantity[index]
                                        ?.quantity
                                    }
                                    onChange={(e) =>
                                      handleChangeQuantity(e, index)
                                    }
                                    onBlur={handleBlur}
                                  />{" "}
                                  <div
                                    className={`invalid-feedback ${
                                      touched?.details_of_quantity?.[index]
                                        ?.quantity &&
                                      errors.details_of_quantity?.[index]
                                        ?.quantity &&
                                      "d-block"
                                    }`}
                                  >
                                    {
                                      errors.details_of_quantity?.[index]
                                        ?.quantity
                                    }
                                  </div>
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="In Rupees"
                                    id="per_boxes_rate"
                                    name="per_boxes_rate"
                                    value={
                                      values.details_of_quantity[index]
                                        ?.per_boxes_rate
                                    }
                                    onChange={(e) =>
                                      handleChangeQuantity(e, index)
                                    }
                                    onBlur={handleBlur}
                                  />{" "}
                                  <div
                                    className={`invalid-feedback ${
                                      touched?.details_of_quantity?.[index]
                                        ?.per_boxes_rate &&
                                      errors.details_of_quantity?.[index]
                                        ?.per_boxes_rate &&
                                      "d-block"
                                    }`}
                                  >
                                    {
                                      errors.details_of_quantity?.[index]
                                        ?.per_boxes_rate
                                    }
                                  </div>
                                </td>
                                <td>
                                  <input
                                    type="number"
                                    className="form-control"
                                    placeholder="In Rupees"
                                    id="fare_rate"
                                    name="fare_rate"
                                    value={
                                      values.details_of_quantity[index]
                                        ?.fare_rate
                                    }
                                    onChange={(e) =>
                                      handleChangeQuantity(e, index)
                                    }
                                    onBlur={handleBlur}
                                  />{" "}
                                  <div
                                    className={`invalid-feedback ${
                                      touched?.details_of_quantity?.[index]
                                        ?.fare_rate &&
                                      errors.details_of_quantity?.[index]
                                        ?.fare_rate &&
                                      "d-block"
                                    }`}
                                  >
                                    {
                                      errors.details_of_quantity?.[index]
                                        ?.fare_rate
                                    }
                                  </div>
                                </td>
                                <td className="text-center">
                                  <img
                                    onClick={() => removeQuantity(index)}
                                    src="/assets/images/delete-icon.svg"
                                    className="mt-1 cursor-pointer"
                                  />
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm rounded-pill float-end my-2 me-2 "
                      onClick={addQuantity}
                    >
                      + Add
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="card mb-4">
                  <div className="card-body px-0 py-0">
                    <div className="table-responsive">
                      <table className="table mb-0">
                        <thead>
                          <tr>
                            <th colSpan={2} className="text-center">
                              Jai Laxmi Fruit Supplier Service Center, ugaav
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="w-170">
                              <label>Total Box</label>
                            </td>
                            <td>
                              <input
                                className="form-control"
                                type="number"
                                id="total_box"
                                name="total_box"
                                value={values.total_box}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <div
                                className={`invalid-feedback ${
                                  touched.total_box &&
                                  errors.total_box &&
                                  "d-block"
                                }`}
                              >
                                {errors.total_box}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="w-170">
                              <label>Total Fare</label>
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="In Rupees"
                                id="total_fare"
                                name="total_fare"
                                value={values.total_fare}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <div
                                className={`invalid-feedback ${
                                  touched.total_fare &&
                                  errors.total_fare &&
                                  "d-block"
                                }`}
                              >
                                {errors.total_fare}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="w-170">
                              <label>Advance Amount</label>
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="In Rupees"
                                id="advance_amount"
                                name="advance_amount"
                                value={values.advance_amount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <div
                                className={`invalid-feedback ${
                                  touched.advance_amount &&
                                  errors.advance_amount &&
                                  "d-block"
                                }`}
                              >
                                {errors.advance_amount}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="w-170">
                              <label>Balance Amount</label>
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="In Rupees"
                                id="balance_amount"
                                name="balance_amount"
                                value={values.balance_amount}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              />
                              <div
                                className={`invalid-feedback ${
                                  touched.balance_amount &&
                                  errors.balance_amount &&
                                  "d-block"
                                }`}
                              >
                                {errors.balance_amount}
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="card mb-4">
                  <div className="card-body px-0 pt-0">
                    <div className="row bdr-bottom m-auto">
                      <div className="col-lg-12 text-center">
                        <p className="m-0 py-2">Reward</p>
                      </div>
                    </div>
                    <div className="row pt-2 pb-1 px-2">
                      <div className="col-lg-4 position-relative">
                        <label>Vehicle Departure Date </label>
                        <input
                          className="form-control"
                          type="date"
                          placeholder="Enter Date"
                          id="reward.vehicle_departure_date"
                          name="reward.vehicle_departure_date"
                          value={values.reward.vehicle_departure_date}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div
                          className={`invalid-feedback ${
                            touched?.reward?.vehicle_departure_date &&
                            errors?.reward?.vehicle_departure_date &&
                            "d-block"
                          }`}
                        >
                          {errors?.reward?.vehicle_departure_date}
                        </div>
                      </div>
                      <div className="col-lg-2 position-relative">
                        <label>Time </label>
                        <input
                          className="form-control"
                          type="time"
                          placeholder="Enter Time"
                          id="reward.departure_time"
                          name="reward.departure_time"
                          value={values.reward.departure_time}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div
                          className={`invalid-feedback ${
                            touched?.reward?.departure_time &&
                            errors?.reward?.departure_time &&
                            "d-block"
                          }`}
                        >
                          {errors?.reward?.departure_time}
                        </div>
                      </div>
                      <div className="col-lg-4 position-relative">
                        <label>Vehicle Reaching Date </label>
                        <input
                          className="form-control"
                          type="date"
                          placeholder="Enter Date"
                          id="reward.vehicle_reaching_date"
                          name="reward.vehicle_reaching_date"
                          value={values.reward.vehicle_reaching_date}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div
                          className={`invalid-feedback ${
                            touched?.reward?.vehicle_reaching_date &&
                            errors?.reward?.vehicle_reaching_date &&
                            "d-block"
                          }`}
                        >
                          {errors?.reward?.vehicle_reaching_date}
                        </div>
                      </div>
                      <div className="col-lg-2 position-relative">
                        <label>Time </label>
                        <input
                          className="form-control"
                          type="time"
                          placeholder="Enter Time"
                          id="reward.reaching_time"
                          name="reward.reaching_time"
                          value={values.reward.reaching_time}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div
                          className={`invalid-feedback ${
                            touched?.reward?.reaching_time &&
                            errors?.reward?.reaching_time &&
                            "d-block"
                          }`}
                        >
                          {errors?.reward?.reaching_time}
                        </div>
                      </div>
                    </div>
                    <div className="row pt-2 pb-1 px-2">
                      <div className="col-lg-3 position-relative ">
                        <label>If Driver Reaches Within </label>
                        <div className="input-group">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Enter Time"
                            id="reward.driver_reaches_within"
                            name="reward.driver_reaches_within"
                            value={values.reward.driver_reaches_within}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />

                          <span className="input-group-text" id="basic-addon1">
                            hours
                          </span>
                        </div>{" "}
                        <div
                          className={`invalid-feedback ${
                            touched?.reward?.driver_reaches_within &&
                            errors?.reward?.driver_reaches_within &&
                            "d-block"
                          }`}
                        >
                          {errors?.reward?.driver_reaches_within}
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <label>Then Reward Amount </label>
                        <input
                          className="form-control"
                          type="number"
                          placeholder="In Rupees"
                          id="reward.reward_amount"
                          name="reward.reward_amount"
                          value={values.reward.reward_amount}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div
                          className={`invalid-feedback ${
                            touched?.reward?.reward_amount &&
                            errors?.reward?.reward_amount &&
                            "d-block"
                          }`}
                        >
                          {errors?.reward?.reward_amount}
                        </div>
                      </div>
                      <div className="col-lg-5">
                        <label>Then Reward Amount in Words </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="In Rupees"
                          id="reward.reword_amount_word"
                          name="reward.reword_amount_word"
                          value={values.reward.reword_amount_word}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div
                          className={`invalid-feedback ${
                            touched?.reward?.reword_amount_word &&
                            errors?.reward?.reword_amount_word &&
                            "d-block"
                          }`}
                        >
                          {errors?.reward?.reword_amount_word}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="card mb-4">
                  <div className="card-body px-0 pt-0">
                    <div className="row bdr-bottom m-auto">
                      <div className="col-lg-12 text-center">
                        <p className="m-0 py-2">&nbsp;</p>
                      </div>
                    </div>
                    <div className="row pt-2 pb-1 px-2">
                      <div className="col-lg-4 mb-3">
                        <label>Vehicle owner name </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter Owner’s name"
                          id="vehicle_owner_name"
                          name="vehicle_owner_name"
                          value={values.vehicle_owner_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div
                          className={`invalid-feedback ${
                            touched.vehicle_owner_name &&
                            errors.vehicle_owner_name &&
                            "d-block"
                          }`}
                        >
                          {errors.vehicle_owner_name}
                        </div>
                      </div>
                      <div className="col-lg-4 mb-3">
                        <label>Address </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter address"
                          id="vehicle_owner_address"
                          name="vehicle_owner_address"
                          value={values.vehicle_owner_address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div
                          className={`invalid-feedback ${
                            touched.vehicle_owner_address &&
                            errors.vehicle_owner_address &&
                            "d-block"
                          }`}
                        >
                          {errors.vehicle_owner_address}
                        </div>
                      </div>
                      <div className="col-lg-4 mb-3">
                        <label>Mobile number </label>
                        <input
                          className="form-control"
                          type="number"
                          placeholder="Enter Number"
                          id="vehicle_owner_phone"
                          name="vehicle_owner_phone"
                          value={values.vehicle_owner_phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div
                          className={`invalid-feedback ${
                            touched.vehicle_owner_phone &&
                            errors.vehicle_owner_phone &&
                            "d-block"
                          }`}
                        >
                          {errors.vehicle_owner_phone}
                        </div>
                      </div>
                      {/* 2 */}
                      <div className="col-lg-4 mb-3">
                        <label>Vehicle Driver name </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter Driver’s  name"
                          id="vehicle_driver_name"
                          name="vehicle_driver_name"
                          value={values.vehicle_driver_name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div
                          className={`invalid-feedback ${
                            touched.vehicle_driver_name &&
                            errors.vehicle_driver_name &&
                            "d-block"
                          }`}
                        >
                          {errors.vehicle_driver_name}
                        </div>
                      </div>
                      <div className="col-lg-4 mb-3">
                        <label>Address </label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter address"
                          id="vehicle_driver_address"
                          name="vehicle_driver_address"
                          value={values.vehicle_driver_address}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div
                          className={`invalid-feedback ${
                            touched.vehicle_driver_address &&
                            errors.vehicle_driver_address &&
                            "d-block"
                          }`}
                        >
                          {errors.vehicle_driver_address}
                        </div>
                      </div>
                      <div className="col-lg-4 mb-3">
                        <label>Mobile number </label>
                        <input
                          className="form-control"
                          type="number"
                          placeholder="Enter Number"
                          id="vehicle_driver_phone"
                          name="vehicle_driver_phone"
                          value={values.vehicle_driver_phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <div
                          className={`invalid-feedback ${
                            touched.vehicle_driver_phone &&
                            errors.vehicle_driver_phone &&
                            "d-block"
                          }`}
                        >
                          {errors.vehicle_driver_phone}
                        </div>
                      </div>
                    </div>
                    <div className="row pt-2 pb-1 px-2">
                      <div className="col-lg-8">
                        <div className="row">
                          <div className="col-lg-6 mb-3">
                            <label>Vehicle number </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter name"
                              id="vehicle_number"
                              name="vehicle_number"
                              value={values.vehicle_number}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div
                              className={`invalid-feedback ${
                                touched.vehicle_number &&
                                errors.vehicle_number &&
                                "d-block"
                              }`}
                            >
                              {errors.vehicle_number}
                            </div>
                          </div>
                          <div className="col-lg-6 mb-3">
                            <label>Attached transport </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter name"
                              id="attached_transport"
                              name="attached_transport"
                              value={values.attached_transport}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div
                              className={`invalid-feedback ${
                                touched.attached_transport &&
                                errors.attached_transport &&
                                "d-block"
                              }`}
                            >
                              {errors.attached_transport}
                            </div>
                          </div>
                          <div className="col-lg-6 mb-3">
                            <label>Mobile number </label>
                            <input
                              className="form-control"
                              type="number"
                              placeholder="Enter Number"
                              id="attached_transport_mobile_number"
                              name="attached_transport_mobile_number"
                              value={values.attached_transport_mobile_number}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div
                              className={`invalid-feedback ${
                                touched.attached_transport_mobile_number &&
                                errors.attached_transport_mobile_number &&
                                "d-block"
                              }`}
                            >
                              {errors.attached_transport_mobile_number}
                            </div>
                          </div>
                          <div className="col-lg-6 mb-3">
                            <label>License number </label>
                            <input
                              className="form-control"
                              type="text"
                              placeholder="Enter Enter number"
                              id="license_number"
                              name="license_number"
                              value={values.license_number}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div
                              className={`invalid-feedback ${
                                touched.license_number &&
                                errors.license_number &&
                                "d-block"
                              }`}
                            >
                              {errors.license_number}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <label>Driver Signature</label>
                        <div className="row">
                          <div className="col-lg-12 mb-3">
                            <div className="card signature-card">
                              <div className="card-body">
                                <p className="m-0">Signature</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 text-end">
                <button
                  className="btn btn-danger px-4 btn-sm text-end mb-3 py-1 rounded-pill submit"
                  type="submit"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </Layout>
  );
}
