import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import Context from "../../components/Context";

export default function Profile() {
  const data = useContext(Context);
  return (
    <Layout>
      <div className="profile-foreground position-relative mx-n4 mt-n4">
        <div className="profile-wid-bg">
          <img src={data?.image} alt className="profile-wid-img" />
        </div>
      </div>
      <div className="pt-4 mb-4 mb-lg-3 pb-lg-4 profile-wrapper">
        <div className="row g-4">
          <div className="col-auto">
            <div className="">
              <img
                src={
                  data.image ? data.image : "assets/images/user-dummy-img.jpg"
                }
                className="rounded-circle avatar-xl img-thumbnail user-profile-image"
                alt="user-profile-image"
              />
            </div>
          </div>
          <div className="col">
            <div className="p-2">
              <h3 className="text-white mb-1">
                {data?.firstName} {data?.lastName}
              </h3>
              <p className="text-white text-opacity-75">{data?.role}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div>
            <div className="d-flex profile-wrapper">
              <div className="flex-shrink-0">
                <Link
                  to={"/profile-edit"}
                  className="btn btn-success"
                  hidden={data?.role === "operator"}
                >
                  <i className="ri-edit-box-line align-bottom" /> Edit Profile
                </Link>
              </div>
            </div>
            <div className="tab-content pt-4 text-muted">
              <div
                className="tab-pane active"
                id="overview-tab"
                role="tabpanel"
              >
                <div className="row">
                  <div className="col-xxl-3">
                    <div className="card">
                      <div className="card-body">
                        <h5 className="card-title mb-3">Info</h5>
                        <div className="table-responsive">
                          <table className="table table-borderless mb-0">
                            <tbody>
                              <tr>
                                <th className="ps-0" scope="row">
                                  Full Name :
                                </th>
                                <td className="text-muted">
                                  {data?.firstName} {data?.lastName}
                                </td>
                              </tr>
                              <tr>
                                <th className="ps-0" scope="row">
                                  Mobile :
                                </th>
                                <td className="text-muted">{data?.phoneNo}</td>
                              </tr>
                              <tr>
                                <th className="ps-0" scope="row">
                                  E-mail :
                                </th>
                                <td className="text-muted">{data?.email}</td>
                              </tr>
                            </tbody>
                          </table>
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
  );
}
