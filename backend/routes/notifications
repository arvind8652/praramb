const router = require("express").Router();
let notificationData = require("../models/notifications.model");

router.route("/").get(async (req, res) => {
  try {
    const resp = await notificationData.find();
    res.status(200).json({ statusMsg: "success", data: resp });
  } catch (err) {
    res.status(400).json({ statusMsg: "error", data: err.message });
  }
});

router.route("/add").post((req, res) => {
  const title = req.body.title;
  const type = req.body.type;
  const description = req.body.description;

  const newNotification = new notificationData({
    title,
    type,
    description,
  });

  newNotification
    .save()
    .then(() =>
      res.json({
        statusMsg: "success",
        data: "notification added successfully",
      })
    )
    .catch((err) =>
      res.status(400).json({ statusMsg: "error", data: err.message })
    );
});

router.route("/edit/:id").put(async (req, res) => {
  try {
    const { id } = req.params;
    const updateNotification = await notificationData.findByIdAndUpdate(
      id,
      // req.body,
      {
        title: req.body.title,
        type: req.body.type,
        description: req.body.description,
        updatedAt: Date.now(),
      }
      // { new: true } // Return the modified document
    );

    if (!updateNotification) {
      return res
        .status(404)
        .json({ statusMsg: "error", data: "notification not found" });
    }

    res.json({
      statusMsg: "success",
      data: updateNotification,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusMsg: "error", data: "Internal Server Error" });
  }
});

router.route("/delete/:id").delete(async (req, res) => {
  try {
    const { id } = req.params;
    const deleteNotification = await notificationData.findByIdAndDelete(id);

    if (!deleteNotification) {
      return res
        .status(404)
        .json({ statusMsg: "error", data: "Notification not found" });
    }
    res.json({
      statusMsg: "success",
      data: "Notification deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusMsg: "error", data: "Internal Server Error" });
  }
});

module.exports = router;
