import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Loader from "../../utils/loader";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Context from "../../components/Context";
import { CreateEvents, fetchEvents } from "../../features/apiSlice";
import { useFormik } from "formik";
import { eventSchema } from "../../schema/eventFormSchema";
import { useNavigate } from "react-router-dom";
import { getOrdinal } from "../../utils/getOrdinal";
import { snack } from "../../utils/snack";

const emptyData = {
  event_name: "",
  event_slogan: "",
  font_color: "#000000",
  event_date: null,
  start_time: null,
  time_zone: "",
  location: "",
  sponsor: "",
  event_genre: "",
  event_type: "",
  event_round: 4,
  event_ticket: "",
  ticket_url: "",
  number_of_players: "",
  share_of_prize: "",
  prize_pool_additional: { value: "", Direct: "", per_match: "" },
  bounty_options: {
    percent_of_stake: "",
    sponsor_added: "",
    pko_split: "",
  },
  bounty_options_values: {
    percent_of_stake_value: false,
    sponsor_added_value: false,
    pko_split_value: false,
  },
  places_paid: "",
  event_headline: "",
  bounty_detail: "",
  event_details: "",
  image: "",
  image1: "",
  image2: "",
  payoutDetails: [],
  playerDetails: [
    {
      name: "",
      bio: "",
      twitch_link: "",
      image_path: "",
    },
  ],
};

export default function AddEventWinning() {
  const navigate = useNavigate();
  const [rounds, setRounds] = useState([]);
  const [selectEvent, setSelectEvent] = useState("");
  const [players, setPlayers] = useState([]);
  const adminData = useContext(Context);
  const dispatch = useDispatch();
  const {
    eventCreateDataLoading,
    eventCreateDataSuccess,
    eventsData: { events },
  } = useSelector((state) => state.api);
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (value) => {
    const { playerDetails, ...restOfValue } = value;
    const filteredData = playerDetails.reduce(
      (acc, item, index) => {
        acc.user_names.push(item.name);
        acc.user_bios.push(item.bio);
        acc.twitch_links.push(item.twitch_link);
        acc.base64_images.push(item.image_path);
        acc.players_id.push(index + 1);
        acc.players_stack.push(0);
        return acc;
      },
      {
        user_names: [],
        user_bios: [],
        twitch_links: [],
        base64_images: [],
        players_stack: [],
        players_id: [],
      }
    );
    const dataWrapper = {
      ...restOfValue,
      ...filteredData,
      number_of_players: playerDetails.length,
      places_paid: formik.values.payoutDetails.length,
      roleId: adminData?.id,
    };
    dispatch(CreateEvents(dataWrapper));
    setSuccess(true);
  };

  const formik = useFormik({
    initialValues: { ...emptyData },
    validationSchema: eventSchema,
    onSubmit: () => {
      handleSubmit(formik.values);
    },
  });

  // useEffect(() => {
  //   if (rounds && formik.values.payoutDetails) {
  //     const newRounds = parseInt(rounds);
  //     const updatedPayoutDetails = Array.from(
  //       { length: newRounds },
  //       (_, roundIndex) => {
  //         const existingRound = formik.values.payoutDetails[roundIndex] || [
  //           { place: "", percentage: "", fromPrizePool: "", addedFunds: "" },
  //         ];
  //         return existingRound.map((detail) => ({ ...detail }));
  //       }
  //     );
  //     formik.setFieldValue("payoutDetails", updatedPayoutDetails);
  //   }
  // }, [rounds]);

  useEffect(() => {
    const payOuts = formik.values.payoutDetails;
    const playerLength = formik.values.playerDetails.length;
    payOuts.map((payout) => {
      while (payout.length > playerLength) {
        payout.pop();
      }
      return payout;
    });
  }, [formik.values.playerDetails.length, formik.values.payoutDetails]);

  useEffect(() => {
    dispatch(fetchEvents({ search: "", limit: 10, currentPage: 1 }));
  }, [dispatch]);

  // console.log(events);
  // console.log(rounds);

  useEffect(() => {
    if (events && selectEvent) {
      const findEvent = events.find((event) => event.id === +selectEvent);
      setRounds(findEvent.payoutDetails);
      setPlayers(findEvent.players_details);
    } else {
      setRounds([]);
    }
  }, [events, selectEvent]);

  console.log(rounds);
  console.log(players);

  return (
    <Layout>
      <Loader isLoading={eventCreateDataLoading || isLoading} />
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
                          {console.log("roundround", round)}
                          <tbody>
                            {round.length &&
                              round.map((payout, payoutIndex) => (
                                <tr key={payoutIndex}>
                                  <td className="text-center">
                                    {getOrdinal(payoutIndex + 1)}
                                  </td>

                                  <td>
                                    <select className="form-select form-select-sm">
                                      <option selected value={""}>
                                        Select Player
                                      </option>
                                      {players.map((item) => (
                                        <option value={item.id}>
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
              )}
            </div>
          </div>
          {/* <div className="card">
            <div className="card-body">
              <div className="row gy-3">
                <div className=" col-lg-2">
                  <label htmlFor="basiInput" className="form-label">
                    Event Thumbnail
                    <span className="text-danger">*</span>
                  </label>
                  <div>
                    <span className="event-banner-edit rounded-circle bg-light shadow-lg">
                      <IconButton
                        component="label"
                        aria-label="edit"
                        size="small"
                      >
                        <VisuallyHiddenInput
                          type="file"
                          name="image"
                          accept=".png, .jpg, .jpeg"
                          onChange={async (e) => {
                            const image = await handleBase64File(
                              e.target.files[0]
                            );
                            formik.handleChange({
                              target: {
                                name: e.target.name,
                                value: image,
                              },
                            });
                          }}
                          onBlur={formik.handleBlur}
                        />

                        <ModeEditIcon />
                      </IconButton>
                    </span>
                    <div className="img-thumbnail">
                      <img
                        id="event-banner"
                        src={
                          formik.values.image
                            ? formik.values.image
                            : "https://placehold.co/150x150"
                        }
                        className="event-banner"
                      />
                    </div>
                    <div
                      className={`invalid-feedback ${
                        formik.touched.image && formik.errors.image && "d-block"
                      }`}
                    >
                      {formik.errors.image}
                    </div>
                  </div>
                </div>
                <div className=" col-lg-8">
                  <label htmlFor="basiInput" className="form-label">
                    Event Banner
                    <span className="text-danger">*</span>
                  </label>
                  <div>
                    <span className="event-banner-edit rounded-circle bg-light shadow-lg">
                      <IconButton
                        component="label"
                        aria-label="edit"
                        size="small"
                      >
                        <VisuallyHiddenInput
                          type="file"
                          name="image1"
                          accept=".png, .jpg, .jpeg"
                          onChange={async (e) => {
                            const image = await handleBase64File(
                              e.target.files[0]
                            );
                            formik.handleChange({
                              target: {
                                name: e.target.name,
                                value: image,
                              },
                            });
                          }}
                          onBlur={formik.handleBlur}
                        />
                        <ModeEditIcon />
                      </IconButton>
                    </span>
                    <div className="img-thumbnail">
                      <img
                        id="event-banner"
                        src={
                          formik.values.image1
                            ? formik.values.image1
                            : "https://placehold.co/1130x280"
                        }
                        className="event-banner"
                      />
                    </div>
                    <div
                      className={`invalid-feedback ${
                        formik.touched.image1 &&
                        formik.errors.image1 &&
                        "d-block"
                      }`}
                    >
                      {formik.errors.image1}
                    </div>
                  </div>
                </div>
                <div className=" col-lg-2">
                  <label htmlFor="basiInput" className="form-label">
                    Event Image
                    <span className="text-danger">*</span>
                  </label>
                  <div>
                    <span className="event-banner-edit rounded-circle bg-light shadow-lg">
                      <IconButton
                        component="label"
                        aria-label="edit"
                        size="small"
                      >
                        <VisuallyHiddenInput
                          type="file"
                          name="image2"
                          accept=".png, .jpg, .jpeg"
                          onChange={async (e) => {
                            const image = await handleBase64File(
                              e.target.files[0]
                            );
                            formik.handleChange({
                              target: {
                                name: e.target.name,
                                value: image,
                              },
                            });
                          }}
                          onBlur={formik.handleBlur}
                        />
                        <ModeEditIcon />
                      </IconButton>
                    </span>
                    <div className="img-thumbnail">
                      <img
                        id="event-banner"
                        src={
                          formik.values.image2
                            ? formik.values.image2
                            : "https://placehold.co/1024x1024"
                        }
                        className="event-banner"
                      />
                    </div>
                    <div
                      className={`invalid-feedback ${
                        formik.touched.image2 &&
                        formik.errors.image2 &&
                        "d-block"
                      }`}
                    >
                      {formik.errors.image2}
                    </div>
                  </div>
                </div>
                <div className=" col-lg-12">
                  <label htmlFor="event_headline" className="form-label">
                    Event Headline
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Event Headline"
                    id="event_headline"
                    name="event_headline"
                    value={formik.values.event_headline}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div
                  className={`invalid-feedback ${
                    formik.touched.event_headline &&
                    formik.errors.event_headline &&
                    "d-block"
                  }`}
                >
                  {formik.errors.event_headline}
                </div>
                <div className=" col-lg-12">
                  <label htmlFor="event_details" className="form-label">
                    Event Details
                    <span className="text-danger">*</span>
                  </label>
                  <Editor
                    setEditorHtml={setEditorHtml}
                    editorHtml={editorHtml}
                    formik={formik}
                  />
                  <div
                    className={`invalid-feedback ${
                      formik.touched.event_details &&
                      formik.errors.event_details &&
                      "d-block"
                    }`}
                  >
                    {formik.errors.event_details}
                  </div>
                </div>
              </div>
              <div className="row gy-4  pt-3">
                <div className="col-12">
                  <button className="btn btn-sm btn-primary" type="submit">
                    Submit form
                  </button>
                </div>
              </div>
            </div>
          </div> */}
        </form>
      </div>
    </Layout>
  );
}
