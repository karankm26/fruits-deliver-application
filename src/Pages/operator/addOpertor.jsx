import React, { useState } from "react";
import Layout from "../../components/Layout/index.jsx";
import Loader from "../../utils/loader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { registrationSchema } from "../../schema/registrationSchema.js";
import { createOperator } from "../../features/apiSlice.js";
import { useEffect } from "react";

export default function AddOperator() {
  const dispatch = useDispatch();
  const [isSaved, setIsSaved] = useState(false);

  const { createOperatorDataSuccess, createOperatorDataLoading } = useSelector(
    (state) => state.api
  );
  const [selectedImage, setSelectedImage] = useState("");

  const formik = useFormik({
    initialValues: {
      image: "",
      firstName: "",
      lastName: "",
      phoneNo: "",
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: registrationSchema,
    onSubmit: () => {
      handleSubmit();
    },
  });

  const handleSubmit = () => {
    const { confirm_password, ...restData } = formik.values;
    const body = { ...restData, image: selectedImage };
    const formData = new FormData();
    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        formData.append(key, body[key]);
      }
    }
    dispatch(createOperator(formData));
    setIsSaved(true);
  };

  useEffect(() => {
    if (createOperatorDataSuccess && isSaved) {
      Navigate("/operator-list");
    }
  }, [createOperatorDataSuccess, isSaved]);

  return (
    <Layout>
      <Loader isLoading={createOperatorDataLoading} />
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <div>
              <h4 className="mb-sm-0">Manage Operator</h4>
            </div>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a>Manage Operator</a>
                </li>
                <li className="breadcrumb-item active">Add Operator</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Add Operator</h5>
            </div>
            <form onSubmit={formik.handleSubmit} className="card-body ">
              <div className="live-preview">
                <div className="text-center">
                  <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                    <img
                      src={
                        formik.values.image && selectedImage === ""
                          ? formik.values.image
                          : selectedImage
                          ? URL.createObjectURL(selectedImage)
                          : "assets/images/user-dummy-img.jpg"
                      }
                      className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                      alt="user-profile-image"
                    />
                    <div
                      className={`invalid-feedback ${
                        formik.touched.image && formik.errors.image && "d-block"
                      }`}
                    >
                      {formik.errors.image}
                    </div>
                    <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                      <input
                        id="profile-img-file-input"
                        type="file"
                        name="image"
                        className="profile-img-file-input"
                        onChange={(e) => {
                          setSelectedImage(e.target.files[0]);
                          formik.handleChange({
                            target: {
                              name: e.target.name,
                              value: e.target.files[0],
                            },
                          });
                        }}
                      />
                      <label
                        htmlFor="profile-img-file-input"
                        className="profile-photo-edit avatar-xs"
                      >
                        <span className="avatar-title rounded-circle bg-light text-body">
                          <i className="ri-camera-fill" />
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="row gy-4">
                  <div className=" col-md-4">
                    <div>
                      <label htmlFor="firstName" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <div
                        className={`invalid-feedback ${
                          formik.touched.firstName &&
                          formik.errors.firstName &&
                          "d-block"
                        }`}
                      >
                        {formik.errors.firstName}
                      </div>
                    </div>
                  </div>
                  <div className=" col-md-4">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <div
                        className={`invalid-feedback ${
                          formik.touched.lastName &&
                          formik.errors.lastName &&
                          "d-block"
                        }`}
                      >
                        {formik.errors.lastName}
                      </div>
                    </div>
                  </div>
                  <div className=" col-md-4">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <div
                        className={`invalid-feedback ${
                          formik.touched.email &&
                          formik.errors.email &&
                          "d-block"
                        }`}
                      >
                        {formik.errors.email}
                      </div>
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
                        type="text"
                        className="form-control"
                        id="phoneNo"
                        name="phoneNo"
                        value={formik.values.phoneNo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <div
                        className={`invalid-feedback ${
                          formik.touched.phoneNo &&
                          formik.errors.phoneNo &&
                          "d-block"
                        }`}
                      >
                        {formik.errors.phoneNo}
                      </div>
                    </div>
                  </div>
                  <div className=" col-md-4">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        Passowrd
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <div
                        className={`invalid-feedback ${
                          formik.touched.password &&
                          formik.errors.password &&
                          "d-block"
                        }`}
                      >
                        {formik.errors.password}
                      </div>
                    </div>
                  </div>
                  <div className=" col-md-4">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        Confirm Passowrd
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="confirm_password"
                        name="confirm_password"
                        value={formik.values.confirm_password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <div
                        className={`invalid-feedback ${
                          formik.touched.confirm_password &&
                          formik.errors.confirm_password &&
                          "d-block"
                        }`}
                      >
                        {formik.errors.confirm_password}
                      </div>
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
    </Layout>
  );
}
