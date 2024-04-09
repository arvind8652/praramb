const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const deviceDetailSchema = new Schema({
  name: { type: String, require: true, trim: true },
  describe: { type: String, trim: true },
  adminId: { type: String, require: true, trim: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const deviceDetail = mongoose.model("deviceDetail", deviceDetailSchema);
module.exports = deviceDetail;
