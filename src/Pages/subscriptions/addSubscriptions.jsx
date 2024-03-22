import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { addSubscription } from "../../features/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../utils/loader";
import { useFormik } from "formik";
import { subscriptionSchema } from "../../schema";
import { MultiSelect } from "react-multi-select-component";
import { useNavigate } from "react-router-dom";

export default function AddSubscriptions() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const {
    addSubscriptionDataLoading,
    addSubscriptionData,
    addSubscriptionDataSuccess,
  } = useSelector((state) => state.api);

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      duration: "",
      features: [],
      planType: "",
    },
    validationSchema: subscriptionSchema,
    onSubmit: () => {
      dispatch(addSubscription(formik.values));
      setSuccess(true);
    },
  });
  const features = [
    { label: "Create Ultimate Events", value: "create_event" },
    { label: "View Your Event Status", value: "view_event_status" },
    { label: "View Invitation Status", value: "view_invitation_status" },
    { label: "Edit Events Anytime", value: "edit_event_anytime" },
    { label: "Add Your Preferred Players", value: "add_preferred_player" },
  ];

  console.log(formik.values);
  const handleChange = (e) => {
    formik.setValues({
      ...formik.values,
      features: e,
    });
  };
  console.log(addSubscriptionData);

  useEffect(() => {
    if (addSubscriptionDataSuccess && success) {
      navigate("/subscriptions-plans");
    }
  }, [addSubscriptionDataSuccess, success]);

  return (
    <Layout>
      <Loader isLoading={addSubscriptionDataLoading} />
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Manage Subscription</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);">Manage Subscription</a>
                </li>
                <li className="breadcrumb-item active">Add Subscription</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      {/* end page title */}
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header align-items-center d-flex">
              <h4 className="card-title mb-0 flex-grow-1">
                Add Subscription Plan
              </h4>
            </div>

            <div className="card-body">
              <form onSubmit={formik.handleSubmit} className="live-preview">
                <div className="row gy-3">
                  <div className="col-md-6">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        Plan Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />

                      <div
                        className={`invalid-feedback ${
                          formik.touched.title &&
                          formik.errors.title &&
                          "d-block"
                        }`}
                      >
                        {formik.errors.title}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        Plan Duration
                      </label>
                      <select
                        className="form-select"
                        id="duration"
                        name="duration"
                        value={formik.values.duration}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="" selected>
                          Select
                        </option>
                        <option value="monthly">Monthly</option>
                        <option value="yearly">Yearly</option>
                      </select>{" "}
                      <div
                        className={`invalid-feedback ${
                          formik.touched.duration &&
                          formik.errors.duration &&
                          "d-block"
                        }`}
                      >
                        {formik.errors.duration}
                      </div>
                    </div>
                  </div>{" "}
                  <div className="col-md-6">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        Price
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="price"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />{" "}
                      <div
                        className={`invalid-feedback ${
                          formik.touched.price &&
                          formik.errors.price &&
                          "d-block"
                        }`}
                      >
                        {formik.errors.price}
                      </div>
                    </div>
                  </div>{" "}
                  <div className="col-md-6">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        Plan Type
                      </label>
                      <select
                        className="form-select"
                        id="planType"
                        name="planType"
                        value={formik.values.planType}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <option value="" selected>
                          Select
                        </option>
                        <option value="basic">Basic</option>
                        <option value="premium">Premium</option>
                      </select>{" "}
                      <div
                        className={`invalid-feedback ${
                          formik.touched.planType &&
                          formik.errors.planType &&
                          "d-block"
                        }`}
                      >
                        {formik.errors.planType}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <label htmlFor="basicInput" className="form-label">
                      Features
                    </label>
                    <MultiSelect
                      options={features}
                      value={formik.values.features}
                      onChange={handleChange}
                      labelledBy="Select"
                      onMenuToggle={(e) => {
                        if (e) {
                          formik.handleBlur({
                            target: { name: "features", id: "features" },
                          });
                        }
                      }}
                    />
                    <div
                      className={`invalid-feedback ${
                        formik.touched.features &&
                        formik.errors.features &&
                        "d-block"
                      }`}
                    >
                      {formik.errors.features}
                    </div>
                  </div>
                </div>
                <div className="row gy-3 pt-3 ">
                  <div className="col-md-12">
                    <button
                      // onClick={handleSubscriberNotificationsSendToAll}
                      className="btn btn-primary"
                      type="submit"
                    >
                      {addSubscriptionDataLoading ? (
                        <div
                          className="spinner-border spinner-border-sm text-light"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
