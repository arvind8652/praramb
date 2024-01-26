import * as yup from "yup";

export const customerFormInitialData = {
  firstName: "",
  lastName: "",
  dob: "",
  mobileNo: "",
  email: "",
  role: "",
  startDate: "",
  endDate: "",
  status: "",
  amount: "",
  gender: "",
  comment: "",
};
export const customerFormSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  dob: yup.string().required(),
  mobileNo: yup.string().required(),
  email: yup.string().required(),
  role: yup.string().required(),
  startDate: yup.string().required(),
  endDate: yup.string().required(),
  status: yup.string().required(),
  amount: yup.string().required(),
  gender: yup.string().required(),
  comment: yup.string().required(),
});

export const notificationFormInitialData = {
  title: "",
  type: "",
  description: "",
};
export const notificationFormSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  type: yup.string().required(),
  description: yup.string().required(),
});
