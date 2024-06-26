import * as yup from "yup";
// -------------------------start for customer detail-----------------------
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
// -------------------------end for customer detail-----------------------

// ------------------------start for notification detail----------------------
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
// ------------------------end for notification detail----------------------

// ------------------------start for login detail----------------------
export const loginFormInitialData = {
  mobileNo: "",
  password: "",
};
export const loginFormSchema = yup.object().shape({
  mobileNo: yup.string().required(),
  password: yup.string().required(),
});
// ------------------------ end for login detail----------------------
// ------------------------start for payment detail-------------------
export const paymentFormInitialData = {
  payingAmount: "",
  mode: "",
  transactionId: "",
};
export const paymentFormSchema = yup.object().shape({
  payingAmount: yup.string().required(),
  mode: yup.string().required(),
  transactionId: yup.string().required(),
});
// ------------------------end for payment detail-------------------

// ------------------------start for chat detail----------------------
export const chatInitialData = {
  chat: "",
};
export const chatSchema = yup.object().shape({
  chat: yup.string().required("Message is required"),
});
// ------------------------end for chat detail----------------------
