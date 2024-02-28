import React from "react";

export default function Error500() {
  return (
    <div className="auth-page-wrapper py-5 d-flex justify-content-center align-items-center min-vh-100">
      {/* auth-page content */}
      <div className="auth-page-content overflow-hidden p-0">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-xl-4 text-center">
              <div className="error-500 position-relative">
                <img
                  src="assets/images/error500.png"
                  alt
                  className="img-fluid error-500-img error-img"
                />
                <h1 className="title text-muted">500</h1>
              </div>
              <div>
                <h4>Internal Server Error!</h4>
                <p className="text-muted w-75 mx-auto">
                  Server Error 500. We're not exactly sure what happened, but
                  our servers say something is wrong.
                </p>
                <a href="index.html" className="btn btn-success">
                  <i className="mdi mdi-home me-1" />
                  Back to home
                </a>
              </div>
            </div>
            {/* end col*/}
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </div>
      {/* end auth-page content */}
    </div>
  );
}
