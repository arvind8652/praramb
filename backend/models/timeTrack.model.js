const mongoose = require("mongoose");
const { string } = require("yup");
const Schema = mongoose.Schema;
const timeTrackSchema = new Schema({
  customerId: { type: String, require: true, trim: true },
  deviceId: { type: String, require: true, trim: true },
  describe: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const timeTrack = mongoose.model("timeTrack", timeTrackSchema);
module.exports = timeTrack;
