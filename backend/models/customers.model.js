const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const customerSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  dob: { type: String, required: true, trim: true },
  mobileNo: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  startDate: { type: String, required: true, trim: true },
  endDate: { type: String, required: true, trim: true },
  status: { type: String, required: true, trim: true },
  amount: { type: Number, required: true, trim: true },
  gender: { type: String, required: true, trim: true },
  comment: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const Customers = mongoose.model("Customers", customerSchema);

module.exports = Customers;
