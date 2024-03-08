import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchStaffById, register2FA } from "../../features/apiSlice";

export default function TwoFactorError() {
  const dispatch = useDispatch();
  const { staffByIdData, register2FADataSuccess, register2FADataLoading } =
    useSelector((state) => state.api);
  const {
    state: { id, data },
  } = useLocation();

  useEffect(() => {
    if (id) dispatch(fetchStaffById(id));
  }, [dispatch, id, register2FADataSuccess]);

  const handleRegister2FA = () => {
    dispatch(
      register2FA({
        email: data?.email,
        role: data?.role === "admin" ? "admin" : "subadmin",
      })
    );
  };

  return (
    <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
      <div className="bg-overlay" />
      <div className="auth-page-content overflow-hidden pt-lg-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5">
              <div className="card overflow-hidden">
                <div className="card-body p-4">
                  <div
                    className="text-center"
                    hidden={staffByIdData?.twofa_status}
                  >
                    <img
                      src="https://img.themesbrand.com/velzon/images/auth-offline.gif"
                      alt
                      height={210}
                    />
                    <h3 className="mt-4 fw-semibold">
                      Two Factor Authentication Required
                    </h3>
                    <p className="text-muted mb-4 fs-14">
                      Please Complete Your Two Factor Authentication in Order to
                      Procced With Your Staff Account
                    </p>
                    <button
                      className="btn btn-success btn-border"
                      onClick={handleRegister2FA}
                    >
                      {register2FADataLoading ? (
                        <div
                          className="spinner-border spinner-border-sm text-light"
                          role="status"
                        />
                      ) : (
                        "Enable 2FA"
                      )}
                    </button>
                  </div>
                  <div
                    className="row g-2 mt-3"
                    hidden={!staffByIdData?.twofa_status}
                  >
                    <div className="col-lg-12">
                      <h4 className="text-center">Two Factor Authentication</h4>
                      <div className="text-center text-muted fs-14">
                        Scan the QR code using your authenticator web or enter
                        code manually
                      </div>
                      <div className="text-center">
                        <img
                          src={staffByIdData?.twofa_data?.data_url}
                          style={{ filter: "brightness(0%)" }}
                        />
                      </div>
                      <div className="text-center">
                        <p>
                          {staffByIdData?.twofa_data?.userSecretKey}
                          <i
                            className="ri-clipboard-line"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              navigator.clipboard.writeText(
                                staffByIdData?.twofa_data?.userSecretKey
                              )
                            }
                          />
                        </p>
                        <p className="text-muted mb-4 fs-14">
                          Please Complete Your Two Factor Authentication in
                          Order to Procced With Your Staff Account
                        </p>
                        <Link className="btn btn-success btn-border" to={"/"}>
                          Go Back
                        </Link>
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
  );
}
