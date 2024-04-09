const router = require("express").Router();
const attendanceData = require("../../models/customerPortal/attendance.model");

router.route("/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await attendanceData
      .find({ custId: id })
      .sort({ createdAt: -1 });
    res.status(200).json({ statusMsg: "success", data: resp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusMsg: "error", data: "Internal Server Error" });
  }
});

router.route("/add").post(async (req, res) => {
  const { custId, deviceData } = req.body;

  const splitData = deviceData.split("|");
  const deviceId = splitData[0];
  const devicePurpose = splitData[1]?.toLowerCase();

  if (devicePurpose === "out") {
    //this will call when customer exit
    try {
      const updateAttendance = await attendanceData.findOneAndUpdate(
        { $and: [{ custId: custId }, { status: "active" }] },
        {
          deviceId_OUT: deviceId,
          out_time: Date.now(),
          status: "inActive",
          updatedAt: Date.now(),
        }
      );
      if (!updateAttendance) {
        return res
          .status(400)
          .json({ statusMsg: "error", data: "customer attendance not found" });
      }
      res.json({
        statusMsg: "success",
        data: updateAttendance,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ statusMsg: "error", data: "Internal Server Error" });
    }
  } else {
    //this will call when customer entered
    const checkAttendance = await attendanceData.find({
      $and: [{ custId: custId }, { status: "active" }],
    });
    console.log("checkAttendance---------", checkAttendance);
    if (checkAttendance?.length > 0) {
      return res
        .status(400)
        .json({ statusMsg: "error", data: "customer already inside" });
    }

    try {
      const newAttendance = new attendanceData({
        custId,
        deviceId_IN: deviceId,
        in_time: Date.now(),
        status: "active",
        createdAt: Date.now(),
      });
      newAttendance
        .save()
        .then(() =>
          res.json({ statusMsg: "success", data: "customer entered" })
        )
        .catch((err) =>
          res.status(400).json({ statusMsg: "error", data: err.message })
        );
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ statusMsg: "error", data: "Internal Server Error" });
    }
  }
});

module.exports = router;
