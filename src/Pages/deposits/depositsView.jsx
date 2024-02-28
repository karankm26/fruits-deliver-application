import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { allDeposits, depositStatus } from "../../features/apiSlice";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function DepositsView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState({});
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const {
    allDepositsData: { rows },
    allDepositsDataLoading,
    allDepositsDataSuccess,
  } = useSelector((state) => state.api);

  useEffect(() => {
    dispatch(allDeposits());
  }, [dispatch]);

  useEffect(() => {
    if (id && rows) {
      const deposits = rows.find((item) => item.id === +id);
      setSelected(deposits);
    }
  }, [id, rows]);

  console.log(selected);

  const handleSubmit = (item) => {
    const body = {
      transactionType: "Withdraw",
      userId: selected?.UserId,
      withdrawalId: selected?.id,
      amount: selected?.amount,
    };
    if (item) {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to Approve this Deposit!",
        icon: "warning",
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Approve it!",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log(body);
          dispatch(
            depositStatus({
              transactionType: "Deposit",
              userId: selected?.UserId,
              depositId: selected?.id,
              amount: selected?.Amount,
              status: 1,
            })
          );
          setSuccess(true);
        }
      });
    } else {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to Reject this Deposit!",
        icon: "warning",
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Reject it!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(
            depositStatus({
              transactionType: "Withdraw",
              userId: selected?.UserId,
              depositId: selected?.id,
              amount: selected?.Amount,
              status: 2,
            })
          );
          setSuccess(true);
        }
      });
    }
  };

  useEffect(() => {
    if (allDepositsDataSuccess && success) {
      navigate("/deposits");
    }
  }, [allDepositsDataSuccess, success]);
  return (
    <Layout>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Manage Deposits</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a>Manage Deposits</a>
                </li>
                <li className="breadcrumb-item active">Deposits</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Deposits</h5>
            </div>
            <div className="card-body table-responsive">
              <div className="mb-3">
                <h5>Name : </h5>
                {selected?.User?.fname} {selected?.User?.lname}
              </div>{" "}
              <div className="mb-3">
                <h5>Email : </h5>
                {selected?.User?.email}
              </div>{" "}
              <div className="mb-3">
                <h5>Amount : </h5>$ {(+selected?.Amount)?.toLocaleString()}
              </div>
              <div className="mb-3">
                <h5>Payment Method : </h5>
                {selected?.paymentMethod}
              </div>
              <div className="mb-3">
                <h5>Zelle Account Name : </h5>
                {selected?.zelleAccountFirstName}{" "}
                {selected?.zelleAccountLastName}
              </div>
              <div className="mb-3">
                <h5>Transaction ID : </h5>
                <span
                  className={`${
                    selected?.status === 1
                      ? ``
                      : selected?.status === 2
                      ? `badge bg-danger-subtle text-danger`
                      : `badge bg-primary-subtle text-primary`
                  }`}
                >
                  {selected?.status
                    ? selected?.status === 2
                      ? "Deposit Rejected"
                      : selected?.status === 0
                      ? "Deposit Pending"
                      : selected?.tansactionId
                    : "Deposit Pending"}
                </span>
              </div>
              <div className="mb-3">
                <h5>Status : </h5>
                <span
                  className={`badge ${
                    selected?.status === 1
                      ? `bg-success-subtle text-success`
                      : selected?.status === 2
                      ? `bg-danger-subtle text-danger`
                      : `bg-primary-subtle text-primary`
                  }`}
                >
                  {selected?.status === 0
                    ? "Pending"
                    : selected?.status === 1
                    ? "Approved"
                    : "Rejected"}
                </span>
              </div>
              <div
                className="mb-3"
                hidden={selected?.status !== 0 ? true : false}
              >
                <h5>Action : </h5>
                <button
                  className={`btn btn-sm btn-soft-success me-2`}
                  onClick={() => handleSubmit(true)}
                >
                  Approve
                </button>
                <button
                  className={`btn btn-sm btn-soft-danger`}
                  onClick={() => handleSubmit(false)}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
