import React, { useContext, useEffect, useRef, useState } from "react";
import Layout from "../../components/Layout";
import Loader from "../../utils/loader";
import { useDispatch, useSelector } from "react-redux";
import TimezoneSelect from "react-timezone-select";
import CustomDatePicker from "../../utils/customDatePicker";
import CustomTimePicker from "../../utils/customTimePicker";
import CustomImgeUploader from "../../utils/customImageUploader";
import Editor from "../../utils/editor";
import { IconButton } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { styled } from "@mui/material/styles";
import Context from "../../components/Context";
import { CreateEvents } from "../../features/apiSlice";
import { useFormik } from "formik";
import { eventSchema } from "../../schema/eventFormSchema";
import { useNavigate } from "react-router-dom";

const emptyData = {
  event_name: "",
  event_slogan: "",
  font_color: "",
  event_date: null,
  start_time: null,
  time_zone: "",
  location: "",
  sponsor: "",
  event_genre: "",
  event_type: "",
  event_round: "",
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
  payoutDetails: [{ place: "", percentage: "" }],
  playerDetails: [
    {
      name: "",
      bio: "",
      twitch_link: "",
      // image_path: "",
    },
  ],
};
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function AddEvent() {
  const navigate = useNavigate();
  const [editorHtml, setEditorHtml] = useState("");
  const adminData = useContext(Context);
  const dispatch = useDispatch();
  const { eventCreateDataLoading, eventCreateDataSuccess } = useSelector(
    (state) => state.api
  );
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

  const handleBase64File = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleChangePayoutDetails = async (e, index) => {
    const { name, value } = e.target;
    const updatedInputs = [...formik.values.payoutDetails];
    updatedInputs[index] = {
      ...updatedInputs[index],
      [name]: value,
    };
    formik.setValues({ ...formik.values, payoutDetails: updatedInputs });
  };

  const addPayout = () => {
    formik.setValues((prevValues) => ({
      ...prevValues,
      payoutDetails: [
        ...prevValues.payoutDetails,
        { place: "", percentage: "" },
      ],
    }));
  };

  const removePayout = (index) => {
    formik.setValues((prevValues) => ({
      ...prevValues,
      payoutDetails: [
        ...prevValues.payoutDetails.slice(0, index),
        ...prevValues.payoutDetails.slice(index + 1),
      ],
    }));
  };

  const handleChangePlayerDetails = (e, index) => {
    const { name, value, files } = e.target;
    const updatedInputs = [...formik.values.playerDetails];
    const isImage = value ? value : files;
    updatedInputs[index] = {
      ...updatedInputs[index],
      [name]: isImage,
    };
    formik.setValues({ ...formik.values, playerDetails: updatedInputs });
  };

  const addPlayer = () => {
    formik.setValues((prevValues) => ({
      ...prevValues,
      playerDetails: [
        ...prevValues.playerDetails,
        {
          name: "",
          bio: "",
          twitch_link: "",
          image_path: "",
        },
      ],
    }));
  };

  const removePlayer = (index) => {
    formik.setValues((prevValues) => ({
      ...prevValues,
      playerDetails: [
        ...prevValues.playerDetails.slice(0, index),
        ...prevValues.playerDetails.slice(index + 1),
      ],
    }));
  };

  useEffect(() => {
    if (eventCreateDataSuccess && success) {
      navigate("/events");
    }
  }, [eventCreateDataSuccess, success]);

  const handleSaveAsDraft = () => {
    localStorage.setItem("draft", JSON.stringify(formik.values));
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  const handleRestoreDraft = () => {
    setIsLoading(true);
    const draftData = localStorage.getItem("draft");
    if (draftData) {
      formik.setValues(JSON.parse(draftData));
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  // const handleRestoreDraft = () => {
  //   setIsLoading(true);
  //   const drafFile = localStorage.getItem("draft");
  //   const drafData = drafFile && JSON.parse(drafFile);
  //   if (drafFile) {
  //     formik.setValues(drafData);
  //   }
  //   setIsLoading(false);
  //   // setTimeout(() => {}, 1000);
  // };
  // console.log(formik.errors);
  // console.log(formik.touched);
  // console.log(formik.values);
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
        <form onSubmit={formik.handleSubmit} className="col-lg-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between">
              <h5 className="card-title mb-0">Add Event</h5>
              <div>
                <button
                  className="btn btn-primary btn-sm mb-0 me-1"
                  type="button"
                  onClick={handleRestoreDraft}
                >
                  Restore
                </button>
                <button
                  className="btn btn-primary btn-sm mb-0"
                  type="button"
                  onClick={handleSaveAsDraft}
                >
                  Save Form
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="row gy-3">
                <div className="col-xxl-3 col-lg-4">
                  <div>
                    <label htmlFor="event_name" className="form-label">
                      Event Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="event_name"
                      name="event_name"
                      value={formik.values.event_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Event Name"
                    />
                  </div>
                  <div
                    className={`invalid-feedback ${
                      formik.touched.event_name &&
                      formik.errors.event_name &&
                      "d-block"
                    }`}
                  >
                    {formik.errors.event_name}
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-6">
                  <div>
                    <label htmlFor="event_slogan" className="form-label">
                      Event Slogan
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="event_slogan"
                      name="event_slogan"
                      value={formik.values.event_slogan}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Event Slogan"
                    />
                  </div>
                  <div
                    className={`invalid-feedback ${
                      formik.touched.event_slogan &&
                      formik.errors.event_slogan &&
                      "d-block"
                    }`}
                  >
                    {formik.errors.event_slogan}
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-2">
                  <div>
                    <label htmlFor="font_color" className="form-label">
                      Font Color
                    </label>
                    <input
                      type="color"
                      className="form-control"
                      style={{ height: "37px" }}
                      id="font_color"
                      name="font_color"
                      value={formik.values.font_color}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <div
                    className={`invalid-feedback ${
                      formik.touched.font_color &&
                      formik.errors.font_color &&
                      "d-block"
                    }`}
                  >
                    {formik.errors.font_color}
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-3">
                  <div>
                    <label htmlFor="event_date" className="form-label">
                      Event Date
                    </label>
                    <CustomDatePicker
                      value={formik?.values?.event_date}
                      formik={formik}
                    />
                  </div>
                  <div
                    className={`invalid-feedback ${
                      formik.touched.event_date &&
                      formik.errors.event_date &&
                      "d-block"
                    }`}
                  >
                    {formik.errors.event_date}
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-3">
                  <div>
                    <label htmlFor="start_time" className="form-label">
                      Start Time
                    </label>
                    <CustomTimePicker
                      value={formik?.values?.start_time}
                      formik={formik}
                    />
                  </div>
                  <div
                    className={`invalid-feedback ${
                      formik.touched.start_time &&
                      formik.errors.start_time &&
                      "d-block"
                    }`}
                  >
                    {formik.errors.start_time}
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-3">
                  <div>
                    <label htmlFor="time_zone" className="form-label">
                      Time Zone
                    </label>

                    <TimezoneSelect
                      name="time_zone"
                      id="time_zone"
                      value={formik.values.time_zone}
                      onChange={(e) => {
                        formik.handleChange({
                          target: {
                            name: "time_zone",
                            value: e.value,
                          },
                        });
                      }}
                      onBlur={() =>
                        formik.handleBlur({ target: { name: "time_zone" } })
                      }
                    />
                  </div>
                  <div
                    className={`invalid-feedback ${
                      formik.touched.time_zone &&
                      formik.errors.time_zone &&
                      "d-block"
                    }`}
                  >
                    {formik.errors.time_zone}
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-3">
                  <div>
                    <label htmlFor="location" className="form-label">
                      Event Location
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      id="location"
                      name="location"
                      value={formik.values.location}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <div
                    className={`invalid-feedback ${
                      formik.touched.location &&
                      formik.errors.location &&
                      "d-block"
                    }`}
                  >
                    {formik.errors.location}
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-3">
                  <div>
                    <label htmlFor="sponsor" className="form-label">
                      Event Sponsor
                    </label>
                    <input
                      // value={selected.sponsor}
                      type="text"
                      className="form-control"
                      id="sponsor"
                      name="sponsor"
                      // onChange={handleChange}
                      value={formik.values.sponsor}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <div
                    className={`invalid-feedback ${
                      formik.touched.sponsor &&
                      formik.errors.sponsor &&
                      "d-block"
                    }`}
                  >
                    {formik.errors.sponsor}
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-3">
                  <div>
                    <label htmlFor="event_type" className="form-label">
                      Event Type
                    </label>
                    <input
                      // value={selected.event_type}
                      type="text"
                      className="form-control"
                      id="event_type"
                      name="event_type"
                      // onChange={handleChange}
                      value={formik.values.event_type}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <div
                    className={`invalid-feedback ${
                      formik.touched.event_type &&
                      formik.errors.event_type &&
                      "d-block"
                    }`}
                  >
                    {formik.errors.event_type}
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-3">
                  <div>
                    <label htmlFor="event_type" className="form-label">
                      Event Genre
                    </label>
                    <input
                      // value={selected.event_type}
                      type="text"
                      className="form-control"
                      id="event_genre"
                      name="event_genre"
                      // onChange={handleChange}
                      value={formik.values.event_genre}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <div
                    className={`invalid-feedback ${
                      formik.touched.event_genre &&
                      formik.errors.event_genre &&
                      "d-block"
                    }`}
                  >
                    {formik.errors.event_genre}
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-3">
                  <label htmlFor="event_round" className="form-label">
                    Rounds/Event Count
                  </label>
                  <div>
                    <div className="input-step step-primary full-width">
                      <button
                        type="button"
                        className="minus"
                        onClick={() =>
                          formik.handleChange({
                            target: {
                              name: "event_round",
                              value: +formik.values.event_round - 1,
                            },
                          })
                        }
                      >
                        –
                      </button>
                      <input
                        type="number"
                        className="product-quantity"
                        min={"0"}
                        max={"100"}
                        id="event_round"
                        name="event_round"
                        defaultValue="0"
                        value={formik.values.event_round}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <button
                        type="button"
                        className="plus"
                        onClick={() =>
                          formik.handleChange({
                            target: {
                              name: "event_round",
                              value: +formik.values.event_round + 1,
                            },
                          })
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div
                    className={`invalid-feedback ${
                      formik.touched.event_round &&
                      formik.errors.event_round &&
                      "d-block"
                    }`}
                  >
                    {formik.errors.event_round}
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-6">
                  <div>
                    <label htmlFor="event_ticket" className="form-label">
                      Event Ticket
                    </label>
                    <input
                      // value={selected.event_ticket}
                      type="text"
                      className="form-control"
                      id="event_ticket"
                      name="event_ticket"
                      // onChange={handleChange}
                      value={formik.values.event_ticket}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <div
                    className={`invalid-feedback ${
                      formik.touched.event_ticket &&
                      formik.errors.event_ticket &&
                      "d-block"
                    }`}
                  >
                    {formik.errors.event_ticket}
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-6">
                  <div>
                    <label htmlFor="ticket_url" className="form-label">
                      Ticket URL
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="ticket_url"
                      name="ticket_url"
                      value={formik.values.ticket_url}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <div
                    className={`invalid-feedback ${
                      formik.touched.ticket_url &&
                      formik.errors.ticket_url &&
                      "d-block"
                    }`}
                  >
                    {formik.errors.ticket_url}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row gy-3">
                <div className=" col-lg-12">
                  <label htmlFor="basiInput" className="form-label">
                    Players/Teams % Share of Prizes
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Share of Prizes %"
                    name="share_of_prize"
                    id="share_of_prize"
                    value={formik.values.share_of_prize}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <div
                    className={`invalid-feedback ${
                      formik.touched.share_of_prize &&
                      formik.errors.share_of_prize &&
                      "d-block"
                    }`}
                  >
                    {formik.errors.share_of_prize}
                  </div>
                </div>
                <div className=" col-lg-12">
                  <label htmlFor="basiInput" className="form-label">
                    Players/Team Details
                    <span className="text-danger">*</span>
                  </label>
                  <table
                    id="example"
                    className="table table-bordered dt-responsive nowrap table-striped align-middle"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th style={{ width: 60 }} className="text-center">
                          S.No
                        </th>
                        <th className="text-center">Name</th>
                        <th className="text-center">Bio</th>
                        <th className="text-center">Twitch Link</th>
                        <th className="text-center">Upload Image</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {formik?.values?.playerDetails?.length &&
                        formik?.values?.playerDetails.map((players, index) => (
                          <tr key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td>
                              <input
                                value={players.name}
                                type="text"
                                className="form-control form-control-sm"
                                name="name"
                                id="name"
                                onChange={(e) =>
                                  handleChangePlayerDetails(e, index)
                                }
                                onBlur={formik.handleBlur}
                              />
                              <div
                                className={`invalid-feedback ${
                                  formik.touched?.playerDetails?.[index]
                                    ?.name &&
                                  formik.errors.playerDetails?.[index]?.name &&
                                  "d-block"
                                }`}
                              >
                                {formik.errors.playerDetails?.[index]?.name}
                              </div>
                            </td>
                            <td>
                              <input
                                value={players.bio}
                                type="text"
                                className="form-control form-control-sm"
                                name="bio"
                                onChange={(e) =>
                                  handleChangePlayerDetails(e, index)
                                }
                                onBlur={formik.handleBlur}
                              />
                              <div
                                className={`invalid-feedback ${
                                  formik.touched?.playerDetails?.[index]?.bio &&
                                  formik.errors.playerDetails?.[index]?.bio &&
                                  "d-block"
                                }`}
                              >
                                {formik.errors.playerDetails?.[index]?.bio}
                              </div>
                            </td>
                            <td>
                              <input
                                value={players.twitch_link}
                                type="text"
                                className="form-control form-control-sm"
                                name="twitch_link"
                                onChange={(e) =>
                                  handleChangePlayerDetails(e, index)
                                }
                                onBlur={formik.handleBlur}
                              />
                              <div
                                className={`invalid-feedback ${
                                  formik.touched?.playerDetails?.[index]
                                    ?.twitch_link &&
                                  formik.errors.playerDetails?.[index]
                                    ?.twitch_link &&
                                  "d-block"
                                }`}
                              >
                                {
                                  formik.errors.playerDetails?.[index]
                                    ?.twitch_link
                                }
                              </div>
                            </td>
                            <td>
                              <CustomImgeUploader
                                handleChangePlayerDetails={
                                  handleChangePlayerDetails
                                }
                                index={index}
                                formik={formik}
                              />
                              {/* <div
                                className={`invalid-feedback ${
                                  formik.touched?.image_path &&
                                  formik.errors.playerDetails?.[index]
                                    ?.image_path &&
                                  "d-block"
                                }`}
                              >
                                {
                                  formik.errors.playerDetails?.[index]
                                    ?.image_path
                                }
                              </div> */}
                            </td>
                            {index !== 0 ? (
                              <td className="p-0 m-0 td-table px-1">
                                <button
                                  className="btn btn-sm btn-danger"
                                  style={{ background: "#dc3545" }}
                                  type="button"
                                  onClick={() => removePlayer(index)}
                                >
                                  <i className="ri-subtract-line" />
                                </button>
                              </td>
                            ) : (
                              <td></td>
                            )}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-end border-0">
                    <button
                      className="btn btn-sm btn-primary"
                      type="button"
                      onClick={addPlayer}
                    >
                      <i className="ri-add-line" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <div className="row gy-3">
                <div className=" col-lg-4">
                  <label htmlFor="bounty_detail" className="form-label">
                    Bounty Details
                    <span className="text-danger">*</span>
                  </label>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="bounty_detail"
                      name="bounty_detail"
                      checked={formik.values.bounty_detail === "none"}
                      onChange={(e) => {
                        formik.handleChange({
                          target: {
                            name: e.target.name,
                            value: e.target.checked ? "none" : null,
                          },
                        });
                      }}
                      onBlur={formik.handleBlur}
                    />
                    <label className="form-check-label" htmlFor="formCheck6">
                      None
                    </label>
                  </div>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="bounty_detail"
                      name="bounty_detail"
                      checked={formik.values.bounty_detail === "bounty"}
                      onChange={(e) => {
                        formik.handleChange({
                          target: {
                            name: e.target.name,
                            value: e.target.checked ? "bounty" : null,
                          },
                        });
                      }}
                    />
                    <label className="form-check-label" htmlFor="formCheck6">
                      Bounty
                    </label>
                  </div>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="bounty_detail"
                      name="bounty_detail"
                      checked={formik.values.bounty_detail === "pko_bounty"}
                      onChange={(e) => {
                        formik.handleChange({
                          target: {
                            name: e.target.name,
                            value: e.target.checked ? "pko_bounty" : null,
                          },
                        });
                      }}
                    />
                    <label className="form-check-label" htmlFor="formCheck6">
                      PKO Bounty
                    </label>
                  </div>
                  <div
                    className={`invalid-feedback ${
                      formik.touched.bounty_detail &&
                      formik.errors.bounty_detail &&
                      "d-block"
                    }`}
                  >
                    {formik.errors.bounty_detail}
                  </div>
                </div>
                <div className=" col-lg-8">
                  <label
                    htmlFor="bounty_options-heading"
                    className="form-label"
                  >
                    Bounty Options
                    <span className="text-danger">*</span>
                  </label>
                  <div className="form-check form-radio-primary mb-2">
                    <div className="row">
                      <div className="col-6 d-flex align-items-center">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          name="bounty_options_values"
                          id="bounty_options_values"
                          checked={
                            formik.values.bounty_options_values
                              ?.percent_of_stake_value
                          }
                          onChange={(e) =>
                            formik.handleChange({
                              target: {
                                name: "bounty_options_values",
                                value: {
                                  ...formik.values.bounty_options_values,
                                  percent_of_stake_value: e.target.checked,
                                  sponsor_added_value: false,
                                  pko_split_value: false,
                                },
                              },
                            })
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="bounty_options_stake"
                        >
                          Percent(%) of Stake
                        </label>
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          name="bounty_options.percent_of_stake"
                          className="form-control form-control-sm"
                          disabled={
                            !formik.values.bounty_options_values
                              ?.percent_of_stake_value
                          }
                          value={formik.values.bounty_options?.percent_of_stake}
                          onChange={(e) =>
                            formik.handleChange({
                              target: {
                                name: "bounty_options",
                                value: {
                                  ...formik.values.bounty_options,
                                  percent_of_stake: e.target.value,
                                  pko_split: "",
                                },
                              },
                            })
                          }
                          onBlur={formik.handleBlur}
                        />{" "}
                        <div
                          className={`invalid-feedback ${
                            formik.touched.bounty_options?.percent_of_stake &&
                            formik.errors.bounty_options?.percent_of_stake &&
                            "d-block"
                          }`}
                        >
                          {formik.errors.bounty_options?.percent_of_stake}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-check form-radio-primary mb-3">
                    <div className="row">
                      <div className="col-6 d-flex align-items-center">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          id="bounty_options_values"
                          name="bounty_options_values"
                          checked={
                            formik.values.bounty_options_values
                              ?.sponsor_added_value
                          }
                          onChange={(e) =>
                            formik.handleChange({
                              target: {
                                name: "bounty_options_values",
                                value: {
                                  ...formik.values.bounty_options_values,
                                  sponsor_added_value: e.target.checked,
                                  percent_of_stake_value: false,
                                  pko_split_value: false,
                                },
                              },
                            })
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="bounty_options_sponsor"
                        >
                          Sponsor added
                        </label>
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          disabled={
                            !formik.values.bounty_options_values
                              ?.sponsor_added_value
                          }
                          value={formik.values.bounty_options?.sponsor_added}
                          onChange={(e) =>
                            formik.handleChange({
                              target: {
                                name: "bounty_options",
                                value: {
                                  ...formik.values.bounty_options,
                                  sponsor_added: e.target.value,
                                  pko_split: "",
                                },
                              },
                            })
                          }
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-check form-radio-primary mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="bounty_options_values"
                      name="bounty_options_values"
                      checked={
                        formik.values.bounty_options_values
                          ?.percent_of_stake_value &&
                        formik.values.bounty_options_values?.sponsor_added_value
                      }
                      onChange={(e) =>
                        formik.handleChange({
                          target: {
                            name: "bounty_options_values",
                            value: {
                              ...formik.values.bounty_options_values,
                              percent_of_stake_value: e.target.checked,
                              sponsor_added_value: e.target.checked,
                              pko_split_value: false,
                            },
                          },
                        })
                      }
                    />
                    <label
                      className="form-check-label"
                      htmlFor="bounty_options_both"
                    >
                      Both
                    </label>
                  </div>
                  <div className="form-check form-radio-primary mb-3">
                    <div className="row">
                      <div className="col-6 d-flex align-items-center">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          id="bounty_options_values"
                          name="bounty_options_values"
                          checked={
                            formik.values.bounty_options_values?.pko_split_value
                          }
                          onChange={(e) =>
                            formik.handleChange({
                              target: {
                                name: "bounty_options_values",
                                value: {
                                  ...formik.values.bounty_options_values,
                                  pko_split_value: e.target.checked,
                                  sponsor_added_value: false,
                                  percent_of_stake_value: false,
                                },
                              },
                            })
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="bounty_options_pko"
                        >
                          PKO Split (% added to player bounty)
                        </label>
                      </div>
                      <div className="col-6">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          disabled={
                            !formik.values.bounty_options_values.pko_split_value
                          }
                          value={formik.values.bounty_options?.pko_split}
                          onChange={(e) =>
                            formik.handleChange({
                              target: {
                                name: "bounty_options",
                                value: {
                                  ...formik.values.bounty_options,
                                  percent_of_stake: "",
                                  sponsor_added: "",
                                  pko_split: e.target.value,
                                },
                              },
                            })
                          }
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </div>
                    <div
                      className={`invalid-feedback ${
                        formik.touched.bounty_options &&
                        formik.errors.bounty_options &&
                        "d-block"
                      }`}
                    >
                      {formik.errors.bounty_options}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-header" />
              <div className="row gy-3 mt-2">
                <div className=" col-lg-6">
                  <label htmlFor="basiInput" className="form-label">
                    Prize Pool Payouts
                    <span className="text-danger">*</span>
                  </label>
                  <table
                    id="example"
                    className="table table-bordered dt-responsive nowrap table-striped align-middle"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th style={{ width: 60 }} className="text-center">
                          S.No
                        </th>
                        <th className="text-center">Place</th>
                        <th className="text-center">% of Prize Pool</th>

                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {formik?.values?.payoutDetails?.length &&
                        formik?.values?.payoutDetails.map((payout, index) => (
                          <tr>
                            <td className="text-center">{index + 1}</td>
                            <td>
                              <input
                                type="number"
                                className="form-control form-control-sm"
                                name="place"
                                value={payout.place}
                                onChange={(e) =>
                                  handleChangePayoutDetails(e, index)
                                }
                                onBlur={formik.handleBlur}
                              />
                              <div
                                className={`invalid-feedback ${
                                  formik.touched?.payoutDetails?.[index]
                                    ?.place &&
                                  formik.errors.payoutDetails?.[index]?.place &&
                                  "d-block"
                                }`}
                              >
                                {formik.errors.payoutDetails?.[index]?.place}
                              </div>
                            </td>
                            <td>
                              <input
                                type="number"
                                className="form-control form-control-sm"
                                name="percentage"
                                value={payout.percentage}
                                onChange={(e) => {
                                  handleChangePayoutDetails(e, index);
                                }}
                                onBlur={formik.handleBlur}
                              />
                              <div
                                className={`invalid-feedback ${
                                  formik.touched?.payoutDetails?.[index]
                                    ?.percentage &&
                                  formik.errors.payoutDetails?.[index]
                                    ?.percentage &&
                                  "d-block"
                                }`}
                              >
                                {
                                  formik.errors.payoutDetails?.[index]
                                    ?.percentage
                                }
                              </div>
                            </td>

                            {index !== 0 ? (
                              <td className="p-0 m-0 td-table px-1">
                                <button
                                  className="btn btn-sm btn-danger"
                                  style={{ background: "#dc3545" }}
                                  type="button"
                                  onClick={() => removePayout(index)}
                                >
                                  <i className="ri-subtract-line" />
                                </button>
                              </td>
                            ) : (
                              <td></td>
                            )}
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-end">
                    <button
                      className="btn btn-sm btn-primary"
                      type="button"
                      onClick={addPayout}
                    >
                      <i className="ri-add-line" />
                    </button>
                  </div>
                </div>
                <div className=" col-lg-6">
                  <div className="row mb-3">
                    <div className="col-6 d-flex align-items-center">
                      <label
                        className="form-check-label"
                        htmlFor="prize_pool_additional_value"
                      >
                        Prize Pool Additional Funds
                        <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        name="prize_pool_additional"
                        id="prize_pool_additional"
                        value={formik.values.prize_pool_additional.value}
                        onChange={(e) =>
                          formik.handleChange({
                            target: {
                              name: "prize_pool_additional",
                              value: {
                                ...formik.values.prize_pool_additional,
                                value: e.target.value,
                              },
                            },
                          })
                        }
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    <div
                      className={`invalid-feedback ${
                        formik.touched.prize_pool_additional &&
                        formik.errors.prize_pool_additional?.value &&
                        "d-block"
                      }`}
                    >
                      {formik.errors.prize_pool_additional?.value}
                    </div>
                  </div>

                  <div className="form-check form-radio-primary mb-3">
                    <div className="row">
                      <div className="col-6 d-flex align-items-center">
                        <input
                          className="form-check-input me-2"
                          type="radio"
                          id="prize_pool_additional_direct"
                          name="prize_pool_additional"
                          checked={formik.values.prize_pool_additional.Direct}
                          onChange={(e) =>
                            formik.handleChange({
                              target: {
                                name: "prize_pool_additional",
                                value: {
                                  ...formik.values.prize_pool_additional,
                                  Direct: e.target.checked,
                                  per_match: "",
                                },
                              },
                            })
                          }
                          onBlur={formik.handleBlur}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="prize_pool_additional_direct"
                        >
                          Direct Match
                        </label>
                      </div>
                      <div className="col-6"></div>
                    </div>
                  </div>

                  <div className="form-check form-radio-primary mb-3">
                    <div className="row">
                      <div className="col-6 d-flex align-items-center">
                        <input
                          className="form-check-input me-2"
                          type="radio"
                          name="prize_pool_additional"
                          id="prize_pool_additional_per_match"
                          checked={
                            formik.values.prize_pool_additional.per_match
                          }
                          onChange={(e) =>
                            formik.handleChange({
                              target: {
                                name: "prize_pool_additional",
                                value: {
                                  ...formik.values.prize_pool_additional,
                                  per_match: e.target.checked,
                                  Direct: false,
                                },
                              },
                            })
                          }
                          onBlur={formik.handleBlur}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="prize_pool_additional_per_match"
                        >
                          Percent (%) Match
                        </label>
                      </div>
                      <div className="col-6">
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          id="prize_pool_additional_per_match"
                          disabled={
                            !formik?.values?.prize_pool_additional?.per_match
                          }
                          value={
                            formik?.values?.prize_pool_additional.per_match ===
                            true
                              ? ""
                              : formik?.values?.prize_pool_additional.per_match
                          }
                          onChange={(e) =>
                            formik.handleChange({
                              target: {
                                name: "prize_pool_additional",
                                value: {
                                  ...formik.values.prize_pool_additional,
                                  per_match: e.target.value,
                                },
                              },
                            })
                          }
                          onBlur={formik.handleBlur}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
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
          </div>
        </form>
      </div>
    </Layout>
  );
}
