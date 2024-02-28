import React from "react";

export default function ErrorPermission() {
  return (
    <div className="auth-page-wrapper auth-bg-cover py-5 d-flex justify-content-center align-items-center min-vh-100">
      <div className="bg-overlay" />
      {/* auth-page content */}
      <div className="auth-page-content overflow-hidden pt-lg-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-5">
              <div className="card overflow-hidden">
                <div className="card-body p-4">
                  <div className="text-center">
                    <lord-icon
                      className="avatar-xl"
                      src="https://cdn.lordicon.com/etwtznjn.json"
                      trigger="loop"
                      colors="primary:#405189,secondary:#0ab39c"
                    />
                    <h1 className="text-primary mb-4">Oops !</h1>
                    <h4 className="text-uppercase">Sorry, Page not Found 😭</h4>
                    <p className="text-muted mb-4">
                      The page you are looking for not available or need
                      Permission !
                    </p>
                    <a href="index.html" className="btn btn-success">
                      <i className="mdi mdi-home me-1" />
                      Back to home
                    </a>
                  </div>
                </div>
              </div>
              {/* end card */}
            </div>
            {/* end col */}
          </div>
          {/* end row */}
        </div>
        {/* end container */}
      </div>
      {/* end auth page content */}
    </div>
  );
}
