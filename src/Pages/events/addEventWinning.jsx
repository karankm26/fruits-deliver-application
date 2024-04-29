import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Loader from "../../utils/loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents, setEventWinning } from "../../features/apiSlice";
import { useNavigate } from "react-router-dom";
import { getOrdinal } from "../../utils/getOrdinal";

export default function AddEventWinning() {
  const navigate = useNavigate();
  const [rounds, setRounds] = useState([]);
  const [selectEvent, setSelectEvent] = useState("");
  const [players, setPlayers] = useState([]);
  const [winningA, setWinnigA] = useState({});
  const [currentEvent, setCurrentEvent] = useState([{}]);
  const dispatch = useDispatch();
  const {
    setEventWinningDataSuccess,
    setEventWinningDataLoading,
    eventsData: { events },
  } = useSelector((state) => state.api);
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    dispatch(setEventWinning({ id: currentEvent?.id, body: winningA }));
    setSuccess(true);
  };

  useEffect(() => {
    dispatch(fetchEvents({ search: "", limit: 10, currentPage: 1 }));
  }, [dispatch]);

  useEffect(() => {
    if (success && setEventWinningDataSuccess) {
      navigate("/event-winnings-list");
    }
  }, [success, setEventWinningDataSuccess]);

  useEffect(() => {
    if (events && selectEvent) {
      const findEvent = events.find((event) => event.id === +selectEvent);
      setRounds(findEvent.payoutDetails);
      setPlayers(findEvent.players_details);
      setCurrentEvent(findEvent);
    } else {
      setRounds([]);
    }
  }, [events, selectEvent]);

  const handleChange = (value, roundIndex, payoutIndex) => {
    const newWinningA = { ...winningA };
    const newIndex = roundIndex + 1;
    if (!newWinningA[newIndex]) {
      newWinningA[newIndex] = [];
    }
    newWinningA[newIndex][payoutIndex] = value;
    setWinnigA(newWinningA);
  };

  console.log(Object.values(winningA));

  return (
    <Layout>
      <Loader isLoading={setEventWinningDataLoading} />
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Manage Events</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a>Manage Events</a>
                </li>
                <li className="breadcrumb-item active">Add Event</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <form className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div>
                <h5 className="card-title">Event Name</h5>
                <select
                  className="form-select"
                  onChange={(e) => setSelectEvent(e.target.value)}
                >
                  <option value={""} selected>
                    Select Event
                  </option>
                  {events?.length ? (
                    events.map((item) => (
                      <option value={item.id}>{item.event_name}</option>
                    ))
                  ) : (
                    <option disabled>No Events Found</option>
                  )}
                </select>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              {rounds.length ? (
                rounds.map((round, roundIndex) => (
                  <>
                    {roundIndex !== 0 && (
                      <div className="card-header p-0 mt-3" />
                    )}
                    <h5 className="card-title  mt-4">
                      Round {roundIndex + 1} Result
                    </h5>
                    <div className="row gy-3 mt-2">
                      <div className=" col-lg-12">
                        <table
                          id="example"
                          className="table table-bordered dt-responsive nowrap table-striped align-middle"
                          style={{ width: "100%" }}
                        >
                          <thead>
                            <tr>
                              <th style={{ width: 60 }} className="text-center">
                                Position
                              </th>
                              <th className="text-center">Player Name</th>
                            </tr>
                          </thead>
                          <tbody>
                            {round.length &&
                              round.map((_, payoutIndex) => (
                                <tr key={payoutIndex}>
                                  <td className="text-center">
                                    {getOrdinal(payoutIndex + 1)}
                                  </td>

                                  <td>
                                    <select
                                      className="form-select form-select-sm"
                                      onChange={(e) => {
                                        handleChange(
                                          +e.target.value,
                                          roundIndex,
                                          payoutIndex
                                        );
                                      }}
                                    >
                                      <option selected disabled value={""}>
                                        Select Player
                                      </option>

                                      {players.map((item) => (
                                        <option
                                          key={item.id}
                                          value={item.id}
                                          hidden={winningA?.[
                                            roundIndex + 1
                                          ]?.some((a) => a === item.id)}
                                        >
                                          {item.name}
                                        </option>
                                      ))}
                                    </select>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                ))
              ) : (
                <>
                  Select Event Round First<span className="text-danger">*</span>
                </>
              )}{" "}
              {rounds.length ? (
                <div className="row gy-4  pt-3 text-end">
                  <div className="col-12">
                    <button
                      className="btn btn-sm btn-primary"
                      type="button"
                      onClick={handleSubmit}
                    >
                      Submit form
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
