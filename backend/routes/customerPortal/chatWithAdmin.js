const mongoose = require("mongoose");
const router = require("express").Router();
const chatWithAdminData = require("../../models/customerPortal/chatWithAdmin.model");

router.route("/add").post(async (req, res) => {
  const { senderId, receiverId, message, messageRead } = req.body;
  try {
    const newMsg = new chatWithAdminData({
      senderId,
      receiverId,
      message,
      messageRead,
    });

    newMsg
      .save()
      .then(() =>
        res.json({
          statusMsg: "success",
          data: "message add ed successfully",
        })
      )
      .catch((err) =>
        res.status(400).json({ statusMsg: "error", data: err.message })
      );
  } catch (error) {}
});
