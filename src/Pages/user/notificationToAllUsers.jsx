import React, { useState } from "react";
import Layout from "../../components/Layout";
import Editor from "../../utils/editor";
import { allUserNotification } from "../../features/apiSlice";
import { useDispatch, useSelector } from "react-redux";

export default function NotificationToAllUsers() {
  const dispatch = useDispatch();
  const [editorHtml, setEditorHtml] = useState("");
  const [subject, setSubject] = useState("");

  const {
    allUserNotificationDataLoading,
    allUserNotificationDataSuccess,
    allUserNotificationData,
  } = useSelector((state) => state.api);

  const handleAllUserNotification = (e) => {
    console.log("hello");
    e.preventDefault();
    dispatch(
      allUserNotification({
        subject: subject,
        html: editorHtml,
      })
    );
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Manage Users</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);">Manage Users</a>
                </li>
                <li className="breadcrumb-item active">
                  Notification to All Users
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header align-items-center d-flex">
              <h4 className="card-title mb-0 flex-grow-1">
                Notification to All Users
              </h4>
            </div>

            <div className="card-body">
              <form
                onSubmit={handleAllUserNotification}
                className="live-preview"
              >
                <div className="row gy-3">
                  <div className="col-xxl-3 col-md-12">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        Subject
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="basiInput"
                        onChange={setSubject}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-3 col-md-12">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        Message
                      </label>
                      <Editor
                        setEditorHtml={setEditorHtml}
                        editorHtml={editorHtml}
                      />
                    </div>
                  </div>
                </div>
                <div className="row gy-3 pt-2">
                  <div className="col-xxl-3 col-md-12">
                    <button
                      // onClick={handleAllUserNotification}
                      type="submit"
                      className="btn btn-primary"
                    >
                      {allUserNotificationDataLoading ? (
                        <div
                          className="spinner-border spinner-border-sm text-light"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        "Send"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
