import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layout";
import { useLocation } from "react-router-dom";

export default function EmailLogsView() {
  const location = useLocation();
  const [message, setMessage] = useState({});
  useEffect(() => {
    if (location?.state) setMessage(location?.state);
  }, [location?.state]);

  return (
    <Layout>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Manage Reports</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a>Manage Reports</a>
                </li>
                <li className="breadcrumb-item active">Email Logs</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Email Logs</h5>
            </div>
            <div className="card-body table-responsive">
              <div className="mb-3">
                <h5>To : </h5>
                {message?.to}
              </div>{" "}
              <div className="mb-3">
                <h5>Subject : </h5>
                {message?.subject}
              </div>
              <div className="mb-3">
                <h5>Message : </h5>
                <div dangerouslySetInnerHTML={{ __html: message?.html }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
