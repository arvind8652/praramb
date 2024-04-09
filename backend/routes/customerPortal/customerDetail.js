const router = require("express").Router();
const attendanceData = require("../../models/customerPortal/attendance.model");
const customerData = require("../../models/customers.model");

router.route("/login").post(async (req, res) => {
  const { mobileNo } = req.body;
  try {
    const user = await customerData.findOne(
      { mobileNo },
      { firstName: 1, lastName: 1 }
    );
    //   .select("-password -createdAt -updatedAt -__v");
    if (user) {
      res.status(200).json({ statusMsg: "success", data: user });
    } else {
      res.status(401).json({ statusMsg: "error", message: "Invalid mobileNo" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ statusMsg: "error", message: "Internal Server Error" });
  }
});

router.route("/summary/:custId").get(async (req, res) => {
  // const { custId } = req.body;
  const { custId } = req.params;
  try {
    const lastDate = await customerData.find(
      { _id: custId },
      { lastDate: 1, _id: 0 }
    );
    const attendanceCount = await attendanceData.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        },
      },
      {
        $sum: 1,
      },
    ]);
    let summaryData = {
      lastDate,
      attendanceCount,
    };
    res.status(200).json({ statusMsg: "success", data: summaryData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusMsg: "error", message: error });
  }
});
module.exports = router;
