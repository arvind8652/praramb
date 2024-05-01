const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const brandDetailsSchema = new Schema({
  name: { type: String, require: true },
  maxCapacity: { type: Number },
  timing: { type: String, require: true },
  status: { type: String, require: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});
const brandDetails = mongoose.model(
  "brandDetails",
  brandDetailsSchema,
  "brandDetails"
);
module.exports = brandDetails;
