import * as Yup from "yup";

const memoSchema = Yup.object().shape({
  recipient: Yup.string().required("Recipient name is required"),
  mobile_no: Yup.string().required("Mobile No. name is required"),
  date: Yup.string().required("Date is required"),
  details_of_box: Yup.array().of(
    Yup.object().shape({
      trade_mark: Yup.string().required("Trade is required"),
      box: Yup.number("should be number").required("Box No. is required"),
      receiver: Yup.string().required("Receiver is required"),
    })
  ),
  details_of_quantity: Yup.array().of(
    Yup.object().shape({
      type: Yup.string().required("Type is required"),
      weight: Yup.string().required("Weight No. is required"),
      quantity: Yup.string().required("Quantity is required"),
      per_boxes_rate: Yup.string().required("Per boxes Rate is required"),
      fare_rate: Yup.string().required("Fare Rate is required"),
    })
  ),
  total_box: Yup.number().required("Total Box is required"),
  // total_fare: Yup.number().required("Total Fare is required"),
  // advance_amount: Yup.number().required("Advance Amount is required"),
  total_fare: Yup.number()
    .required("Total Fare is required")
    .positive("Total Fare must be a positive number"),
  advance_amount: Yup.number()
    .required("Advance Amount is required")
    .positive("Advance Amount must be a positive number")
    .test(
      "is-less-than-total-fare",
      "Advance Amount cannot be greater than Total Fare",
      function (value) {
        const { total_fare } = this.parent;
        return value <= total_fare;
      }
    ),
  balance_amount: Yup.number().required("Balance Amount is required"),
  reward: Yup.object().shape({
    vehicle_departure_date: Yup.string().required(
      "Vehicle Departure Date Box is required"
    ),
    departure_time: Yup.string().required("Departure Time is required"),
    vehicle_reaching_date: Yup.string().required(
      "Vehicle Reaching Date is required"
    ),
    reaching_time: Yup.string().required("Reaching Time is required"),
    driver_reaches_within: Yup.string().required(
      "Driver Reaches Within is required"
    ),
    reward_amount: Yup.number().required("Reward Amount is required"),
    reword_amount_word: Yup.string().required("Reword Amount Word is required"),
  }),
  vehicle_owner_name: Yup.string().required("Vehicle Owner Name is required"),
  vehicle_owner_address: Yup.string().required(
    "Vehicle Owner Address is required"
  ),
  vehicle_owner_phone: Yup.string().required("Vehicle Owner Phone required"),
  vehicle_driver_name: Yup.string().required("Vehicle Driver Name is required"),
  vehicle_driver_address: Yup.string().required(
    "Vehicle Driver Address is required"
  ),
  vehicle_driver_phone: Yup.string().required(
    "Vehicle Driver Phone is required"
  ),
  vehicle_number: Yup.string().required("Vehicle Number is required"),
  attached_transport: Yup.string().required("Attached Transport is required"),
  attached_transport_mobile_number: Yup.string().required(
    "Attached Transport Mobile_number is required"
  ),
  license_number: Yup.string().required("License Number is required"),
});

export { memoSchema };
