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
import {
  UpdateEvents,
  activeSubscriptionUsers,
  fetchEventById,
  fetchEvents,
} from "../../features/apiSlice";
import { useFormik } from "formik";
import { eventSchema } from "../../schema/eventFormSchema";
import { useNavigate, useParams } from "react-router-dom";
import { getOrdinal } from "../../utils/getOrdinal";
import { snack } from "../../utils/snack";

const emptyData = {
  event_name: "",
  event_slogan: "",
  event_genre: "",
  font_color: "",
  event_date: null,
  start_time: null,
  time_zone: "America/Los_Angeles",
  location: "",
  sponsor: "",
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
  payoutDetails: [],
  playerDetails: [
    {
      name: "",
      bio: "",
      twitch_link: "",
      // image_path: "",
      email: "",
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

export default function EditEvent() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editorHtml, setEditorHtml] = useState("");
  const [refundPlayer, setRefundPlayer] = useState([]);
  const dispatch = useDispatch();
  const {
    eventUpdateDataLoading,
    eventUpdateDataSuccess,
    eventByIdData,
    eventByIdDataLoading,
    activeSubscriptionUsersData,
  } = useSelector((state) => state.api);
  const [success, setSuccess] = useState(false);
  const [reConvertLinkToBase64Image, setReConvertLinkToBase64Image] =
    useState(true);
  const [subscribedPlayer, setSubscribedPlayer] = useState([]);

  useEffect(() => {
    if (id) dispatch(fetchEventById(id));
    dispatch(activeSubscriptionUsers());
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchEvents({ search: "", limit: 10, currentPage: 1 }));
  }, [dispatch, eventUpdateDataSuccess]);

  const formik = useFormik({
    initialValues: { ...emptyData },
    validationSchema: eventSchema,
    onSubmit: () => {
      const value = {
        ...formik.values,
        playerDetails: reConvertLinkToBase64Image,
      };

      handleSubmit(value);
    },
  });

  useEffect(() => {
    if (Object.keys(eventByIdData).length) {
      formik.setValues({
        ...eventByIdData,
        playerDetails: eventByIdData?.players_details,
      });
    }
  }, [eventByIdData]);

  useEffect(() => {
    if (activeSubscriptionUsersData?.Users?.length) {
      const alreadyInPlayer = activeSubscriptionUsersData.Users.filter((item) =>
        formik.values.playerDetails.some((item2) => item2.email === item.email)
      );
      setSubscribedPlayer(alreadyInPlayer);
    }
  }, [activeSubscriptionUsersData, formik.values.playerDetails]);
  // console.log(eventByIdData);

  const handleSubmit = (value) => {
    const { playerDetails, ...restOfValue } = value;
    const filteredData = playerDetails.reduce(
      (acc, item, index) => {
        acc.players_id.push(index + 1);
        acc.user_names.push(item.name);
        acc.user_bios.push(item.bio);
        acc.twitch_links.push(item.twitch_link);
        acc.base64_images.push(item.image_path);
        acc.players_stack.push(item.players_stack);
        acc.email.push(item.email);
        acc.player_status.push(1);

        return acc;
      },
      {
        user_names: [],
        user_bios: [],
        twitch_links: [],
        base64_images: [],
        players_stack: [],
        players_id: [],
        email: [],
        player_status: [],
      }
    );
    const dataWrapper = {
      ...restOfValue,
      ...filteredData,
      number_of_players: playerDetails.length,
      places_paid: formik.values.payoutDetails.length,
      refundPlayer,
    };
    // console.log(dataWrapper, "dataWrapperdataWrapper");
    dispatch(UpdateEvents({ body: dataWrapper, id }));
    setSuccess(true);
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

  function toDataURL(url) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        var reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    });
  }
  // const handleChangePayoutDetails = async (e, index) => {
  //   const {name, value} = e.target;
  //   const updatedInputs = [...formik.values.payoutDetails];
  //   updatedInputs[index] = {
  //     ...updatedInputs[index],
  //     [name]: value,
  //     place: (index + 1).toString(),
  //   };
  //   formik.setValues({...formik.values, payoutDetails: updatedInputs});
  // };

  // const addPayout = () => {
  //   formik.setValues((prevValues) => ({
  //     ...prevValues,
  //     payoutDetails: [...prevValues.payoutDetails, {place: "", percentage: ""}],
  //   }));
  // };

  // const removePayout = (index) => {
  //   formik.setValues((prevValues) => ({
  //     ...prevValues,
  //     payoutDetails: [
  //       ...prevValues.payoutDetails.slice(0, index),
  //       ...prevValues.payoutDetails.slice(index + 1),
  //     ],
  //   }));
  // };

  const handleInputChange = (e, roundIndex, fieldIndex, fieldName) => {
    const newPayoutDetails = [...formik.values.payoutDetails];
    newPayoutDetails[roundIndex][fieldIndex][fieldName] = e.target.value;
    newPayoutDetails[roundIndex][fieldIndex]["place"] = (
      fieldIndex + 1
    ).toString();
    formik.setFieldValue("payoutDetails", newPayoutDetails);
  };

  // const handleAddField = (roundIndex, round) => {
  //   const playerLength = formik.values.playerDetails.length;
  //   if (playerLength <= round) {
  //     snack.error("Not enough players");
  //     return;
  //   }
  //   const newPayoutDetails = [...formik.values.payoutDetails];
  //   newPayoutDetails[roundIndex].push({
  //     place: "",
  //     percentage: "",
  //     fromPrizePool:
  //       formik.values.payoutDetails[roundIndex][0].fromPrizePool ?? "",
  //     addedFunds: formik.values.payoutDetails[roundIndex][0].addedFunds ?? "",
  //   });
  //   formik.setFieldValue("payoutDetails", newPayoutDetails);
  // };

  const handleAddField = (roundIndex, round) => {
    const playerLength = formik.values.playerDetails.length;
    if (playerLength <= round) {
      snack.error("Not enough players");
      return;
    }

    const payoutDetails = formik.values.payoutDetails.slice(); // Ensure a copy of the array is made
    if (!Array.isArray(payoutDetails[roundIndex])) {
      payoutDetails[roundIndex] = []; // Initialize if not exists
    }

    const newField = {
      place: "",
      percentage: "",
      fromPrizePool: payoutDetails[roundIndex][0]?.fromPrizePool ?? "",
      addedFunds: payoutDetails[roundIndex][0]?.addedFunds ?? "",
    };

    payoutDetails[roundIndex] = [...payoutDetails[roundIndex], newField];

    formik.setFieldValue("payoutDetails", payoutDetails);
  };

  const handleRemoveField = (roundIndex, fieldIndex) => {
    const newPayoutDetails = [...formik.values.payoutDetails];
    newPayoutDetails[roundIndex].splice(fieldIndex, 1);
    formik.setFieldValue("payoutDetails", newPayoutDetails);
  };

  const handleInputFundsChange = (
    e,
    roundIndex,
    fieldName,
    excludeFieldName
  ) => {
    const newPayoutDetails = [...formik.values.payoutDetails];
    const value = e.target.value;

    newPayoutDetails[roundIndex] = newPayoutDetails[roundIndex].map((item) => {
      return { ...item, [fieldName]: value, [excludeFieldName]: "" };
    });

    formik.setFieldValue("payoutDetails", newPayoutDetails);
  };

  // useEffect(() => {
  //   if (
  //     formik.values.payoutDetails.length &&
  //     formik.values.playerDetails.length
  //   ) {
  //     // debugger;
  //     const payOuts = formik.values.payoutDetails;
  //     const playerLength = formik.values.playerDetails.length;
  //     payOuts.map((payout) => {
  //       while (payout.length > playerLength) {
  //         payout.pop();
  //       }
  //       return payout;
  //     });
  //   }
  // }, [formik.values.playerDetails?.length, formik.values.payoutDetails]);

  useEffect(() => {
    const { payoutDetails, playerDetails } = formik.values;
    if (
      payoutDetails.length &&
      playerDetails.length &&
      (formik.values.payoutDetails.length !==
        formik.initialValues.payoutDetails.length ||
        formik.values.playerDetails.length !==
          formik.initialValues.playerDetails.length)
    ) {
      const playerLength = playerDetails.length;
      const newPayoutDetails = payoutDetails.map((payout) =>
        payout.length > playerLength ? payout.slice(0, playerLength) : payout
      );
      formik.setFieldValue("payoutDetails", newPayoutDetails);
    }
  }, [formik.values.payoutDetails.length, formik.values.playerDetails.length]);

  const handleChangePlayerDetails = async (e, index) => {
    // console.log(e.target);
    const { value } = e.target;
    const updatedInputs = [...formik.values.playerDetails];
    const findUser = activeSubscriptionUsersData.Users.find(
      (user) => user.fname + " " + user.lname === value
    );
    const imageConvert = findUser && (await toDataURL(findUser.image));
    updatedInputs[index] = {
      ...updatedInputs[index],
      bio: findUser?.bio ?? "",
      twitch_link: findUser?.twitch_link ?? "",
      image_path: imageConvert ?? "",
      name: findUser?.fname + " " + findUser?.lname ?? "",
      email: findUser?.email ?? "",
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
          email: "",
        },
      ],
    }));
  };

  const removePlayer = (index, playerId) => {
    if (playerId) setRefundPlayer((prev) => [...prev, playerId]);
    formik.setValues((prevValues) => ({
      ...prevValues,
      playerDetails: [
        ...prevValues.playerDetails.slice(0, index),
        ...prevValues.playerDetails.slice(index + 1),
      ],
    }));
  };

  useEffect(() => {
    if (eventUpdateDataSuccess && success) {
      navigate("/events");
    }
  }, [eventUpdateDataSuccess, success]);

  useEffect(() => {
    const fetchImage = async () => {
      const playerDetails = formik?.values?.playerDetails;
      if (playerDetails && Array.isArray(playerDetails)) {
        try {
          const reConvertLinkToBase64 = await Promise.all(
            playerDetails.map(async (item) => {
              if (item.image_path && item.image_path.startsWith("http")) {
                const image_path = await toDataURL(item.image_path);
                return { ...item, image_path };
              } else {
                return { ...item, image_path: item.image_path };
              }
            })
          );
          setReConvertLinkToBase64Image(reConvertLinkToBase64);
        } catch (error) {
          console.error("Error fetching images:", error);
        }
      }
    };

    fetchImage();
  }, [formik?.values?.playerDetails]);

  useEffect(() => {
    if (formik.values.event_round && formik.values.payoutDetails) {
      console.log("///////////////");
      const newRounds = parseInt(formik.values.event_round);
      const updatedPayoutDetails = Array.from(
        { length: newRounds },
        (_, roundIndex) => {
          const existingRound = formik.values.payoutDetails[roundIndex] || [
            { place: "", percentage: "", fromPrizePool: "", addedFunds: "" },
          ];
          return existingRound.map((detail) => ({ ...detail }));
        }
      );
      formik.setFieldValue("payoutDetails", updatedPayoutDetails);
    }
  }, [formik.values.event_round]);

  // console.log(formik.errors);
  // console.log(formik.touched);
  console.log(formik.values);
  // useEffect(() => {
  //   if (activeSubscriptionUsersData) {
  //     const filtered = activeSubscriptionUsersData.Users.map((subs) => {
  //       return {...subs, name: subs.fname + " " + subs.lname};
  //     });
  //     console.log("ss", filtered);
  //   }
  // }, [activeSubscriptionUsersData]);

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
        <form onSubmit={formik.handleSubmit} className="col-lg-12">
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
                      value={formik?.values?.time_zone ?? "America/Los_Angeles"}
                      onChange={(e) => {
                        if (e && e?.value) {
                          formik.handleChange({
                            target: {
                              name: "time_zone",
                              value: e?.value,
                            },
                          });
                        }
                      }}
                      onBlur={() =>
                        formik.handleBlur({ target: { name: "time_zone" } })
                      }
                    />
                  </div>
                  <div
                    className={`invalid-feedback ${
                      formik.touched?.time_zone &&
                      formik.errors?.time_zone &&
                      "d-block"
                    }`}
                  >
                    {formik.errors?.time_zone}
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
                      type="text"
                      className="form-control"
                      id="sponsor"
                      name="sponsor"
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
                      type="text"
                      className="form-control"
                      id="event_type"
                      name="event_type"
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
                        // defaultValue="0"
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
                      type="text"
                      className="form-control"
                      id="event_ticket"
                      name="event_ticket"
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
                <div className=" col-lg-12">
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
                        formik?.values?.playerDetails?.map((players, index) => (
                          <tr key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td>
                              {/* <input
                                value={players.name}
                                type="text"
                                className="form-control form-control-sm"
                                name="name"
                                id="name"
                                onChange={(e) =>
                                  handleChangePlayerDetails(e, index)
                                }
                                onBlur={formik.handleBlur}
                              /> */}
                              <select
                                className="form-select form-select-sm"
                                name="name"
                                id={`name_${index}`}
                                value={players.name}
                                onChange={(e) =>
                                  handleChangePlayerDetails(e, index)
                                }
                              >
                                {/* {console.log(players.name)} */}
                                <option value={""} selected disabled>
                                  Select
                                </option>
                                {activeSubscriptionUsersData?.Users?.length ? (
                                  activeSubscriptionUsersData?.Users?.map(
                                    (subs) => ({
                                      ...subs,
                                      name: subs.fname + " " + subs.lname,
                                    })
                                  ).map((item, i) => (
                                    <option
                                      key={i}
                                      value={item.name}
                                      disabled={
                                        subscribedPlayer.length &&
                                        subscribedPlayer.find(
                                          (i) => i.email === item.email
                                        )
                                      }
                                    >
                                      {item?.name}
                                    </option>
                                  ))
                                ) : (
                                  <option disabled>No Player Found</option>
                                )}
                              </select>
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
                                // onChange={(e) =>
                                //   handleChangePlayerDetails(e, index)
                                // }
                                // onBlur={formik.handleBlur}
                                readOnly
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
                                // onChange={(e) =>
                                //   handleChangePlayerDetails(e, index)
                                // }
                                // onBlur={formik.handleBlur}
                                readOnly
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
                            <td className="text-center">
                              {/* <CustomImgeUploader
                                handleChangePlayerDetails={
                                  handleChangePlayerDetails
                                }
                                index={index}
                                formik={formik}
                                value={players?.image_path}
                              /> */}
                              {players?.image_path ? (
                                <img
                                  src={players?.image_path}
                                  alt={players.name}
                                  width="100px"
                                  className="rounded upload-image"
                                />
                              ) : (
                                "Player Image"
                              )}
                              {/* <div
                                className={`invalid-feedback text-center ${
                                  formik.touched?.playerDetails?.[index]
                                    ?.image_path &&
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
                                  onClick={() =>
                                    removePlayer(index, players?.id)
                                  }
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
                              ?.percent_of_stake_value ||
                            formik.values.bounty_options?.percent_of_stake
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
                        />
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
                            !formik.values.bounty_options_values
                              ?.pko_split_value
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
                      </div>{" "}
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
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              {formik.values.payoutDetails.length ? (
                formik.values.payoutDetails.map((round, roundIndex) => (
                  <>
                    {roundIndex !== 0 && (
                      <div className="card-header p-0 mt-3" />
                    )}
                    <h5 className="card-title  mt-4">
                      Round {roundIndex + 1} Prize Pool Payouts{" "}
                      <span className="text-danger">*</span>
                    </h5>
                    <div className="row gy-3 mt-2">
                      <div className=" col-lg-6">
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
                              <th className="text-center">
                                Percentage of Prize Pool
                              </th>

                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {round.length &&
                              round.map((payout, payoutIndex) => (
                                <tr key={payoutIndex}>
                                  <td className="text-center">
                                    {getOrdinal(payoutIndex + 1)}
                                  </td>

                                  <td>
                                    <input
                                      type="number"
                                      className="form-control form-control-sm"
                                      name="percentage"
                                      value={payout?.percentage}
                                      onChange={(e) =>
                                        handleInputChange(
                                          e,
                                          roundIndex,
                                          payoutIndex,
                                          "percentage"
                                        )
                                      }
                                      // onBlur={formik.handleBlur}
                                    />
                                    <div
                                      className={`invalid-feedback ${
                                        formik.errors?.payoutDetails?.[
                                          roundIndex
                                        ]?.[payoutIndex]?.percentage &&
                                        formik.touched.payoutDetails?.[
                                          roundIndex
                                        ]?.[payoutIndex]?.percentage &&
                                        "d-block"
                                      }`}
                                    >
                                      {
                                        formik?.errors?.payoutDetails?.[
                                          roundIndex
                                        ]?.[payoutIndex]?.percentage
                                      }
                                    </div>
                                  </td>

                                  {payoutIndex !== 0 ? (
                                    <td className="p-0 m-0 td-table px-1">
                                      <button
                                        className="btn btn-sm btn-danger"
                                        style={{ background: "#dc3545" }}
                                        type="button"
                                        onClick={() =>
                                          handleRemoveField(
                                            roundIndex,
                                            payoutIndex
                                          )
                                        }
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
                            onClick={() =>
                              handleAddField(roundIndex, round.length)
                            }
                          >
                            <i className="ri-add-line" />
                          </button>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="row">
                          <div className="col-6">
                            {" "}
                            <div className="form-check mb-3">
                              <input
                                className="form-check-input"
                                type="radio"
                                id="bounty_detail"
                                name="bounty_detail"
                                checked={
                                  formik.values.bounty_detail === "pko_bounty"
                                }
                                onChange={(e) => {
                                  formik.handleChange({
                                    target: {
                                      name: e.target.name,
                                      value: e.target.checked
                                        ? "pko_bounty"
                                        : null,
                                    },
                                  });
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="formCheck6"
                              >
                                From Prize Pool
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="% of Prize Pool"
                                value={round[0].fromPrizePool}
                                onChange={(e) =>
                                  handleInputFundsChange(
                                    e,
                                    roundIndex,
                                    "fromPrizePool",
                                    "addedFunds"
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            {" "}
                            <div className="form-check mb-3">
                              <input
                                className="form-check-input"
                                type="radio"
                                id="bounty_detail"
                                name="bounty_detail"
                                checked={
                                  formik.values.bounty_detail === "pko_bounty"
                                }
                                onChange={(e) => {
                                  formik.handleChange({
                                    target: {
                                      name: e.target.name,
                                      value: e.target.checked
                                        ? "pko_bounty"
                                        : null,
                                    },
                                  });
                                }}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="formCheck6"
                              >
                                Added Funds
                              </label>{" "}
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Fixed Price"
                                value={round[0].addedFunds}
                                onChange={(e) =>
                                  handleInputFundsChange(
                                    e,
                                    roundIndex,
                                    "addedFunds",
                                    "fromPrizePool"
                                  )
                                }
                              />
                            </div>
                          </div>
                        </div>
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

          <div className="card">
            <div className="card-body">
              <div className="row gy-3">
                <div className="col-lg-2">
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
                <div className="col-lg-8">
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
                <div className="col-lg-2">
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
                <div className="col-lg-12">
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
                <div className="col-lg-12">
                  <label htmlFor="event_details" className="form-label">
                    Event Details
                    <span className="text-danger">*</span>
                  </label>
                  <Editor
                    setEditorHtml={setEditorHtml}
                    editorHtml={editorHtml}
                    formik={formik}
                    value={formik?.values?.event_details}
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
