import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdmin,
  fetchStaffById,
  passwordChange,
  register2FA,
  staffUpdate,
  update,
} from "../../features/apiSlice";
import Loader from "../../utils/loader";
import Layout from "../../components/Layout";
import Context from "../../components/Context";
import { snack } from "../../utils/snack";

export default function ProfileEdit() {
  const userId = localStorage.getItem("id");
  const ref = useRef();
  const adminData = useContext(Context);
  const [details, setDetails] = useState(adminData);
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState({
    confirmNewPassword: "",
    newPassword: "",
    currentPassword: "",
  });
  const [selectedImage, setSelectedImage] = useState("");
  const dispatch = useDispatch();
  const {
    profileUpdate,
    profileUpdateLoading,
    profileUpdateError,
    profileUpdateSuccess,
    register2FADataLoading,
    register2FADataSuccess,
    staffUpdateDataSuccess,
    staffUpdateDataLoading,
  } = useSelector((state) => state.api);
  const { loginData } = useSelector((state) => state.login);

  console.log(adminData);

  useEffect(() => {
    if (loginData?.role === "admin") {
      dispatch(fetchAdmin(loginData?.id));
    } else {
      dispatch(fetchStaffById(loginData?.id));
    }
  }, [
    dispatch,
    loginData?.role,
    loginData?.id,
    register2FADataSuccess,
    profileUpdateSuccess,
    staffUpdateDataSuccess,
  ]);

  useEffect(() => {
    if (adminData) setDetails(adminData);
  }, [adminData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (selectedImage) {
      formData.append("image", selectedImage);
      dispatch(update({ id: userId, body: formData }));
    }
    dispatch(update({ id: userId, body: details }));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (password.confirmNewPassword === password.newPassword) {
      if (adminData?.role === "admin") {
        dispatch(
          passwordChange({
            password: password.currentPassword,
            newPassword: password.newPassword,
          })
        );
      } else {
        dispatch(passwordChange({ password }));
      }
    } else {
      snack.error("new password and confirm password must match");
    }
  };
  console.log(password);
  const excludedFields = [
    "createdAt",
    "updatedAt",
    "id",
    "status",
    "role",
    "password",
  ];

  const filledFields = Object.entries(adminData).filter(
    ([key, value]) =>
      !excludedFields.includes(key) && value !== null && value !== ""
  ).length;
  const totalFields = Object.keys(adminData).length - excludedFields.length;
  const filledPercentage = (filledFields / totalFields) * 100;

  const handleRegister2FA = () => {
    dispatch(
      register2FA({
        email: adminData?.email,
        role: adminData?.role === "admin" ? "admin" : "subadmin",
      })
    );
  };
  const handleDisable2FA = () => {
    const data = { id: adminData.id, body: { twofa_status: 0 } };
    if (adminData?.role === "admin") {
      dispatch(update(data));
    } else {
      dispatch(staffUpdate(data));
    }
  };

  // useEffect(() => {
  //   if (adminData?.twofa_data?.data_url) {
  //     if (ref.current) {
  //       const canvas = ref.current;
  //       const ctx = canvas.getContext("2d");
  //       const image = new Image();
  //       image.src = adminData?.twofa_data?.data_url;
  //       const overlay = new Image();
  //       overlay.src = "/assets/img/logo-light.png";
  //       image.onload = function () {
  //         canvas.width = image.width;
  //         canvas.height = image.height;
  //         ctx.drawImage(image, 0, 0);
  //         overlay.onload = function () {
  //           const overlayWidth = 60;
  //           const overlayHeight = 60;
  //           const centerX = canvas.width / 2 - overlayWidth / 2;
  //           const centerY = canvas.height / 2 - overlayHeight / 2;
  //           ctx.fillStyle = "black";
  //           ctx.beginPath();
  //           ctx.moveTo(centerX + 5, centerY);
  //           ctx.lineTo(centerX + overlayWidth - 5, centerY);
  //           ctx.quadraticCurveTo(
  //             centerX + overlayWidth,
  //             centerY,
  //             centerX + overlayWidth,
  //             centerY + 5
  //           );
  //           ctx.lineTo(centerX + overlayWidth, centerY + overlayHeight - 5);
  //           ctx.quadraticCurveTo(
  //             centerX + overlayWidth,
  //             centerY + overlayHeight,
  //             centerX + overlayWidth - 5,
  //             centerY + overlayHeight
  //           );
  //           ctx.lineTo(centerX + 5, centerY + overlayHeight);
  //           ctx.quadraticCurveTo(
  //             centerX,
  //             centerY + overlayHeight,
  //             centerX,
  //             centerY + overlayHeight - 5
  //           );
  //           ctx.lineTo(centerX, centerY + 5);
  //           ctx.quadraticCurveTo(centerX, centerY, centerX + 5, centerY);
  //           ctx.closePath();
  //           ctx.fill();
  //           ctx.drawImage(
  //             overlay,
  //             centerX,
  //             centerY,
  //             overlayWidth,
  //             overlayHeight
  //           );
  //         };
  //       };
  //     }
  //   }
  // }, [adminData?.twofa_data?.data_url]);

  useEffect(() => {
    const theme = document
      .getElementById("data-theme-template")
      .getAttribute("data-bs-theme");
    console.log(theme);
  }, []);

  useEffect(() => {
    const modeType = localStorage.getItem("mode");
    console.log(
      `/assets/img/logo-${modeType === "true" ? `dark` : `light`}.png`
    );
    if (adminData?.twofa_data?.data_url) {
      if (ref.current) {
        const canvas = ref.current;
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.src = adminData?.twofa_data?.data_url;
        const overlay = new Image();
        overlay.src = `/assets/img/logo-${
          modeType === "true" ? `light` : `dark`
        }.png`;
        image.onload = function () {
          canvas.width = image.width;
          canvas.height = image.height;
          // Apply filter here before drawing the main image
          ctx.filter = "brightness(0%)"; // Example: applying brightness filter
          ctx.drawImage(image, 0, 0);
          // Reset filter after drawing the main image
          ctx.filter = "none";
          overlay.onload = function () {
            const overlayWidth = 60;
            const overlayHeight = 60;
            const centerX = canvas.width / 2 - overlayWidth / 2;
            const centerY = canvas.height / 2 - overlayHeight / 2;
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.moveTo(centerX + 5, centerY);
            ctx.lineTo(centerX + overlayWidth - 5, centerY);
            ctx.quadraticCurveTo(
              centerX + overlayWidth,
              centerY,
              centerX + overlayWidth,
              centerY + 5
            );
            ctx.lineTo(centerX + overlayWidth, centerY + overlayHeight - 5);
            ctx.quadraticCurveTo(
              centerX + overlayWidth,
              centerY + overlayHeight,
              centerX + overlayWidth - 5,
              centerY + overlayHeight
            );
            ctx.lineTo(centerX + 5, centerY + overlayHeight);
            ctx.quadraticCurveTo(
              centerX,
              centerY + overlayHeight,
              centerX,
              centerY + overlayHeight - 5
            );
            ctx.lineTo(centerX, centerY + 5);
            ctx.quadraticCurveTo(centerX, centerY, centerX + 5, centerY);
            ctx.closePath();
            ctx.fill();
            // Draw the overlay image
            ctx.drawImage(
              overlay,
              centerX,
              centerY,
              overlayWidth,
              overlayHeight
            );
          };
        };
      }
    }
  }, [adminData?.twofa_data?.data_url]);

  return (
    <>
      <Loader
        isLoading={
          register2FADataLoading ||
          profileUpdateLoading ||
          staffUpdateDataLoading
        }
      />
      <Layout>
        <div className="position-relative mx-n4 mt-n4">
          <div className="profile-wid-bg profile-setting-img">
            <img
              src="assets/images/profile-bg.jpg"
              className="profile-wid-img"
              alt
            />
            <div className="overlay-content">
              <div className="text-end p-3">
                <div className="p-0 ms-auto rounded-circle profile-photo-edit">
                  <input
                    id="profile-foreground-img-file-input"
                    type="file"
                    className="profile-foreground-img-file-input"
                  />
                  <label
                    htmlFor="profile-foreground-img-file-input"
                    className="profile-photo-edit btn btn-light"
                  >
                    <i className="ri-image-edit-line align-bottom me-1" />
                    Change Cover
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xxl-12">
            <div className="card mt-n5">
              <div className="card-body p-4">
                <div className="text-center">
                  <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                    <img
                      src={
                        details?.image && selectedImage === ""
                          ? details.image
                          : selectedImage
                          ? URL.createObjectURL(selectedImage)
                          : "assets/images/users/avatar-1.jpg"
                      }
                      className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                      alt="user-profile-image"
                    />
                    <div className="avatar-xs p-0 rounded-circle profile-photo-edit">
                      <input
                        id="profile-img-file-input"
                        type="file"
                        name="image"
                        className="profile-img-file-input"
                        onChange={(e) => setSelectedImage(e.target.files[0])}
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
                  <h5 className="fs-16 mb-1">
                    {adminData?.firstName} {adminData?.lastName}
                  </h5>
                  <p className="text-muted mb-0">{adminData?.role}</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-5">
                  <div className="flex-grow-1">
                    <h5 className="card-title mb-0">Complete Your Profile</h5>
                  </div>
                  <div className="flex-shrink-0">
                    <a
                      href="javascript:void(0);"
                      className="badge bg-light text-primary fs-12"
                    >
                      <i className="ri-edit-box-line align-bottom me-1" /> Edit
                    </a>
                  </div>
                </div>

                <div className="progress animated-progress custom-progress progress-label">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: filledPercentage + "%" }}
                    aria-valuenow={30}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div className="label">{filledPercentage.toFixed(1)}%</div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center mb-4">
                  <div className="flex-grow-1">
                    <h5 className="card-title mb-0">Portfolio</h5>
                  </div>
                  <div className="flex-shrink-0">
                    <a
                      href="javascript:void(0);"
                      className="badge bg-light text-primary fs-12"
                    >
                      <i className="ri-add-fill align-bottom me-1" /> Add
                    </a>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3 d-flex">
                    <div className="avatar-xs d-block flex-shrink-0 me-3">
                      <span className="avatar-title rounded-circle fs-16 bg-info text-body">
                        <i className="ri-facebook-fill text-light" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="facebook"
                      name="facebook"
                      value={details?.facebook}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 d-flex">
                    <div className="avatar-xs d-block flex-shrink-0 me-3">
                      <span
                        className="avatar-title rounded-circle fs-16 bg-info text-body"
                        style={{
                          background:
                            "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)",
                        }}
                      >
                        <i className="ri-instagram-fill text-light" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="instagram"
                      name="instagram"
                      value={details?.instagram}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 d-flex">
                    <div className="avatar-xs d-block flex-shrink-0 me-3">
                      <span className="avatar-title rounded-circle fs-16 bg-info text-body">
                        <i className="ri-linkedin-fill text-light" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="linkedin"
                      name="linkedin"
                      value={details?.linkedin}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 d-flex">
                    <div className="avatar-xs d-block flex-shrink-0 me-3">
                      <span className="avatar-title rounded-circle fs-16 bg-primary">
                        <i className="ri-global-fill" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="personal website"
                      name="personal_website"
                      value={details?.personal_website}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 d-flex">
                    <div className="avatar-xs d-block flex-shrink-0 me-3">
                      <span className="avatar-title rounded-circle fs-16 bg-success">
                        <i className="ri-pinterest-fill" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="pinterest"
                      name="pinterest"
                      value={details?.pinterest}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-flex mb-3">
                    <div className="avatar-xs d-block flex-shrink-0 me-3">
                      <span className="avatar-title rounded-circle fs-16 bg-info">
                        <i className="ri-telegram-fill" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="telegram"
                      name="telegram"
                      value={details?.telegram}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3 d-flex">
                    <div className="avatar-xs d-block flex-shrink-0 me-3">
                      <span className="avatar-title rounded-circle fs-16 bg-info text-body">
                        <i className="ri-twitter-fill text-light" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="twitter"
                      name="twitter"
                      value={details?.twitter}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="text-end">
                    <button type="submit" className="btn btn-sm btn-primary">
                      Updates
                    </button>
                  </div>
                </form>
              </div>
            </div> */}
          </div>

          <div className="col-xxl-12">
            <div className="card mt-xxl-n5">
              <div className="card-header">
                <ul
                  className="nav nav-tabs-custom rounded card-header-tabs border-bottom-0"
                  role="tablist"
                >
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-bs-toggle="tab"
                      href="#personalDetails"
                      role="tab"
                    >
                      <i className="fas fa-home" /> Personal Details
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-bs-toggle="tab"
                      href="#changePassword"
                      role="tab"
                    >
                      <i className="far fa-user" /> Change Password
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-bs-toggle="tab"
                      href="#2fa"
                      role="tab"
                    >
                      <i className="far fa-user" /> 2FA
                    </a>
                  </li>
                </ul>
              </div>
              <div className="card-body p-4">
                <div className="tab-content">
                  <div
                    className="tab-pane active"
                    id="personalDetails"
                    role="tabpanel"
                  >
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label
                              htmlFor="firstnameInput"
                              className="form-label"
                            >
                              First Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="firstnameInput"
                              placeholder="Enter your firstname"
                              name="firstName"
                              value={details?.firstName}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label
                              htmlFor="lastnameInput"
                              className="form-label"
                            >
                              Last Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="lastnameInput"
                              placeholder="Enter your lastname"
                              name="lastName"
                              onChange={handleChange}
                              value={details?.lastName}
                            />
                          </div>
                        </div>

                        <div className="col-lg-6">
                          <div className="mb-3">
                            <label htmlFor="emailInput" className="form-label">
                              Email Address
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="emailInput"
                              placeholder="Enter your email"
                              name="email"
                              value={details?.email}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="hstack gap-2 justify-content-end">
                            <button type="submit" className="btn btn-primary">
                              Updates
                            </button>
                            <button
                              type="button"
                              className="btn btn-soft-success"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="tab-pane" id="changePassword" role="tabpanel">
                    <form onSubmit={handlePasswordChange}>
                      <div className="row g-2">
                        <div className="col-lg-4">
                          <div className="position-relative auth-pass-inputgroup mb-3">
                            <label
                              htmlFor="oldpasswordInput"
                              className="form-label"
                            >
                              Old Password*
                            </label>
                            <input
                              type={showPassword ? "password" : "text"}
                              className="form-control"
                              id="oldpasswordInput"
                              placeholder="Enter current password"
                              onChange={(e) =>
                                setPassword({
                                  ...password,
                                  currentPassword: e.target.value,
                                })
                              }
                            />
                            <button
                              className="btn btn-link position-absolute end-0 text-decoration-none text-muted password-addon password-eye "
                              type="button"
                              id="password-addon"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <i
                                className={`ri-eye-${
                                  showPassword ? `` : `off-`
                                }fill align-middle`}
                              />
                            </button>
                          </div>
                        </div>
                        0
                        <div className="col-lg-4">
                          <div>
                            <label
                              htmlFor="newpasswordInput"
                              className="form-label"
                            >
                              New Password*
                            </label>
                            <input
                              type={showPassword ? "password" : "text"}
                              className="form-control"
                              id="newpasswordInput"
                              placeholder="Enter new password"
                              onChange={(e) =>
                                setPassword({
                                  ...password,
                                  newPassword: e.target.value,
                                })
                              }
                            />
                            <button
                              className="btn btn-link position-absolute end-0 text-decoration-none text-muted password-addon password-eye "
                              type="button"
                              id="password-addon"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <i
                                className={`ri-eye-${
                                  showPassword ? `` : `off-`
                                }fill align-middle`}
                              />
                            </button>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div>
                            <label
                              htmlFor="confirmpasswordInput"
                              className="form-label"
                            >
                              Confirm Password*
                            </label>
                            <input
                              type={showPassword ? "password" : "text"}
                              className="form-control"
                              id="confirmpasswordInput"
                              placeholder="Confirm password"
                              onChange={(e) =>
                                setPassword({
                                  ...password,
                                  confirmNewPassword: e.target.value,
                                })
                              }
                            />
                            <button
                              className="btn btn-link position-absolute end-0 text-decoration-none text-muted password-addon password-eye "
                              type="button"
                              id="password-addon"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              <i
                                className={`ri-eye-${
                                  showPassword ? `` : `off-`
                                }fill align-middle`}
                              />
                            </button>
                          </div>
                        </div>
                        {/* <div className="col-lg-12">
                          <div className="mb-3">
                            <a
                              href="javascript:void(0);"
                              className="link-primary text-decoration-underline"
                            >
                              Forgot Password ?
                            </a>
                          </div>
                        </div> */}
                        <div className="col-lg-12">
                          <div className="text-end">
                            <button type="submit" className="btn btn-success">
                              Change Password
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>

                  <div className="tab-pane" id="2fa" role="tabpanel">
                    <form onSubmit={handlePasswordChange}>
                      <div
                        className="row g-2"
                        hidden={!adminData?.twofa_status}
                      >
                        <div className="col-lg-12">
                          <h4 className="text-center">
                            Two Factor Authentication
                          </h4>
                          <div className="text-center">
                            Scan the QR code using your authenticator web or
                            enter code manually
                          </div>
                          <div className="text-center">
                            <img
                              src={adminData?.twofa_data?.data_url}
                              style={{ filter: "brightness(0%)" }}
                            />
                            {/* <canvas
                              ref={ref}
                              // style={{ filter: "brightness(0%)" }}
                            ></canvas> */}
                          </div>
                          <div className="text-center">
                            <p>
                              {adminData?.twofa_data?.userSecretKey}
                              <i
                                className="ri-clipboard-line"
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  navigator.clipboard.writeText(
                                    adminData?.twofa_data?.userSecretKey
                                  )
                                }
                              />
                            </p>
                          </div>
                        </div>
                        <div
                          className="col-lg-12"
                          hidden={adminData?.role === "sub-admin"}
                        >
                          <div className="text-center">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleDisable2FA}
                            >
                              Disable
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="row g-2" hidden={adminData?.twofa_status}>
                        <div className="col-lg-10 col-md-10">
                          <h4 className="text-lg-start text-md-start text-center">
                            Two Factor Authentication
                          </h4>
                        </div>
                        <div className="col-lg-2 col-md-2">
                          <div className="text-lg-end text-md-end text-center">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={handleRegister2FA}
                            >
                              Enable
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
