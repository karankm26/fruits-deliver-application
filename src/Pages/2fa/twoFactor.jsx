import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import OTPInput from "react-otp-input";
import { verify2FA } from "../../features/loginSlice";
import Loader from "../../utils/loader";

export default function TwoFactor() {
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const { state } = useLocation();
  const { verify2FADataLoading } = useSelector((state) => state.login);

  useEffect(() => {
    if (otp?.length === 6) {
      dispatch(
        verify2FA({
          twoFatorData: {
            email: state?.email,
            code: otp,
            role: state?.data?.role === "admin" ? "admin" : "subadmin",
          },
          loginData: state?.data,
          token: state?.token,
        })
      );
    }
  }, [otp]);

  return (
    <div className="auth-page-wrapper pt-4">
      <Loader isLoading={verify2FADataLoading} />
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

          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-5">
              <div className="card mt-4">
                <div className="card-body p-4">
                  <div className="mb-4">
                    <div className="avatar-lg mx-auto">
                      <div className="avatar-title bg-light text-primary display-5 rounded-circle">
                        <i className="ri-mail-line" />
                      </div>
                    </div>
                  </div>
                  <div className="p-2 mt-4">
                    <div className="text-muted text-center mb-4 mx-lg-3">
                      <h4>Verify Your Two Factor Verification</h4>
                      <p>
                        Please enter the 6 digit verification code from your
                        authenticator app
                      </p>
                    </div>
                    <form autoComplete="off">
                      <div className="row">
                        <OTPInput
                          value={otp}
                          onChange={setOtp}
                          shouldAutoFocus
                          numInputs={6}
                          renderInput={(props) => (
                            <input
                              {...props}
                              className="form-control form-control-lg bg-light border-light text-center mx-1 my-2"
                              style={{ width: "27%" }}
                              id="OTP"
                            />
                          )}
                        />
                      </div>
                    </form>
                    <div className="mt-3">
                      <button type="button" className="btn btn-success w-100">
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
