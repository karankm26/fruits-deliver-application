var checkAll = document.getElementById("checkAll"),
  isChoiceEl =
    (checkAll &&
      (checkAll.onclick = function () {
        for (
          var e = document.querySelectorAll(
              '.form-check-all input[type="checkbox"]'
            ),
            t = document.querySelectorAll(
              '.form-check-all input[type="checkbox"]:checked'
            ).length,
            a = 0;
          a < e.length;
          a++
        )
          (e[a].checked = this.checked),
            e[a].checked
              ? e[a].closest("tr").classList.add("table-active")
              : e[a].closest("tr").classList.remove("table-active");
        document.getElementById("remove-actions").style.display =
          0 < t ? "none" : "block";
      }),
    document.getElementById("idStatus")),
  choices = new Choices(isChoiceEl, { searchEnabled: !1 }),
  isTypeEl = document.getElementById("idType"),
  choices = new Choices(isTypeEl, { searchEnabled: !1 }),
  perPage = 8,
  editlist = !1,
  options = {
    valueNames: [
      "id",
      "company",
      "designation",
      "date",
      "contacts",
      "type",
      "status",
    ],
    page: perPage,
    pagination: !0,
    plugins: [ListPagination({ left: 2, right: 2 })],
  },
  applicationList = new List("applicationList", options).on(
    "updated",
    function (e) {
      0 == e.matchingItems.length
        ? (document.getElementsByClassName("noresult")[0].style.display =
            "block")
        : (document.getElementsByClassName("noresult")[0].style.display =
            "none");
      var t = 1 == e.i,
        a = e.i > e.matchingItems.length - e.page;
      document.querySelector(".pagination-prev.disabled") &&
        document
          .querySelector(".pagination-prev.disabled")
          .classList.remove("disabled"),
        document.querySelector(".pagination-next.disabled") &&
          document
            .querySelector(".pagination-next.disabled")
            .classList.remove("disabled"),
        t &&
          document.querySelector(".pagination-prev").classList.add("disabled"),
        a &&
          document.querySelector(".pagination-next").classList.add("disabled"),
        e.matchingItems.length <= perPage
          ? (document.querySelector(".pagination-wrap").style.display = "none")
          : (document.querySelector(".pagination-wrap").style.display = "flex"),
        e.matchingItems.length == perPage &&
          document
            .querySelector(".pagination.listjs-pagination")
            .firstElementChild.children[0].click(),
        0 < e.matchingItems.length
          ? (document.getElementsByClassName("noresult")[0].style.display =
              "none")
          : (document.getElementsByClassName("noresult")[0].style.display =
              "block");
    }
  );
const xhttp = new XMLHttpRequest();
function isStatus(e) {
  switch (e) {
    case "Approved":
      return (
        '<span className="badge bg-success-subtle text-success text-uppercase">' +
        e +
        "</span>"
      );
    case "New":
      return (
        '<span className="badge bg-info-subtle text-info text-uppercase">' +
        e +
        "</span>"
      );
    case "Pending":
      return (
        '<span className="badge bg-warning-subtle text-warning text-uppercase">' +
        e +
        "</span>"
      );
    case "Rejected":
      return (
        '<span className="badge bg-danger-subtle text-danger text-uppercase">' +
        e +
        "</span>"
      );
  }
}
(xhttp.onload = function () {
  var e = JSON.parse(this.responseText);
  Array.from(e).forEach(function (e) {
    applicationList.add({
      id: '<a href="#" className="fw-medium link-primary">#VZ' + e.id + "</a>",
      company:
        '<div className="d-flex align-items-center">            <div className="flex-shrink-0">                <img src="' +
        e.company[0] +
        '" alt="" className="avatar-xxs rounded-circle image_src object-fit-cover">            </div>            <div className="flex-grow-1 ms-2 name">' +
        e.company[1] +
        "</div>        </div>",
      designation: e.designation,
      date: e.date,
      contacts: e.contacts,
      type: e.type,
      status: isStatus(e.status),
    }),
      applicationList.sort("id", { order: "desc" }),
      refreshCallbacks();
  }),
    applicationList.remove(
      "id",
      '<a href="#" className="fw-medium link-primary">#VZ001</a>'
    );
}),
  xhttp.open("GET", "assets/json/application-list.json"),
  xhttp.send(),
  document
    .querySelector("#companylogo-image-input")
    .addEventListener("change", function () {
      var e = document.querySelector("#companylogo-img"),
        t = document.querySelector("#companylogo-image-input").files[0],
        a = new FileReader();
      a.addEventListener(
        "load",
        function () {
          e.src = a.result;
        },
        !1
      ),
        t && a.readAsDataURL(t);
    });
var idField = document.getElementById("applicationId"),
  companyLogoImg = document.getElementById("companylogo-img"),
  companyField = document.getElementById("company-field"),
  designationField = document.getElementById("designation-field"),
  dateField = document.getElementById("date-field"),
  contactField = document.getElementById("contact-field"),
  statusField = document.getElementById("status-input"),
  typeField = document.getElementById("type-input"),
  addBtn = document.getElementById("add-btn"),
  editBtn = document.getElementById("edit-btn"),
  removeBtns = document.getElementsByClassName("remove-item-btn"),
  editBtns = document.getElementsByClassName("edit-item-btn"),
  tabEl =
    (refreshCallbacks(), document.querySelectorAll('a[data-bs-toggle="tab"]'));
function filterOrder(e) {
  var t = e;
  applicationList.filter(function (e) {
    e = (matchData = new DOMParser().parseFromString(
      e.values().status,
      "text/html"
    )).body.firstElementChild.innerHTML;
    return "All" == e || "All" == t || e == t;
  }),
    applicationList.update();
}
Array.from(tabEl).forEach(function (e) {
  e.addEventListener("shown.bs.tab", function (e) {
    filterOrder(e.target.id);
  });
});
var example = new Choices(typeField, { searchEnabled: !1 }),
  statusVal = new Choices(statusField, { searchEnabled: !1 }),
  table =
    (document
      .getElementById("showModal")
      .addEventListener("show.bs.modal", function (e) {
        e.relatedTarget.classList.contains("edit-item-btn")
          ? ((document.getElementById("exampleModalLabel").innerHTML =
              "Edit Application"),
            (document
              .getElementById("showModal")
              .querySelector(".modal-footer").style.display = "block"),
            (document.getElementById("add-btn").innerHTML = "Update"))
          : e.relatedTarget.classList.contains("add-btn")
          ? ((document.getElementById("exampleModalLabel").innerHTML =
              "Add Application"),
            (document
              .getElementById("showModal")
              .querySelector(".modal-footer").style.display = "block"),
            (document.getElementById("add-btn").innerHTML = "Add Application"))
          : ((document.getElementById("exampleModalLabel").innerHTML =
              "List Application"),
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
      .querySelector("#applicationList")
      .addEventListener("click", function () {
        refreshCallbacks(), ischeckboxcheck();
      }),
    document.getElementById("jobListTable")),
  tr = table.getElementsByTagName("tr"),
  trlist = table.querySelectorAll(".list tr");
function filterData() {
  var l = document.getElementById("idStatus").value,
    s = document.getElementById("idType").value,
    o = document.getElementById("demo-datepicker").value,
    c = o.split(" to ")[0],
    d = o.split(" to ")[1];
  applicationList.filter(function (e) {
    var t = (matchData = new DOMParser().parseFromString(
        e.values().status,
        "text/html"
      )).body.firstElementChild.innerHTML,
      a = !1,
      n = !1,
      i = !1,
      a = "all" == t || "all" == l || t == l,
      n = "all" == e.values().type || "all" == s || e.values().type == s,
      i =
        new Date(e.values().date.slice(0, 12)) >= new Date(c) &&
        new Date(e.values().date.slice(0, 12)) <= new Date(d);
    return (
      (a && n && i) ||
      (a && n && "" == o ? a && n : n && i && "" == o ? n && i : void 0)
    );
  }),
    applicationList.update();
}
var count = 13,
  forms = document.querySelectorAll(".tablelist-form");
function ischeckboxcheck() {
  Array.from(document.getElementsByName("checkAll")).forEach(function (a) {
    a.addEventListener("change", function (e) {
      1 == a.checked
        ? e.target.closest("tr").classList.add("table-active")
        : e.target.closest("tr").classList.remove("table-active");
      var t = document.querySelectorAll('[name="checkAll"]:checked').length;
      e.target.closest("tr").classList.contains("table-active"),
        (document.getElementById("remove-actions").style.display =
          0 < t ? "block" : "none");
    });
  });
}
function refreshCallbacks() {
  Array.from(removeBtns).forEach(function (e) {
    e.addEventListener("click", function (e) {
      e.target.closest("tr").children[1].innerText,
        (itemId = e.target.closest("tr").children[1].innerText);
      e = applicationList.get({ id: itemId });
      Array.from(e).forEach(function (e) {
        var t = (deleteid = new DOMParser().parseFromString(
          e._values.id,
          "text/html"
        )).body.firstElementChild;
        deleteid.body.firstElementChild.innerHTML == itemId &&
          document
            .getElementById("delete-record")
            .addEventListener("click", function () {
              applicationList.remove("id", t.outerHTML),
                document.getElementById("deleteRecord-close").click();
            });
      });
    });
  }),
    Array.from(editBtns).forEach(function (e) {
      e.addEventListener("click", function (e) {
        e.target.closest("tr").children[1].innerText,
          (itemId = e.target.closest("tr").children[1].innerText);
        e = applicationList.get({ id: itemId });
        Array.from(e).forEach(function (e) {
          var t = (isid = new DOMParser().parseFromString(
            e._values.id,
            "text/html"
          )).body.firstElementChild.innerHTML;
          t == itemId &&
            ((editlist = !0),
            (idField.value = t),
            (t = new DOMParser()
              .parseFromString(e._values.company, "text/html")
              .body.querySelector(".name").innerHTML),
            (companyField.value = t),
            (companyLogoImg.src = new DOMParser()
              .parseFromString(e._values.company, "text/html")
              .body.querySelector(".image_src").src),
            (designationField.value = e._values.designation),
            (dateField.value = e._values.date),
            (contactField.value = e._values.contacts),
            statusVal && statusVal.destroy(),
            (statusVal = new Choices(statusField, { searchEnabled: !1 })),
            (t = (val = new DOMParser().parseFromString(
              e._values.status,
              "text/html"
            )).body.firstElementChild.innerHTML),
            statusVal.setChoiceByValue(t),
            example && example.destroy(),
            (example = new Choices(typeField, { searchEnabled: !1 })),
            (t = e._values.type),
            example.setChoiceByValue(t),
            flatpickr("#date-field", {
              enableTime: !1,
              dateFormat: "d M, Y",
              defaultDate: e._values.date,
            }));
        });
      });
    });
}
function clearFields() {
  (companyField.value = ""),
    (companyLogoImg.src = ""),
    (designationField.value = ""),
    (dateField.value = ""),
    (contactField.value = ""),
    example && example.destroy(),
    (example = new Choices(typeField)),
    statusVal && statusVal.destroy(),
    (statusVal = new Choices(statusField));
}
function deleteMultiple() {
  ids_array = [];
  var e,
    t = document.querySelectorAll(".form-check [value=option1]");
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
            applicationList.remove(
              "id",
              '<a href="#" className="fw-medium link-primary">' +
                ids_array[i] +
                "</a>"
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
Array.prototype.slice.call(forms).forEach(function (a) {
  a.addEventListener(
    "submit",
    function (e) {
      var t;
      a.checkValidity()
        ? (e.preventDefault(),
          "" === companyField.value ||
          "" === designationField.value ||
          "" === dateField.value ||
          "" === contactField.value ||
          "" === statusField.value ||
          "" === typeField.value ||
          editlist
            ? "" !== companyField.value &&
              "" !== designationField.value &&
              "" !== dateField.value &&
              "" !== contactField.value &&
              "" !== statusField.value &&
              "" !== typeField.value &&
              editlist &&
              ((t = applicationList.get({ id: idField.value })),
              Array.from(t).forEach(function (e) {
                (isid = new DOMParser().parseFromString(
                  e._values.id,
                  "text/html"
                )).body.firstElementChild.innerHTML == itemId &&
                  e.values({
                    id:
                      '<a href="javascript:void(0);" className="fw-medium link-primary">' +
                      idField.value +
                      "</a>",
                    company:
                      '<div className="d-flex align-items-center">                            <div className="flex-shrink-0">                                <img src="' +
                      companyLogoImg.src +
                      '" alt="" className="avatar-xxs rounded-circle image_src object-fit-cover">                            </div>                            <div className="flex-grow-1 ms-2 name">' +
                      companyField.value +
                      "</div>                        </div>",
                    designation: designationField.value,
                    date: dateField.value,
                    contacts: contactField.value,
                    type: typeField.value,
                    status: isStatus(statusField.value),
                  }),
                  document.getElementById("close-modal").click();
              }),
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Application updated Successfully!",
                showConfirmButton: !1,
                timer: 2e3,
                showCloseButton: !0,
              }))
            : (applicationList.add({
                id:
                  '<a href="#" className="fw-medium link-primary">#VZ' +
                  count +
                  "</a>",
                company:
                  '<div className="d-flex align-items-center">                    <div className="flex-shrink-0">                        <img src="' +
                  companyLogoImg.src +
                  '" alt="" className="avatar-xxs rounded-circle image_src object-fit-cover">                    </div>                    <div className="flex-grow-1 ms-2 name">' +
                  companyField.value +
                  "</div>                </div>",
                designation: designationField.value,
                date: dateField.value,
                contacts: contactField.value,
                type: typeField.value,
                status: isStatus(statusField.value),
              }),
              applicationList.sort("id", { order: "desc" }),
              document.getElementById("close-modal").click(),
              clearFields(),
              refreshCallbacks(),
              filterOrder("All"),
              count++,
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Application inserted successfully!",
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
