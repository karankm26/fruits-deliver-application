import * as Yup from "yup";

const registrationSchema = Yup.object().shape({
  image: Yup.string().required("First Name is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phoneNo: Yup.string()
    .min(5, "Mobile no. is required")
    .required("Mobile no. is required"),
  password: Yup.string()
    .min(8, "Password is too short - should be 8 characters minimum.")
    .max(20, "Password length must be between 8 to 20 characters")
    .matches(/[0-9]/, "Password should contain atleast one number")
    .matches(/[a-z]/, "Password should contain atleast one lowercase character")
    .matches(/[A-Z]/, "Password should contain atleast one uppercase character")
    .matches(/[^\w]/, "Password should contain atleast one special character")
    .required("Password is required"),
  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Confirm Passwords must match")
    .required("Confirm Password is required"),
});
export { registrationSchema };
