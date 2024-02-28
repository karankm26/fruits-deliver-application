import React, { useState } from "react";
import Layout from "../../components/Layout";
import Editor from "../../utils/editor";
import { subscribersNotificationSendToAll } from "../../features/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import Loader from "../../utils/loader";

export default function SubscriberNotification() {
  const dispatch = useDispatch();
  const [editorHtml, setEditorHtml] = useState("");
  const [subject, setSubject] = useState("");
  const {
    subscribersNotificationDataToAllLoading,
    subscribersNotificationDataToAllSuccess,
    subscribersNotificationDataToAll,
  } = useSelector((state) => state.api);

  const handleSubscriberNotificationsSendToAll = () => {
    if (subject && editorHtml) {
      dispatch(
        subscribersNotificationSendToAll({
          subject: subject,
          text: editorHtml,
        })
      );
    }
  };

  return (
    <Layout>
      {/* <Loader isLoading={subscribersNotificationDataToAllLoading} /> */}
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Manage Subscribers</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a href="javascript: void(0);">Manage Subscribers</a>
                </li>
                <li className="breadcrumb-item active">
                  Subscribers Notification
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      {/* end page title */}
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header align-items-center d-flex">
              <h4 className="card-title mb-0 flex-grow-1">
                Subscribers Notification to All Subscribers
              </h4>
            </div>

            <div className="card-body">
              <div className="live-preview">
                <div className="row gy-3">
                  <div className="col-xxl-3 col-md-12">
                    <div>
                      <label htmlFor="basiInput" className="form-label">
                        Subject
                      </label>
                      <input
                        required
                        type="text"
                        className="form-control"
                        id="basiInput"
                        onChange={(e) => setSubject(e.target.value)}
                        value={subject}
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
                      onClick={handleSubscriberNotificationsSendToAll}
                      className="btn btn-primary"
                    >
                      {subscribersNotificationDataToAllLoading ? (
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
