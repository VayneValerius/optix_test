import * as Yup from "yup";

export default Yup.object().shape({
  review: Yup.string()
    .max(100, "Must be less than 100 characters")
    .required("Required"),
});
