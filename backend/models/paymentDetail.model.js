const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const paymentDetailSchema = new Schema({
  custId: {
    type: Schema.Types.ObjectId,
    ref: "customer",
    require: true,
    trim: true,
  },
  adminId: {
    type: Schema.Types.ObjectId,
    ref: "admin",
    require: true,
    trim: true,
  },
  payingAmount: { type: Number, require: true, trim: true },
  mode: { type: String, require: true, trim: true },
  transactionId: { type: String, trim: true },
  status: { type: String, default: "active" },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const paymentDetail = mongoose.model("paymentDetail", paymentDetailSchema);
module.exports = paymentDetail;
