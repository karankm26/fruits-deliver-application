import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            {new Date().getFullYear()}© Backroom Games.
          </div>
          {/* <div className="col-sm-6">
            <div className="text-sm-end d-none d-sm-block">
              Design &amp; Develop by Agnito
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  );
}
