import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { withdrawalStatus, withdrawals } from "../../features/apiSlice";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function WithdrawalsView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState({});
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const {
    withdrawalsData: { rows },
    withdrawalsDataLoading,
    withdrawalsDataSuccess,
  } = useSelector((state) => state.api);

  useEffect(() => {
    dispatch(withdrawals());
  }, [dispatch]);

  useEffect(() => {
    if (id && rows) {
      const withdraws = rows.find((item) => item.id === +id);
      setSelected(withdraws);
    }
  }, [id, rows, withdrawals]);

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
        text: "You want to Approve this withdraw!",
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
            withdrawalStatus({
              transactionType: "Withdraw",
              userId: selected?.UserId,
              withdrawalId: selected?.id,
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
        text: "You want to Reject this withdraw!",
        icon: "warning",
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Reject it!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(
            withdrawalStatus({
              transactionType: "Withdraw",
              userId: selected?.UserId,
              withdrawalId: selected?.id,
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
    if (withdrawalsDataSuccess && success) {
      navigate("/withdrawals");
    }
  }, [withdrawalsDataSuccess, success]);
  
  return (
    <Layout>
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Manage Withdrawals</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a>Manage Withdrawals</a>
                </li>
                <li className="breadcrumb-item active">Withdrawals</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Withdrawals</h5>
            </div>
            <div className="card-body table-responsive">
              <div className="mb-3">
                <h5>Account Holder Name : </h5>
                {selected?.Account_Holder_Name}
              </div>{" "}
              <div className="mb-3">
                <h5>Account Number : </h5>
                {selected?.Account_Number}
              </div>
              <div className="mb-3">
                <h5>IFSC Code : </h5>
                {selected?.IFSC_Number}
              </div>
              <div className="mb-3">
                <h5>PanCard No : </h5>
                {selected?.PanCard_No}
              </div>
              <div className="mb-3">
                <h5>Type of Account : </h5>
                {selected?.Type_of_account}
              </div>
              <div className="mb-3">
                <h5>Amount : </h5>
                {selected?.Amount}$
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
