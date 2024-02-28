import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registrationSchema } from "../../schema";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../features/apiSlice";

export default function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { data, status, error } = useSelector((state) => state.api);
  console.log(data, status, error);
  const formik = useFormik({
    initialValues: { firstName: "", lastName: "", email: "", password: "" },
    validationSchema: registrationSchema,
    onSubmit: (values) => {
      dispatch(register(values));
      if (status === "succeeded") {
        navigate("/login");
      }
    },
  });
  return (
    <div className="auth-page-wrapper pt-3">
      <div className="auth-one-bg-position auth-one-bg" id="auth-particles">
        <div className="bg-overlay" />
        <div className="shape">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 1440 120"
          >
            <path d="M 0,36 C 144,53.6 432,123.2 720,124 C 1008,124.8 1296,56.8 1440,40L1440 140L0 140z" />
          </svg>
        </div>
      </div>
      <div className="auth-page-content">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center text-white-50">
                <div>
                  <a href="index.html" className="d-inline-block auth-logo">
                    <img src="assets/img/logo-light.png" alt height={55} />
                  </a>
                </div>
                {/* <p className="mt-3 fs-15 fw-medium">Admin Panel</p> */}
              </div>
            </div>
          </div>
          {/* end row */}
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card mt-4">
                <div className="card-body p-4">
                  <div className="text-center mt-2">
                    <h5 className="text-primary">Create New Account</h5>
                  
                  </div>
                  <div className="p-2 mt-4">
                    <form
                      onSubmit={formik.handleSubmit}
                      className="needs-validation"
                      noValidate
                    >
                      <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                          First Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="firstName"
                          placeholder="Enter First Name"
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
                      <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                          Last Name <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="lastName"
                          placeholder="Enter Last Name"
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
                      <div className="mb-3">
                        <label htmlFor="useremail" className="form-label">
                          Email <span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Enter email address"
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

                      <div className="mb-3">
                        <label className="form-label" htmlFor="password-input">
                          Password
                        </label>
                        <div className="position-relative auth-pass-inputgroup">
                          <input
                            type={showPassword ? "password" : "text"}
                            className="form-control pe-5 password-input"
                            placeholder="Enter password"
                            id="password"
                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          <button
                            className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                            type="button"
                            id="password-addon"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {/* {showPassword ? (
                              <i className="ri-eye-fill align-middle" />
                            ) : ( */}
                            <i className="ri-eye-fill align-middle" />
                            {/* )} */}
                          </button>
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
                      <div className="mb-4">
                        <p className="mb-0 fs-12 text-muted fst-italic">
                          By registering you agree to the Velzon{" "}
                          <a
                            href="#"
                            className="text-primary text-decoration-underline fst-normal fw-medium"
                          >
                            Terms of Use
                          </a>
                        </p>
                      </div>
                      <div
                        id="password-contain"
                        className="p-3 bg-light mb-2 rounded"
                      >
                        <h5 className="fs-13">Password must contain:</h5>
                        <p id="pass-length" className="invalid fs-12 mb-2">
                          Minimum <b>8 characters</b>
                        </p>
                        <p id="pass-lower" className="invalid fs-12 mb-2">
                          At <b>lowercase</b> letter (a-z)
                        </p>
                        <p id="pass-upper" className="invalid fs-12 mb-2">
                          At least <b>uppercase</b> letter (A-Z)
                        </p>
                        <p id="pass-number" className="invalid fs-12 mb-0">
                          A least <b>number</b> (0-9)
                        </p>
                      </div>
                      <div className="mt-4">
                        <button className="btn btn-success w-100" type="submit">
                          Sign Up
                        </button>
                      </div>
                      {/* <div className="mt-4 text-center">
                        <div className="signin-other-title">
                          <h5 className="fs-13 mb-4 title text-muted">
                            Create account with
                          </h5>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="btn btn-primary btn-icon waves-effect waves-light"
                          >
                            <i className="ri-facebook-fill fs-16" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger btn-icon waves-effect waves-light"
                          >
                            <i className="ri-google-fill fs-16" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-dark btn-icon waves-effect waves-light"
                          >
                            <i className="ri-github-fill fs-16" />
                          </button>
                          <button
                            type="button"
                            className="btn btn-info btn-icon waves-effect waves-light"
                          >
                            <i className="ri-twitter-fill fs-16" />
                          </button>
                        </div>
                      </div> */}
                    </form>
                  </div>
                </div>
                {/* end card body */}
              </div>
              {/* end card */}
              <div className="mt-4 text-center">
                <p className="mb-0">
                  Already have an account ?{" "}
                  <Link
                    to={"/login"}
                    className="fw-semibold text-primary text-decoration-underline"
                  >
                    Signin
                  </Link>{" "}
                </p>
              </div>
            </div>
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </div>
      {/* end auth page content */}
      {/* footer */}

      {/* end Footer */}
    </div>
  );
}
