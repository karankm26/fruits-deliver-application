import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Loader from "../../utils/loader";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  UpdateEvents,
  fetchEventById,
  fetchEvents,
  fetchUsers,
  updateEventStatus,
  updateUser,
} from "../../features/apiSlice";
import Pagination from "../../utils/pagination";
import { Link, useParams } from "react-router-dom";

export default function EventWinningListView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { eventByIdData, eventByIdDataLoading } = useSelector(
    (state) => state.api
  );
  const [groupByCategory, setGroupByCategory] = useState({});

  useEffect(() => {
    dispatch(fetchEventById(id));
  }, [dispatch, id]);
  useEffect(() => {
    if (eventByIdData?.positionsInfo?.length) {
      setGroupByCategory(
        Object.groupBy(eventByIdData?.positionsInfo, (product) => {
          return product.round;
        })
      );
    }
  }, [eventByIdData?.positionsInfo]);

  return (
    <Layout>
      <Loader isLoading={eventByIdDataLoading} />
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Manage Event</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a>Manage Event</a>
                </li>
                <li className="breadcrumb-item active">
                  Event Winning History List
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Event Winning History List</h5>
            </div>
            <div className="card-body table-responsive">
              <div className="mb-3">
                <h5>Event Name : </h5>
                {eventByIdData?.event_name}
              </div>
              {eventByIdData?.positionsInfo?.length
                ? Array.from({ length: eventByIdData.event_round }).map(
                    (_, roundIndex) => (
                      <div>
                        <h5 className="text-center">Round {roundIndex + 1}</h5>
                        <table
                          id="example"
                          className="table table-bordered dt-responsive nowrap table-striped align-middle"
                          style={{ width: "100%" }}
                        >
                          <thead>
                            <tr>
                              <th style={{ width: 60 }}>Sr No.</th>
                              <th>Player Name</th>
                              <th>Place</th>
                            </tr>
                          </thead>
                          <tbody>
                            {groupByCategory[roundIndex + 1]?.map(
                              (item, index) => (
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td>{item?.playerName}</td>
                                  <td>{item?.place}</td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </table>
                      </div>
                    )
                  )
                : ""}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
