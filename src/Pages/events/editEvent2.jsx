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
import { UpdateEvents, fetchEventById } from "../../features/apiSlice";
import { useNavigate, useParams } from "react-router-dom";

const emptyData = {
  event_name: "",
  event_slogan: "",
  font_color: "",
  event_date: null,
  start_time: null,
  time_zone: "",
  location: "",
  sponsor: "",
  event_round: "",
  event_ticket: "",
  ticket_url: "",
  number_of_players: "",
  share_of_prize: "",
  event_round: "",
  payoutDetails: "",
  time_zone: "",
  font_color: "",
  event_type: "",
  prize_pool_additional: { value: "", Direct: "", per_match: "" },
  bounty_options: { percent_of_stake: "", sponsor_added: "", pko_split: "" },
  places_paid: "",
  prize_pool_additional: "",
  event_headline: "",
  event_details: "",
  image: "",
  image1: "",
  image2: "",
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

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editorHtml, setEditorHtml] = useState("");
  const adminData = useContext(Context);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const {
    eventByIdData,
    eventByIdDataLoading,
    eventUpdateDataLoading,
    eventUpdateDataSuccess,
  } = useSelector((state) => state.api);

  const [selected, setSelected] = useState(emptyData);
  const [playerDetails, setPlayerDetails] = useState([
    {
      name: "",
      bio: "",
      twitch_link: "",
      image_path: "",
    },
  ]);
  const [payoutDetails, setPayoutDetails] = useState([
    { place: "", percentage: "" },
  ]);

  useEffect(() => {
    if (id) dispatch(fetchEventById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (eventByIdData) {
      setSelected(eventByIdData);
      setPlayerDetails(eventByIdData?.players_details);
      setPayoutDetails(eventByIdData?.payoutDetails);
    }
  }, [eventByIdData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataWrapper = {
      ...selected,
      payoutDetails,
      places_paid: payoutDetails.length,
      roleId: adminData?.id,
      event_details: editorHtml,
    };
    dispatch(UpdateEvents({ body: dataWrapper, id }));
    setSuccess(true);
  };

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    const isImage = value && !files ? value : await handleBase64File(files[0]);
    setSelected({ ...selected, [name]: isImage });
  };

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

  useEffect(() => {
    if (playerDetails?.length) {
      const filteredData = playerDetails.reduce(
        (acc, item) => {
          acc.user_names.push(item.name);
          acc.user_bios.push(item.bio);
          acc.twitch_links.push(item.twitch_link);
          acc.base64_images.push(item.image_path);
          return acc;
        },
        { user_names: [], user_bios: [], twitch_links: [], base64_images: [] }
      );
      setSelected({
        ...selected,
        ...filteredData,
        number_of_players: playerDetails.length,
      });
    }
  }, [playerDetails]);

  const handleChangePlayerDetails = (e, index) => {
    const { name, value, files } = e.target;
    const updatedInputs = [...playerDetails];
    const isImage = value ? value : files;
    updatedInputs[index] = {
      ...updatedInputs[index],
      [name]: isImage,
    };
    setPlayerDetails(updatedInputs);
  };

  const handleChangePayoutDetails = async (e, index) => {
    const { name, value } = e.target;
    const updatedInputs = [...payoutDetails];
    updatedInputs[index] = {
      ...updatedInputs[index],
      [name]: value,
    };
    setPayoutDetails(updatedInputs);
  };

  const addPlayer = () => {
    setPlayerDetails((prevDetails) => [
      ...prevDetails,
      {
        name: "",
        bio: "",
        twitch_link: "",
        image_path: "",
      },
    ]);
  };

  const addPayout = () => {
    setPayoutDetails((payoutDetails) => [
      ...payoutDetails,
      {
        place: "",
        percentage: "",
      },
    ]);
  };

  const removePayout = (index) => {
    const updatedInputs = [...payoutDetails];
    updatedInputs.splice(index, 1);
    setPayoutDetails(updatedInputs);
  };

  const removePlayer = (index) => {
    const updatedInputs = [...playerDetails];
    updatedInputs.splice(index, 1);
    setPlayerDetails(updatedInputs);
  };

  useEffect(() => {
    if (eventUpdateDataSuccess && success) {
      navigate("/events");
    }
  }, [eventUpdateDataSuccess]);
  console.log(selected);
  return (
    <Layout>
      <Loader isLoading={eventByIdDataLoading || eventUpdateDataLoading} />
      <div className="row">
        <div className="col-12">
          <div className="page-title-box d-sm-flex align-items-center justify-content-between">
            <h4 className="mb-sm-0">Manage Events</h4>
            <div className="page-title-right">
              <ol className="breadcrumb m-0">
                <li className="breadcrumb-item">
                  <a>Manage Events</a>
                </li>
                <li className="breadcrumb-item active">Edit Event</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <form
          //  onSubmit={handleSubmit}
          className="col-lg-12"
        >
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">Edit Event</h5>
            </div>
            <div className="card-body">
              <div className="row gy-3">
                <div className="col-xxl-3 col-lg-4">
                  <div>
                    <label htmlFor="event_name" className="form-label">
                      Event Name
                    </label>
                    <input
                      value={selected?.event_name}
                      type="text"
                      className="form-control"
                      id="event_name"
                      name="event_name"
                      onChange={handleChange}
                      placeholder="Event Name"
                    />
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-6">
                  <div>
                    <label htmlFor="event_slogan" className="form-label">
                      Event Slogan
                    </label>
                    <input
                      value={selected?.event_slogan}
                      type="text"
                      className="form-control"
                      id="event_slogan"
                      name="event_slogan"
                      onChange={handleChange}
                      placeholder="Event Slogan"
                    />
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-2">
                  <div>
                    <label htmlFor="font_color" className="form-label">
                      Font Color
                    </label>
                    <input
                      type="color"
                      value={selected?.font_color}
                      className="form-control"
                      style={{ height: "37px" }}
                      id="font_color"
                      name="font_color"
                      onChange={handleChange}
                      // onChange={(e) => {
                      //   setSelected((prevState) => ({
                      //     ...prevState,
                      //     fontColor: e.target.value,
                      //   }));
                      // }}
                    />
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-3">
                  <div>
                    <label htmlFor="event_date" className="form-label">
                      Event Date
                    </label>
                    <CustomDatePicker
                      handleChange={handleChange}
                      value={selected?.event_date}
                    />
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-3">
                  <div>
                    <label htmlFor="start_time" className="form-label">
                      Start Time
                    </label>
                    <CustomTimePicker
                      handleChange={handleChange}
                      value={selected?.start_time}
                    />
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-3">
                  <div>
                    <label htmlFor="time_zone" className="form-label">
                      Time Zone
                    </label>

                    <TimezoneSelect
                      required
                      value={selected?.time_zone}
                      name="time_zone"
                      id="time_zone"
                      onChange={(e) => {
                        setSelected({
                          ...selected,
                          time_zone: e.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-3">
                  <div>
                    <label htmlFor="location" className="form-label">
                      Event Location
                    </label>

                    <input
                      value={selected?.location}
                      type="text"
                      className="form-control"
                      id="location"
                      name="location"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-5">
                  <div>
                    <label htmlFor="sponsor" className="form-label">
                      Event Sponsor
                    </label>
                    <input
                      value={selected.sponsor}
                      type="text"
                      className="form-control"
                      id="sponsor"
                      name="sponsor"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-5">
                  <div>
                    <label htmlFor="event_type" className="form-label">
                      Event Type
                    </label>
                    <input
                      value={selected?.event_type}
                      type="text"
                      className="form-control"
                      id="event_type"
                      name="event_type"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-2">
                  <label htmlFor="event_round" className="form-label">
                    Rounds/Event Count
                  </label>
                  <div>
                    <div className="input-step step-primary full-width">
                      <button
                        type="button"
                        className="minus"
                        onClick={() =>
                          setSelected({
                            ...selected,
                            event_round: +selected.event_round - 1,
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
                        value={selected?.event_round || 0}
                        onChange={handleChange}
                        defaultValue="0"
                      />
                      <button
                        type="button"
                        className="plus"
                        onClick={() =>
                          setSelected({
                            ...selected,
                            event_round: +selected.event_round + 1,
                          })
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-6">
                  <div>
                    <label htmlFor="event_ticket" className="form-label">
                      Event Ticket
                    </label>
                    <input
                      value={selected.event_ticket}
                      type="text"
                      className="form-control"
                      id="event_ticket"
                      name="event_ticket"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-6">
                  <div>
                    <label htmlFor="ticket_url" className="form-label">
                      Ticket URL
                    </label>
                    <input
                      value={selected.ticket_url}
                      type="text"
                      className="form-control"
                      id="ticket_url"
                      name="ticket_url"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="card-body table-responsive">
              <div className="row gy-3">
                <div className="col-xxl-3 col-md-12">
                  <label htmlFor="basiInput" className="form-label">
                    Players/Teams % Share of Prizes
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={selected?.share_of_prize}
                    placeholder="Share of Prizes %"
                    name="share_of_prize"
                    id="share_of_prize"
                    onChange={handleChange}
                  />
                </div>
                <div className="col-xxl-3 col-md-12">
                  <label htmlFor="basiInput" className="form-label">
                    Players/Team Details
                    <span className="text-danger">*</span>
                  </label>
                  <table
                    id="example"
                    className="table table-bordered dt-responsive  nowrap table-striped align-middle"
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
                      {playerDetails?.length &&
                        playerDetails.map((players, index) => (
                          <tr key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td>
                              <input
                                value={players.name}
                                type="text"
                                className="form-control form-control-sm"
                                name="name"
                                onChange={(e) =>
                                  handleChangePlayerDetails(e, index)
                                }
                              />
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
                              />
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
                              />
                            </td>
                            <td>
                              <CustomImgeUploader
                                handleChangePlayerDetails={
                                  handleChangePlayerDetails
                                }
                                index={index}
                              />
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
                <div className="col-xxl-3 col-md-4">
                  <label htmlFor="bounty_detail_headind" className="form-label">
                    Bounty Details
                    <span className="text-danger">*</span>
                  </label>
                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="bounty_detail"
                      name="bounty_detail"
                      checked={selected?.bounty_detail === "none"}
                      onChange={(e) =>
                        setSelected({
                          ...selected,
                          bounty_detail: e.target.checked ? "none" : null,
                        })
                      }
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
                      checked={selected?.bounty_detail === "bounty"}
                      onChange={(e) =>
                        setSelected({
                          ...selected,
                          bounty_detail: e.target.checked ? "bounty" : null,
                        })
                      }
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
                      checked={selected?.bounty_detail === "pko_bounty"}
                      onChange={(e) =>
                        setSelected({
                          ...selected,
                          bounty_detail: e.target.checked ? "pko_bounty" : null,
                        })
                      }
                    />
                    <label className="form-check-label" htmlFor="formCheck6">
                      PKO Bounty
                    </label>
                  </div>
                </div>
                <div className="col-xxl-3 col-md-8">
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
                          id="bounty_options_stake"
                          name="bounty_options"
                          checked={
                            selected?.bounty_options.percent_of_stake !==
                            undefined
                              ? selected.bounty_options.percent_of_stake
                              : false
                          }
                          onChange={(e) =>
                            setSelected({
                              ...selected,
                              bounty_options: {
                                ...selected.bounty_options,
                                percent_of_stake: e.target.checked,
                                sponsor_added: "",
                                pko_split: "",
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
                          type="number"
                          className="form-control form-control-sm"
                          disabled={!selected.bounty_options.percent_of_stake}
                          value={
                            selected?.bounty_options.percent_of_stake
                              ? selected?.bounty_options.percent_of_stake
                              : ""
                          }
                          onChange={(e) =>
                            setSelected({
                              ...selected,
                              bounty_options: {
                                ...selected.bounty_options,
                                percent_of_stake: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-check form-radio-primary mb-3">
                    <div className="row">
                      <div className="col-6 d-flex align-items-center">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          id="bounty_options_sponsor"
                          name="bounty_options"
                          checked={
                            selected?.bounty_options.sponsor_added !== undefined
                              ? selected.bounty_options.sponsor_added
                              : false
                          }
                          onChange={(e) =>
                            setSelected({
                              ...selected,
                              bounty_options: {
                                ...selected.bounty_options,
                                sponsor_added: e.target.checked,
                                percent_of_stake: "",
                                pko_split: "",
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
                          type="number"
                          className="form-control form-control-sm"
                          disabled={!selected.bounty_options.sponsor_added}
                          value={
                            selected?.bounty_options.sponsor_added
                              ? selected?.bounty_options.sponsor_added
                              : ""
                          }
                          onChange={(e) =>
                            setSelected({
                              ...selected,
                              bounty_options: {
                                ...selected.bounty_options,
                                sponsor_added: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-check form-radio-primary mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="bounty_options_both"
                      name="bounty_options"
                      checked={
                        selected?.bounty_options.percent_of_stake &&
                        selected?.bounty_options.sponsor_added
                      }
                      onChange={(e) =>
                        setSelected({
                          ...selected,
                          bounty_options: {
                            ...selected.bounty_options,
                            percent_of_stake: e.target.checked,
                            sponsor_added: e.target.checked,
                            pko_split: "",
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
                          id="bounty_options_pko"
                          name="bounty_options"
                          checked={selected?.bounty_options.pko_split}
                          onChange={(e) =>
                            setSelected({
                              ...selected,
                              bounty_options: {
                                ...selected.bounty_options,
                                pko_split: e.target.checked,
                                sponsor_added: "",
                                percent_of_stake: "",
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
                          type="number"
                          className="form-control form-control-sm"
                          disabled={!selected.bounty_options.pko_split}
                          value={selected?.bounty_options.pko_split_value || ""}
                          onChange={(e) =>
                            setSelected({
                              ...selected,
                              bounty_options: {
                                ...selected.bounty_options,
                                pko_split_value: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-header" />
              <div className="row gy-3 mt-2">
                <div className="col-xxl-3 col-lg-6">
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
                      {payoutDetails?.length &&
                        payoutDetails.map((payout, index) => (
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
                              />
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
                              />
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
                <div className="col-xxl-3 col-lg-6">
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
                        type="number"
                        className="form-control form-control-sm"
                        name="prize_pool_additional"
                        id="prize_pool_additional_value"
                        onChange={(e) =>
                          setSelected({
                            ...selected,
                            prize_pool_additional: {
                              ...selected.prize_pool_additional,
                              value: e.target.value,
                            },
                          })
                        }
                      />
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
                          checked={selected?.prize_pool_additional?.Direct}
                          onChange={(e) =>
                            setSelected({
                              ...selected,
                              prize_pool_additional: {
                                ...selected.prize_pool_additional,
                                Direct: e.target.checked,
                                per_match: "",
                              },
                            })
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor="prize_pool_additional_direct"
                        >
                          Direct Match
                        </label>
                      </div>
                      <div className="col-6">
                        {/* <input
                          type="text"
                          className="form-control form-control-sm"
                          disabled={!selected?.prize_pool_additional?.Direct}
                        /> */}
                      </div>
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
                            selected?.prize_pool_additional?.per_match
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            setSelected({
                              ...selected,
                              prize_pool_additional: {
                                ...selected.prize_pool_additional,
                                per_match: e.target.checked,
                                Direct: "",
                              },
                            })
                          }
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
                          disabled={!selected?.prize_pool_additional?.per_match}
                          onChange={(e) =>
                            setSelected({
                              ...selected,
                              prize_pool_additional: {
                                ...selected.prize_pool_additional,
                                per_match: e.target.value,
                              },
                            })
                          }
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
                <div className="col-xxl-3 col-lg-2">
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
                          onChange={handleChange}
                        />
                        <ModeEditIcon />
                      </IconButton>
                    </span>
                    <div className="img-thumbnail">
                      <img
                        id="event-banner"
                        src={
                          selected?.image
                            ? selected?.image
                            : "https://placehold.co/150x150"
                        }
                        className="event-banner"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-8">
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
                          onChange={handleChange}
                        />
                        <ModeEditIcon />
                      </IconButton>
                    </span>
                    <div className="img-thumbnail">
                      <img
                        id="event-banner"
                        src={
                          selected?.image1
                            ? selected?.image1
                            : "https://placehold.co/1130x280"
                        }
                        className="event-banner"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-2">
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
                          onChange={handleChange}
                        />
                        <ModeEditIcon />
                      </IconButton>
                    </span>

                    <div className="img-thumbnail">
                      <img
                        id="event-banner"
                        src={
                          selected?.image2
                            ? selected?.image2
                            : "https://placehold.co/1024x1024"
                        }
                        className="event-banner"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-xxl-3 col-lg-12">
                  <label htmlFor="event_headline" className="form-label">
                    Event Headline
                    <span className="text-danger">*</span>
                  </label>{" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Event Headline"
                    id="event_headline"
                    name="event_headline"
                    value={selected?.event_headline}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-xxl-3 col-lg-12">
                  <label htmlFor="event_details" className="form-label">
                    Event Details
                    <span className="text-danger">*</span>
                  </label>{" "}
                  <Editor
                    setEditorHtml={setEditorHtml}
                    editorHtml={editorHtml}
                    value={selected?.event_details}
                  />
                </div>
              </div>

              <div className="row gy-4  pt-3">
                <div className="col-12">
                  <button
                    className="btn btn-sm btn-primary"
                    // type="submit"
                    onClick={handleSubmit}
                  >
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
