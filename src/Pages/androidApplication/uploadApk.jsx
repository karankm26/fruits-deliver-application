import React, { useState } from "react";
import Layout from "../../components/Layout/index.jsx";
import Loader from "../../utils/loader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { apkUpload } from "../../features/apiSlice.js";
import { useEffect } from "react";

export default function UploadApk() {
  const dispatch = useDispatch();
  const [isSaved, setIsSaved] = useState(false);
  const [apk, setApk] = useState("");
  const { apkUploadDataLoading, apkUploadDataSuccess } = useSelector(
    (state) => state.api
  );

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("apkFile", apk);
    dispatch(apkUpload(formData));
    setIsSaved(true);
  };

  // useEffect(() => {
  //   if (apkUploadDataSuccess && isSaved) {
  //     Navigate("/get-apk");
  //   }
  // }, [apkUploadDataSuccess, isSaved]);
  console.log(apk);
  return (
    <Layout>
      <Loader isLoading={apkUploadDataLoading} />
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <div>
              <h4 className="mb-sm-0">Android Application</h4>
            </div>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a>Android Application</a>
                </li>
                <li className="breadcrumb-item active">Upload Apk</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Upload Apk</h5>
            </div>
            <div className="card-body ">
              <div className="live-preview">
                <div className="row gy-4">
                  <div className=" col-md-4">
                    <div>
                      <label htmlFor="apk" className="form-label">
                        Apk File
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="apk"
                        name="apk"
                        // value={apk}
                        onChange={(e) => setApk(e.target.files[0])}
                      />
                    </div>
                  </div>
                </div>
                <div className="row gy-4  pt-3">
                  <div className="col-12">
                    <button
                      className="btn btn-sm btn-primary"
                      type="button"
                      onClick={handleSubmit}
                    >
                      Submit form
                    </button>
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
