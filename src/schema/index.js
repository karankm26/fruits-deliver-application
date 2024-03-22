import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const registrationSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  // password: Yup.string().required("Password is required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

const loginStaffSchema = Yup.object().shape({
  username: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const subscriptionSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  price: Yup.string().required("Price is required"),
  duration: Yup.string().required("Duration is required"),
  features: Yup.array()
    .of(
      Yup.object().shape({
        label: Yup.string().required("Player Name is required"),
        value: Yup.string().required("Player Bio is required"),
      })
    )
    .min(1, "At least one feature must be filled"),

  planType: Yup.string().required("Plan Type is required"),
});

export {
  loginSchema,
  registrationSchema,
  loginStaffSchema,
  subscriptionSchema,
};
