import * as Yup from "yup";

const eventSchema = Yup.object().shape({
  event_name: Yup.string().required("Event name is required"),
  event_slogan: Yup.string().required("Event Slogan is required"),
  font_color: Yup.string(),
  event_date: Yup.string().required("Event Date is required"),
  event_genre: Yup.string().required("Event Genre is required"),
  start_time: Yup.string().required("Start Time is required"),
  time_zone: Yup.string().required("Timezone is required"),
  location: Yup.string().required("Event location is required"),
  sponsor: Yup.string().required("Sponsor is required"),
  event_type: Yup.string().required("Event Type is required"),
  event_round: Yup.number("Must be Number").required("Event Round is required"),
  event_ticket: Yup.string().required("Event Ticket is required"),
  ticket_url: Yup.string().required("Ticket URL is required"),
  share_of_prize: Yup.number("Must be Number").required(
    "Share of Prize is required"
  ),
  bounty_detail: Yup.string(),
  bounty_options_values: Yup.object().shape({
    percent_of_stake_value: Yup.boolean(),
    sponsor_added_value: Yup.boolean(),
    pko_split_value: Yup.boolean(),
  }),
  // bounty_options: Yup.object().shape({
  //   percent_of_stake: Yup.string().when(
  //     "bounty_options_values.percent_of_stake_value",
  //     {
  //       is: true,
  //       then: Yup.string().required("Percent of Stake is required"),
  //     }
  //   ),
  //   sponsor_added: Yup.string().when(
  //     "bounty_options_values.sponsor_added_value",
  //     {
  //       is: true,
  //       then: Yup.string().required("Sponsor Added is required"),
  //     }
  //   ),
  //   pko_split: Yup.string().when("bounty_options_values.pko_split_value", {
  //     is: true,
  //     then: Yup.string().required("PKO Split is required"),
  //   }),
  // }),

  bounty_options: Yup.object().shape({
    percent_of_stake: Yup.string(),
    sponsor_added: Yup.string(),
    pko_split: Yup.string(),
  }),

  // .test(
  //   "at-least-one-field-filled",
  //   "At least one field must be filled",
  //   function (value) {
  //     return (
  //       !!value.percent_of_stake || !!value.sponsor_added || !!value.pko_split
  //     );
  //   }
  // )
  event_round: Yup.number().required("Event Round is required"),
  event_headline: Yup.string().required("Event Headline is required"),
  event_details: Yup.string().required("Event Details is required"),
  image: Yup.string().required("Event Thumbnail is required"),
  image1: Yup.string().required("Event Banner is required"),
  image2: Yup.string().required("Event Image is required"),
  prize_pool_additional: Yup.object().shape({
    value: Yup.string(),
    // .required("Prize Pool Additional Funds is required"),
    Direct: Yup.boolean(),
    per_match: Yup.number(),
  }),
  playerDetails: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Player Name is required"),
      bio: Yup.string().required("Player Bio is required"),
      twitch_link: Yup.string().required("Player Twitch Link is required"),
      image_path: Yup.string().required("Player Image is required"),
    })
  ),
  // payoutDetails: Yup.array().of(
  //   Yup.object().shape({
  //     place: Yup.string().required("Place is required"),
  //     percentage: Yup.string().required("Percentage is required"),
  //   })
  // ),

  payoutDetails: Yup.array().of(
    Yup.array().of(
      Yup.object().shape({
        place: Yup.string().required("Place is required"),
        percentage: Yup.string().required("Percentage is required"),
        fromPrizePool: Yup.string().required("From Prize Pool is required"),
        addedFunds: Yup.string().required("Added Funds is required"),
      })
    )
  ),
  //   playerDetails: Yup.array().of(
  //     Yup.object().shape({
  //       name: Yup.string().required("Player Name is required"),
  //       bio: Yup.string().required("Player Bio is required"),
  //       twitch_link: Yup.string().required("Player Twitch Link is required"),
  //       image_path: Yup.string().required("Player Image is required"),
  //     })
  //   ),
});

export { eventSchema };
