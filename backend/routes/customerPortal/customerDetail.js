const mongoose = require("mongoose");
const router = require("express").Router();
const attendanceData = require("../../models/customerPortal/attendance.model");
const customerData = require("../../models/customers.model");
const brandDetailsData = require("../../models/brandDetails.model");

router.route("/login").post(async (req, res) => {
  const { mobileNo } = req.body;
  try {
    const user = await customerData.findOne(
      { mobileNo },
      { firstName: 1, lastName: 1 }
    );
    //   .select("-password -createdAt -updatedAt -__v");
    if (user) {
      const brandDetail = await brandDetailsData
        .findOne(user?.brandId)
        .select("-__v -createdAt -updatedAt -status -_id");
      res
        .status(200)
        .json({ statusMsg: "success", data: { user, brandDetail } });
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
  console.log("check the customer id--------", custId);
  const specificCustomerId = new mongoose.Types.ObjectId(custId);
  function dayDifference(date1, date2) {
    console.log("date 1---------", date1);
    console.log("date 2---------", date2);
    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = Math.abs(date2_ms - date1_ms);

    // Convert milliseconds to days
    var difference_days = Math.floor(difference_ms / (1000 * 60 * 60 * 24));

    return difference_days;
  }

  try {
    const endDate = await customerData.find(
      { _id: custId },
      { endDate: 1, _id: 0 }
    );
    const startDate = await customerData.find(
      { _id: custId },
      { startDate: 1, _id: 0 }
    );

    const totalDay = dayDifference(
      new Date(startDate[0]?.startDate),
      new Date()
    );
    console.log("start date for----", startDate);
    console.log(
      "date difference--------",
      dayDifference(new Date(startDate[0]?.startDate), new Date())
    );
    const attendanceCount = await attendanceData.aggregate([
      {
        $match: {
          custId: specificCustomerId,
        },
      },
      {
        $group: {
          _id: custId,
          count: { $sum: 1 },
        },
      },
    ]);

    const currentActiveCustomer = await attendanceData.aggregate([
      {
        $match: {
          in_time: { $ne: null },
          out_time: null,
        },
      },
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
        },
      },
    ]);
    let summaryData = {
      endDateVal: endDate[0].endDate,
      attendanceVal: `${attendanceCount[0]?.count || 0} / ${totalDay}`,
      totalActiveCustomer: currentActiveCustomer[0]?.count || 0,
    };
    console.log("chekck data---------", summaryData);
    res.status(200).json({ statusMsg: "success", data: summaryData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusMsg: "error", message: error });
  }
});
module.exports = router;
