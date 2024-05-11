const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const chatWithAdminSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "senderId",
    require: true,
    trim: true,
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "receiverId",
    require: true,
    trim: true,
  },
  message: { type: String, require: true, trim: true },
  messageRead: { type: Boolean, default: 0, require: true, trim: true },
  status: { type: String, require: true, trim: true },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

const chatWithAdmin = mongoose.model("chatWithAdmin", chatWithAdminSchema);
module.exports = chatWithAdmin;
