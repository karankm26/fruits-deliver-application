var contactNo = new Cleave("#contactNumber", {
    delimiters: ["(", ")", "-"],
    blocks: [0, 3, 3, 4],
  }),
  str_dt = function (e) {
    var e = new Date(e),
      t =
        "" +
        [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ][e.getMonth()],
      a = "" + e.getDate(),
      e = e.getFullYear();
    return (
      t.length < 2 && (t = "0" + t),
      [(a = a.length < 2 ? "0" + a : a) + " " + t, e].join(", ")
    );
  };
(form = document.getElementById("deals-form")).addEventListener(
  "submit",
  function (e) {
    if ((e.preventDefault(), form.checkValidity())) {
      var t = document.getElementById("dealTitle").value,
        a = document.getElementById("dealValue").value,
        s = document.getElementById("deatType").value,
        l = document.getElementById("dealOwner").value,
        d = document.getElementById("dueDate").value,
        i = document.getElementById("contactNumber").value,
        n = document.getElementById("dealEmail").value,
        c = document.getElementById("contactDescription").value,
        o = l.split(" "),
        o =
          `<div className="card">
                            <div className="card-body">
                                <a className="d-flex align-items-center" data-bs-toggle="collapse" href="#` +
          t +
          `" role="button" aria-expanded="false" aria-controls="leadDiscovered1">
                                    <div className="flex-shrink-0">
                                        ` +
          ('<div className="flex-shrink-0 avatar-xs me-2"><div className="avatar-title bg-success-subtle text-success rounded-circle fs-13">' +
            (2 <= o.length
              ? o[0].slice(0, 1) + o[1].slice(0, 1)
              : o[0].slice(0, 1)) +
            "</div></div>") +
          `
                                    </div>
                                    <div className="flex-grow-1 ms-3">
                                        <h6 className="fs-14 mb-1">` +
          t +
          `</h6>
                                        <p className="text-muted mb-0">$` +
          a +
          " - " +
          str_dt(d) +
          `</p>
                                    </div>
                                </a>
                            </div>
                            <div className="collapse border-top border-top-dashed" id="` +
          t +
          `">
                                <div className="card-body">
                                    <h6 className="fs-14 mb-1">` +
          l +
          ` <small className="badge bg-danger-subtle text-danger">4 Days</small></h6>
                                    <p className="text-muted">` +
          c +
          `</p>
                                    <ul className="list-unstyled vstack gap-2 mb-0">
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 avatar-xxs text-muted">
                                                    <i className="ri-question-answer-line"></i>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-0">Meeting with Thomas</h6>
                                                    <small className="text-muted">Yesterday at 9:12AM</small>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 avatar-xxs text-muted">
                                                    <i className="ri-mac-line"></i>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-0">Product Demo</h6>
                                                    <small className="text-muted">Monday at 04:41PM</small>
                                                </div>
                                            </div>
                                        </li>
                                        <li>
                                            <div className="d-flex">
                                                <div className="flex-shrink-0 avatar-xxs text-muted">
                                                    <i className="ri-earth-line"></i>
                                                </div>
                                                <div className="flex-grow-1">
                                                    <h6 className="mb-0">Marketing Team Meeting</h6>
                                                    <small className="text-muted">Monday at 04:41PM</small>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="card-footer hstack gap-2">
                                    <button className="btn btn-warning btn-sm w-100" data-bs-toggle="tooltip" data-bs-placement="top" title="` +
          i +
          `"><i className="ri-phone-line align-bottom me-1"></i> Call</button>
                                    <button className="btn btn-info btn-sm w-100" data-bs-toggle="tooltip" data-bs-placement="top" title="` +
          n +
          `"><i className="ri-question-answer-line align-bottom me-1"></i>
                                        Message</button>
                                </div>
                            </div>
                        </div>`;
      let e;
      switch (s) {
        case "Lead Disovered":
          e = "leadDiscovered";
          break;
        case "Contact Initiated":
          e = "contactInitiated";
          break;
        case "Need Identified":
          e = "needsIdentified";
          break;
        case "Meeting Arranged":
          e = "meetingArranged";
          break;
        case "Offer Accepted":
          e = "offerAccepted";
      }
      document.getElementById("close-modal").click(),
        (document.getElementById(e).innerHTML += o),
        form.reset(),
        Swal.fire({
          title: "Success!",
          text: "Deal Inserted successfully in " + s + " Tab.",
          icon: "success",
          showCancelButton: !0,
          confirmButtonClass: "btn btn-primary w-xs me-2 mt-2",
          cancelButtonClass: "btn btn-danger w-xs mt-2",
          buttonsStyling: !1,
          showCloseButton: !0,
        });
    } else e.preventDefault(), form.classList.add("was-validated");
  }
);
