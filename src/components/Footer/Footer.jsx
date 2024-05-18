import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
            {new Date().getFullYear()}© Jai Laxmi Fruit Supplier Service Center,
            Ugaon.
          </div>
        </div>
      </div>
    </footer>
  );
}
