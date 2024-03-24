const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paymentDetailSchema = new Schema({
  custId: { type: String, require: true, trim: true },
  adminId: { type: String, require: true, trim: true },
  payingAmount: { type: String, require: true, trim: true },
  mode: { type: String, require: true, trim: true },
  transactionId: { type: String, trim: true },
  status: { type: String, default: "active" },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const paymentDetail = mongoose.model("paymentDetail", paymentDetailSchema);
module.exports = paymentDetail;
