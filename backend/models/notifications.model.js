const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const notificationSchema = new Schema({
  title: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

const Notifications = mongoose.model("Notifications", notificationSchema);

module.exports = Notifications;
