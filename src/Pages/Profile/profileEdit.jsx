import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../utils/loader";
import Layout from "../../components/Layout";
import Context from "../../components/Context";
import { changeAdminPassword, updateAdmin } from "../../features/apiSlice";
import { snack } from "../../utils/snack";

export default function ProfileEdit() {
  const adminData = useContext(Context);
  const [details, setDetails] = useState(adminData);
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState({
    confirmNewPassword: "",
    newPassword: "",
    currentPassword: "",
  });
  const dispatch = useDispatch();
  const { register2FADataLoading } = useSelector((state) => state.api);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (adminData) setDetails(adminData);
  }, [adminData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { confirm_password, password, ...restData } = details;
    const body = { ...restData, image: selectedImage };
    const formData = new FormData();
    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        formData.append(key, body[key]);
      }
    }
    dispatch(updateAdmin({ id: adminData.id, body: formData }));
    setIsSaved(true);
  };

  const handlePasswordChange = () => {
    if (
      (password.newPassword,
      password.currentPassword,
      password.confirmNewPassword)
    ) {
      if (password.newPassword === password.newPassword) {
        dispatch(
          changeAdminPassword({
            newPassword: password.newPassword,
            oldPassword: password.currentPassword,
          })
        );
      } else {
        snack.error("Password and Confirm Password are not the same");
      }
    }
  };
  return (
    <>
      <Loader isLoading={register2FADataLoading} />
      <Layout>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
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
                    </ul>
                  </div>
                  <div className="card-body p-4">
                    <div className="tab-content">
                      <div
                        className="tab-pane active"
                        id="personalDetails"
                        role="tabpanel"
                      >
                        <form onSubmit={handleSubmit} className="live-preview">
                          <div className="text-center">
                            <div className="profile-user position-relative d-inline-block mx-auto  mb-4">
                              <img
                                src={
                                  details.image && selectedImage === ""
                                    ? details.image
                                    : selectedImage
                                    ? URL.createObjectURL(selectedImage)
                                    : "assets/images/user-dummy-img.jpg"
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
                                  onChange={(e) => {
                                    setSelectedImage(e.target.files[0]);
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
                                <label
                                  htmlFor="firstName"
                                  className="form-label"
                                >
                                  First Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="firstName"
                                  name="firstName"
                                  value={details.firstName}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className=" col-md-4">
                              <div>
                                <label
                                  htmlFor="basiInput"
                                  className="form-label"
                                >
                                  Last Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="lastName"
                                  name="lastName"
                                  value={details.lastName}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className=" col-md-4">
                              <div>
                                <label
                                  htmlFor="basiInput"
                                  className="form-label"
                                >
                                  Email
                                </label>
                                <input
                                  type="email"
                                  className="form-control"
                                  id="email"
                                  name="email"
                                  value={details.email}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row gy-4 pt-2 pb-3">
                            <div className=" col-md-4">
                              <div>
                                <label
                                  htmlFor="basiInput"
                                  className="form-label"
                                >
                                  Mobile
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  id="phoneNo"
                                  name="phoneNo"
                                  value={details.phoneNo}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row gy-4  pt-3">
                            <div className="col-12">
                              <button
                                className="btn btn-sm btn-primary"
                                type="submit"
                              >
                                Submit form
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>

                      <div
                        className="tab-pane"
                        id="changePassword"
                        role="tabpanel"
                      >
                        <div>
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
                              </div>
                            </div>

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
                              </div>
                            </div>

                            <div className="col-lg-12">
                              <div className="text-end">
                                <button
                                  type="button"
                                  onClick={handlePasswordChange}
                                  className="btn btn-success"
                                >
                                  Change Password
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
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
