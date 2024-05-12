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
      createdAt: Date.now(),
    });

    newMsg
      .save()
      .then(() =>
        res.json({
          statusMsg: "success",
          data: "message added successfully",
        })
      )
      .catch((err) =>
        res.status(400).json({ statusMsg: "error", data: err.message })
      );
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusMsg: "error", data: "Internal Server Error" });
  }
});

router.route("/getMessages/:custId").get(async (req, res) => {
  const { custId } = req.params;
  console.log("check the customer id--------", custId);
  try {
    const resp = await chatWithAdminData.find({
      // $or: [{ senderId: { $in: custId } }, { receiverId: { $in: custId } }],
      $or: [{ senderId: custId }, { receiverId: custId }],
    });
    res.status(200).json({ statusMsg: "success", data: resp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusMsg: "error", data: "Internal Server Error" });
  }
});

module.exports = router;
