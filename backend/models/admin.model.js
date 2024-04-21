const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const adminSchema = new Schema({
  brandId: {
    type: Schema.Types.ObjectId,
    ref: "brandId",
    require: true,
    trim: true,
  },
  name: { type: String, required: true, trim: true },
  mobileNo: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  role: { type: String, required: true, trim: true },
  experience: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const admin = mongoose.model("admin", adminSchema);

module.exports = admin;
