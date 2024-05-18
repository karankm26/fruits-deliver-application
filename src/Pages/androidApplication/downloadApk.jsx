import React from "react";
import Layout from "../../components/Layout/index.jsx";

export default function DownloadApk() {
  return (
    <Layout>
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
                <li className="breadcrumb-item active">Download Apk</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Download Apk</h5>
            </div>
            <div className="card-body ">
              <div className="live-preview">
                <div className="row gy-4">
                  <div className=" col-md-4">
                    <a
                      href="http://159.223.51.198:5050/api/apk/download" 
                      className="btn btn-sm btn-primary"
                    >
                      Download
                    </a>
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
