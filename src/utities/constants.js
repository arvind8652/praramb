export const CUSTOMER_FORM = "customer_Form";
export const NOTIFICATION_FORM = "notification_Form";
export const CUSTOMER_VIEW = "customer_View";
export const CUSTOMER_EDIT = "customer_Edit";
export const CUSTOMER_DELETE = "customer_Delete";
export const NOTIFICATION_VIEW = "notification_view";
export const NOTIFICATION_EDIT = "notification_Edit";
export const NOTIFICATION_DELETE = "notification_Delete";
export const LOGIN_FORM = "login_Form";

// export const BASEURL = "http://localhost:5001/";   //it is used for mockoon api
// export const BASEURL = "http://localhost:5000/"; // it is used for mongodb database
export const BASEURL = "http://192.168.0.109:5000/"; // it is used for same network testing

export const atomNameConst = {
  NOTIFICATIONS: "notifications",
  CUSTOMERS: "customers",
  NOTIFICATIONSINGLEDATA: "notificationSingleData",
  CUSTOMERSINGLEDATA: "customerSingleData",
  SUMMARY: "summary",
};

export const STATUS_OPTION = [
  { label: "Active", value: "active" },
  { label: "In Active", value: "inActive" },
];

export const ROLE_OPTION = [
  { label: "User", value: "user" },
  { label: "Admin", value: "admin" },
  { label: "Trainer", value: "trainer" },
];

export const GENDER_OPTION = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];
