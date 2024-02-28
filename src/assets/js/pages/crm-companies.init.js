var checkAll = document.getElementById("checkAll"),
  perPage =
    (checkAll &&
      (checkAll.onclick = function () {
        for (
          var e = document.querySelectorAll(
              '.form-check-all input[type="checkbox"]'
            ),
            t = document.querySelectorAll(
              '.form-check-all input[type="checkbox"]:checked'
            ).length,
            i = 0;
          i < e.length;
          i++
        )
          (e[i].checked = this.checked),
            e[i].checked
              ? e[i].closest("tr").classList.add("table-active")
              : e[i].closest("tr").classList.remove("table-active");
        document.getElementById("remove-actions").style.display =
          0 < t ? "none" : "block";
      }),
    8),
  editlist = !1,
  options = {
    valueNames: [
      "id",
      "name",
      "owner",
      "industry_type",
      "star_value",
      "location",
      "employee",
      "website",
      "contact_email",
      "since",
      { attr: "src", name: "image_src" },
    ],
    page: perPage,
    pagination: !0,
    plugins: [ListPagination({ left: 2, right: 2 })],
  },
  companyList = new List("companyList", options).on("updated", function (e) {
    0 == e.matchingItems.length
      ? (document.getElementsByClassName("noresult")[0].style.display = "block")
      : (document.getElementsByClassName("noresult")[0].style.display = "none");
    var t = 1 == e.i,
      i = e.i > e.matchingItems.length - e.page;
    document.querySelector(".pagination-prev.disabled") &&
      document
        .querySelector(".pagination-prev.disabled")
        .classList.remove("disabled"),
      document.querySelector(".pagination-next.disabled") &&
        document
          .querySelector(".pagination-next.disabled")
          .classList.remove("disabled"),
      t && document.querySelector(".pagination-prev").classList.add("disabled"),
      i && document.querySelector(".pagination-next").classList.add("disabled"),
      e.matchingItems.length <= perPage
        ? (document.querySelector(".pagination-wrap").style.display = "none")
        : (document.querySelector(".pagination-wrap").style.display = "flex"),
      0 < e.matchingItems.length
        ? (document.getElementsByClassName("noresult")[0].style.display =
            "none")
        : (document.getElementsByClassName("noresult")[0].style.display =
            "block");
  });
const xhttp = new XMLHttpRequest();
(xhttp.onload = function () {
  var e = JSON.parse(this.responseText);
  Array.from(e).forEach(function (e) {
    companyList.add({
      id:
        '<a href="javascript:void(0);" className="fw-medium link-primary">#VZ' +
        e.id +
        "</a>",
      name: e.name,
      owner: e.owner,
      desc: e.desc,
      industry_type: e.industry_type,
      star_value: e.star_value,
      location: e.location,
      employee: e.employee,
      website: e.website,
      contact_email: e.contact_email,
      since: e.since,
      image_src: e.image_src,
    }),
      companyList.sort("id", { order: "desc" }),
      refreshCallbacks();
  }),
    companyList.remove(
      "id",
      '<a href="javascript:void(0);" className="fw-medium link-primary">#VZ001</a>'
    );
}),
  xhttp.open("GET", "assets/json/company-list.json"),
  xhttp.send(),
  (isCount = new DOMParser().parseFromString(
    companyList.items.slice(-1)[0]._values.id,
    "text/html"
  )),
  document
    .querySelector("#company-logo-input")
    .addEventListener("change", function () {
      var e = document.querySelector("#companylogo-img"),
        t = document.querySelector("#company-logo-input").files[0],
        i = new FileReader();
      i.addEventListener(
        "load",
        function () {
          e.src = i.result;
        },
        !1
      ),
        t && i.readAsDataURL(t);
    });
var isValue = isCount.body.firstElementChild.innerHTML,
  idField = document.getElementById("id-field"),
  companyNameField = document.getElementById("companyname-field"),
  companyLogoImg = document.getElementById("companylogo-img"),
  ownerField = document.getElementById("owner-field"),
  industry_typeField = document.getElementById("industry_type-field"),
  star_valueField = document.getElementById("star_value-field"),
  locationField = document.getElementById("location-field"),
  employeeField = document.getElementById("employee-field"),
  websiteField = document.getElementById("website-field"),
  contact_emailField = document.getElementById("contact_email-field"),
  sinceField = document.getElementById("since-field"),
  addBtn = document.getElementById("add-btn"),
  editBtn = document.getElementById("edit-btn"),
  removeBtns = document.getElementsByClassName("remove-item-btn"),
  editBtns = document.getElementsByClassName("edit-item-btn"),
  table =
    ((viewBtns = document.getElementsByClassName("view-item-btn")),
    refreshCallbacks(),
    document
      .getElementById("showModal")
      .addEventListener("show.bs.modal", function (e) {
        e.relatedTarget.classList.contains("edit-item-btn")
          ? ((document.getElementById("exampleModalLabel").innerHTML =
              "Edit Company"),
            (document
              .getElementById("showModal")
              .querySelector(".modal-footer").style.display = "block"),
            (document.getElementById("add-btn").innerHTML = "Update"))
          : e.relatedTarget.classList.contains("add-btn")
          ? ((document.getElementById("exampleModalLabel").innerHTML =
              "Add Company"),
            (document
              .getElementById("showModal")
              .querySelector(".modal-footer").style.display = "block"),
            (document.getElementById("add-btn").innerHTML = "Add Company"))
          : ((document.getElementById("exampleModalLabel").innerHTML =
              "List Company"),
            (document
              .getElementById("showModal")
              .querySelector(".modal-footer").style.display = "none"));
      }),
    ischeckboxcheck(),
    document
      .getElementById("showModal")
      .addEventListener("hidden.bs.modal", function () {
        clearFields();
      }),
    document
      .querySelector("#companyList")
      .addEventListener("click", function () {
        ischeckboxcheck();
      }),
    document.getElementById("customerTable")),
  tr = table.getElementsByTagName("tr"),
  trlist = table.querySelectorAll(".list tr"),
  count = 11,
  forms = document.querySelectorAll(".tablelist-form");
function ischeckboxcheck() {
  Array.from(document.getElementsByName("chk_child")).forEach(function (i) {
    i.addEventListener("change", function (e) {
      1 == i.checked
        ? e.target.closest("tr").classList.add("table-active")
        : e.target.closest("tr").classList.remove("table-active");
      var t = document.querySelectorAll('[name="chk_child"]:checked').length;
      e.target.closest("tr").classList.contains("table-active"),
        (document.getElementById("remove-actions").style.display =
          0 < t ? "block" : "none");
    });
  });
}
function refreshCallbacks() {
  removeBtns &&
    Array.from(removeBtns).forEach(function (e) {
      e.addEventListener("click", function (e) {
        e.target.closest("tr").children[1].innerText,
          (itemId = e.target.closest("tr").children[1].innerText);
        e = companyList.get({ id: itemId });
        Array.from(e).forEach(function (e) {
          var t = (deleteid = new DOMParser().parseFromString(
            e._values.id,
            "text/html"
          )).body.firstElementChild;
          deleteid.body.firstElementChild.innerHTML == itemId &&
            document
              .getElementById("delete-record")
              .addEventListener("click", function () {
                companyList.remove("id", t.outerHTML),
                  document.getElementById("deleteRecord-close").click();
              });
        });
      });
    }),
    editBtns &&
      Array.from(editBtns).forEach(function (e) {
        e.addEventListener("click", function (e) {
          e.target.closest("tr").children[1].innerText,
            (itemId = e.target.closest("tr").children[1].innerText);
          e = companyList.get({ id: itemId });
          Array.from(e).forEach(function (e) {
            var t = (isid = new DOMParser().parseFromString(
              e._values.id,
              "text/html"
            )).body.firstElementChild.innerHTML;
            t == itemId &&
              ((editlist = !0),
              (idField.value = t),
              (companyLogoImg.src = e._values.image_src),
              (companyNameField.value = e._values.name),
              (ownerField.value = e._values.owner),
              (industry_typeField.value = e._values.industry_type),
              (star_valueField.value = e._values.star_value),
              (locationField.value = e._values.location),
              (employeeField.value = e._values.employee),
              (websiteField.value = e._values.website),
              (contact_emailField.value = e._values.contact_email),
              (sinceField.value = e._values.since));
          });
        });
      }),
    Array.from(viewBtns).forEach(function (e) {
      e.addEventListener("click", function (e) {
        e.target.closest("tr").children[1].innerText,
          (itemId = e.target.closest("tr").children[1].innerText);
        e = companyList.get({ id: itemId });
        Array.from(e).forEach(function (e) {
          (isid = new DOMParser().parseFromString(e._values.id, "text/html"))
            .body.firstElementChild.innerHTML == itemId &&
            ((e = `
                        <div className="card-body text-center">
                            <div className="position-relative d-inline-block">
                                <div className="avatar-md">
                                    <div className="avatar-title bg-light rounded-circle">
                                        <img src="${e._values.image_src}" alt="" className="avatar-sm rounded-circle object-fit-cover">
                                    </div>
                                </div>
                            </div>
                            <h5 className="mt-3 mb-1">${e._values.name}</h5>
                            <p className="text-muted">${e._values.owner}</p>

                            <ul className="list-inline mb-0">
                                <li className="list-inline-item avatar-xs">
                                    <a href="javascript:void(0);"
                                        className="avatar-title bg-success-subtle text-success fs-15 rounded">
                                        <i className="ri-global-line"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item avatar-xs">
                                    <a href="javascript:void(0);"
                                        className="avatar-title bg-danger-subtle text-danger fs-15 rounded">
                                        <i className="ri-mail-line"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item avatar-xs">
                                    <a href="javascript:void(0);"
                                        className="avatar-title bg-warning-subtle text-warning fs-15 rounded">
                                        <i className="ri-question-answer-line"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body">
                            <h6 className="text-muted text-uppercase fw-semibold mb-3">Information</h6>
                            <p className="text-muted mb-4">${e._values.desc}</p>
                            <div className="table-responsive table-card">
                                <table className="table table-borderless mb-0">
                                    <tbody>
                                        <tr>
                                            <td className="fw-medium" scope="row">Industry Type</td>
                                            <td>${e._values.industry_type}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium" scope="row">Location</td>
                                            <td>${e._values.location}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium" scope="row">Employee</td>
                                            <td>${e._values.employee}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium" scope="row">Rating</td>
                                            <td>${e._values.star_value} <i className="ri-star-fill text-warning align-bottom"></i></td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium" scope="row">Website</td>
                                            <td>
                                                <a href="javascript:void(0);"
                                                    className="link-primary text-decoration-underline">${e._values.website}</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium" scope="row">Contact Email</td>
                                            <td>${e._values.contact_email}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-medium" scope="row">Since</td>
                                            <td>${e._values.since}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    `),
            (document.getElementById("company-view-detail").innerHTML = e));
        });
      });
    });
}
function clearFields() {
  (companyLogoImg.src = "assets/images/users/multi-user.jpg"),
    (companyNameField.value = ""),
    (ownerField.value = ""),
    (industry_typeField.value = ""),
    (star_valueField.value = ""),
    (locationField.value = ""),
    (employeeField.value = ""),
    (websiteField.value = ""),
    (contact_emailField.value = ""),
    (sinceField.value = "");
}
function deleteMultiple() {
  ids_array = [];
  var e,
    t = document.getElementsByName("chk_child");
  for (i = 0; i < t.length; i++)
    1 == t[i].checked &&
      ((e =
        t[i].parentNode.parentNode.parentNode.querySelector("td a").innerHTML),
      ids_array.push(e));
  "undefined" != typeof ids_array && 0 < ids_array.length
    ? Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: !0,
        confirmButtonClass: "btn btn-primary w-xs me-2 mt-2",
        cancelButtonClass: "btn btn-danger w-xs mt-2",
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: !1,
        showCloseButton: !0,
      }).then(function (e) {
        if (e.value) {
          for (i = 0; i < ids_array.length; i++)
            companyList.remove(
              "id",
              `<a href="javascript:void(0);" className="fw-medium link-primary">${ids_array[i]}</a>`
            );
          (document.getElementById("remove-actions").style.display = "none"),
            (document.getElementById("checkAll").checked = !1),
            Swal.fire({
              title: "Deleted!",
              text: "Your data has been deleted.",
              icon: "success",
              confirmButtonClass: "btn btn-info w-xs mt-2",
              buttonsStyling: !1,
            });
        }
      })
    : Swal.fire({
        title: "Please select at least one checkbox",
        confirmButtonClass: "btn btn-info",
        buttonsStyling: !1,
        showCloseButton: !0,
      });
}
Array.prototype.slice.call(forms).forEach(function (i) {
  i.addEventListener(
    "submit",
    function (e) {
      var t;
      i.checkValidity()
        ? (e.preventDefault(),
          "" === companyNameField.value ||
          "" === ownerField.value ||
          "" === industry_typeField.value ||
          "" === star_valueField.value ||
          "" === locationField.value ||
          "" === employeeField.value ||
          "" === websiteField.value ||
          "" === contact_emailField.value ||
          "" === sinceField.value ||
          editlist
            ? "" !== companyNameField.value &&
              "" !== ownerField.value &&
              "" !== industry_typeField.value &&
              "" !== star_valueField.value &&
              "" !== locationField.value &&
              "" !== employeeField.value &&
              "" !== websiteField.value &&
              "" !== contact_emailField.value &&
              "" !== sinceField.value &&
              editlist &&
              ((t = companyList.get({ id: idField.value })),
              Array.from(t).forEach(function (e) {
                (isid = new DOMParser().parseFromString(
                  e._values.id,
                  "text/html"
                )).body.firstElementChild.innerHTML == itemId &&
                  e.values({
                    id: `<a href="javascript:void(0);" className="fw-medium link-primary">${idField.value}</a>`,
                    image_src: companyLogoImg.src,
                    name: companyNameField.value,
                    owner: ownerField.value,
                    industry_type: industry_typeField.value,
                    star_value: star_valueField.value,
                    location: locationField.value,
                    employee: employeeField.value,
                    website: websiteField.value,
                    contact_email: contact_emailField.value,
                    since: sinceField.value,
                  });
              }),
              document.getElementById("close-modal").click(),
              clearFields(),
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Company updated Successfully!",
                showConfirmButton: !1,
                timer: 2e3,
                showCloseButton: !0,
              }))
            : (companyList.add({
                id:
                  '<a href="javascript:void(0);" className="fw-medium link-primary">#VZ' +
                  count +
                  "</a>",
                image_src: companyLogoImg.src,
                name: companyNameField.value,
                owner: ownerField.value,
                industry_type: industry_typeField.value,
                star_value: star_valueField.value,
                location: locationField.value,
                employee: employeeField.value,
                website: websiteField.value,
                contact_email: contact_emailField.value,
                since: sinceField.value,
              }),
              companyList.sort("id", { order: "desc" }),
              document.getElementById("close-modal").click(),
              clearFields(),
              refreshCallbacks(),
              count++,
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Company inserted successfully!",
                showConfirmButton: !1,
                timer: 2e3,
                showCloseButton: !0,
              })))
        : (e.preventDefault(), e.stopPropagation());
    },
    !1
  );
}),
  document
    .querySelector(".pagination-next")
    .addEventListener("click", function () {
      document.querySelector(".pagination.listjs-pagination") &&
        document
          .querySelector(".pagination.listjs-pagination")
          .querySelector(".active") &&
        document
          .querySelector(".pagination.listjs-pagination")
          .querySelector(".active")
          .nextElementSibling.children[0].click();
    }),
  document
    .querySelector(".pagination-prev")
    .addEventListener("click", function () {
      document.querySelector(".pagination.listjs-pagination") &&
        document
          .querySelector(".pagination.listjs-pagination")
          .querySelector(".active") &&
        document
          .querySelector(".pagination.listjs-pagination")
          .querySelector(".active")
          .previousSibling.children[0].click();
    });
