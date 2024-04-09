const mongoose = require("mongoose");
const { string } = require("yup");
const Schema = mongoose.Schema;
const attendanceSchema = new Schema({
  custId: {
    type: Schema.Types.ObjectId,
    ref: "customer",
    require: true,
    trim: true,
  },
  deviceId_IN: { type: Schema.Types.ObjectId, ref: "deviceId_IN", trim: true },
  in_time: { type: Date },
  deviceId_OUT: {
    type: Schema.Types.ObjectId,
    ref: "deviceId_OUT",
    trim: true,
  },
  out_time: { type: Date },
  status: { type: String, require: true, trim: true },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

const attendance = mongoose.model("attendance", attendanceSchema);
module.exports = attendance;
