import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginSchema, loginStaffSchema } from "../../schema";
import { useDispatch, useSelector } from "react-redux";
// import { login } from "../../features/apiSlice";
import { useFormik } from "formik";
import { loginAsync, loginStaffAsync } from "../../features/loginSlice";
import Loader from "../../utils/loader";
import { history } from "../../history";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  history.navigate = useNavigate();
  history.location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const { loginToken, loginData, loginDataSuccess, loginDataLoading } =
    useSelector((state) => state.login);

  const formikAdmin = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log("submit validation");
      dispatch(loginAsync(values));
    },
  });

  const formikStaff = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema: loginStaffSchema,
    onSubmit: (values) => {
      console.log("staff Submit", values);
      dispatch(loginStaffAsync(values));
    },
  });

  useEffect(() => {
    if (loginDataSuccess && loginData) {
      console.log(loginData.id);
      localStorage.setItem("id", loginData.id);
      localStorage.setItem("token", loginData.token);
      navigate("/");
    }
  }, [loginDataSuccess]);

  return (
    <div className="auth-page-wrapper pt-4">
      <Loader isLoading={loginDataLoading} />
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
                  <Link to={"/"} className="d-inline-block auth-logo">
                    <img
                      src="assets/img/logo-light.png"
                      alt="LOGO"
                      height={55}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* end row */}
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="mt-3">
                {/*  */}
                <div className="card">
                  <div className="card-body">
                    <ul
                      className="nav nav-pills nav-justified px-4 mt-2"
                      role="tablist"
                    >
                      <li className="nav-item waves-effect waves-light">
                        <a
                          className="nav-link active"
                          data-bs-toggle="tab"
                          href="#pill-justified-home-1"
                          role="tab"
                        >
                          Admin
                        </a>
                      </li>
                      <li className="nav-item waves-effect waves-light">
                        <a
                          className="nav-link"
                          data-bs-toggle="tab"
                          href="#pill-justified-profile-1"
                          role="tab"
                        >
                          Staff
                        </a>
                      </li>
                    </ul>
                    {/* Tab panes */}
                    <div className="tab-content text-muted">
                      <div
                        className="tab-pane active"
                        id="pill-justified-home-1"
                        role="tabpanel"
                      >
                        <div className="card-body p-4">
                          <div className="text-center mt-2">
                            <h5 className="text-primary">
                              Welcome Back To Admin Login!
                            </h5>
                            <p className="text-muted">
                              Sign in to continue to Backroom Games.
                            </p>
                          </div>
                          <div className="p-2 mt-4">
                            <form onSubmit={formikAdmin.handleSubmit}>
                              <div className="mb-3">
                                <label
                                  htmlFor="username"
                                  className="form-label"
                                >
                                  Username
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="email"
                                  placeholder="Enter email "
                                  value={formikAdmin.values.email}
                                  onChange={formikAdmin.handleChange}
                                  onBlur={formikAdmin.handleBlur}
                                />
                              </div>
                              <div className="mb-3">
                                <div className="float-end">
                                  <a
                                    href="auth-pass-reset-basic.html"
                                    className="text-muted"
                                  >
                                    Forgot password?
                                  </a>
                                </div>
                                <label
                                  className="form-label"
                                  htmlFor="password-input"
                                >
                                  Password
                                </label>
                                <div className="position-relative auth-pass-inputgroup mb-3">
                                  <input
                                    type={showPassword ? "password" : "text"}
                                    className="form-control pe-5 password-input"
                                    placeholder="Enter password"
                                    id="password"
                                    value={formikAdmin.values.password}
                                    onChange={formikAdmin.handleChange}
                                    onBlur={formikAdmin.handleBlur}
                                  />
                                  <button
                                    className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                    type="button"
                                    id="password-addon"
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                  >
                                    <i className="ri-eye-fill align-middle" />
                                  </button>
                                </div>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue
                                  id="auth-remember-check"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="auth-remember-check"
                                >
                                  Remember me
                                </label>
                              </div>
                              <div className="mt-4">
                                <button
                                  className="btn btn-success w-100"
                                  type="submit"
                                >
                                  Sign In
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane"
                        id="pill-justified-profile-1"
                        role="tabpanel"
                      >
                        <div className="card-body p-4">
                          <div className="text-center mt-2">
                            <h5 className="text-primary">
                              Welcome Back To Staff Login!
                            </h5>
                            <p className="text-muted">
                              Sign in to continue to Backroom Games.
                            </p>
                          </div>
                          <div className="p-2 mt-4">
                            <form onSubmit={formikStaff.handleSubmit}>
                              <div className="mb-3">
                                <label
                                  htmlFor="username"
                                  className="form-label"
                                >
                                  Username
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="username"
                                  placeholder="Enter email"
                                  value={formikStaff.values.username}
                                  onChange={formikStaff.handleChange}
                                  onBlur={formikStaff.handleBlur}
                                />
                              </div>
                              <div className="mb-3">
                                <div className="float-end">
                                  <a
                                    href="auth-pass-reset-basic.html"
                                    className="text-muted"
                                  >
                                    Forgot password?
                                  </a>
                                </div>
                                <label
                                  className="form-label"
                                  htmlFor="password-input"
                                >
                                  Password
                                </label>
                                <div className="position-relative auth-pass-inputgroup mb-3">
                                  <input
                                    type={showPassword ? "password" : "text"}
                                    className="form-control pe-5 password-input"
                                    placeholder="Enter password"
                                    id="password"
                                    value={formikStaff.values.password}
                                    onChange={formikStaff.handleChange}
                                    onBlur={formikStaff.handleBlur}
                                  />
                                  <button
                                    className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                    type="button"
                                    id="password-addon"
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                  >
                                    <i className="ri-eye-fill align-middle" />
                                  </button>
                                </div>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  defaultValue
                                  id="auth-remember-check"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="auth-remember-check"
                                >
                                  Remember me
                                </label>
                              </div>
                              <div className="mt-4">
                                <button
                                  className="btn btn-success w-100"
                                  type="submit"
                                >
                                  Sign In
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* end card-body */}
                </div>
                {/* end card */}
                {/*  */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
