const router = require("express").Router();
const customerData = require("../models/customers.model");

// router.route("/").get(async (req, res) => {
//   try {
//     const resp = await customerData.find();
//     res.status(200).json({ statusMsg: "success", data: resp });
//   } catch (err) {
//     res.status(400).json({ statusMsg: "error", data: err.message });
//   }
// });

router.route("/").get(async (req, res) => {
  try {
    const resp = await customerData.aggregate([
      {
        $lookup: {
          from: "paymentdetails",
          localField: "_id",
          foreignField: "custId",
          as: "payments",
        },
      },
      {
        $unwind: {
          path: "$payments",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $group: {
          _id: "$_id",
          firstName: { $first: "$firstName" },
          lastName: { $first: "$lastName" },
          dob: { $first: "$dob" },
          mobileNo: { $first: "$mobileNo" },
          email: { $first: "$email" },
          role: { $first: "$role" },
          startDate: { $first: "$startDate" },
          endDate: { $first: "$endDate" },
          status: { $first: "$status" },
          amount: { $first: "$amount" },
          gender: { $first: "$gender" },
          comment: { $first: "$comment" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          totalPayment: { $sum: "$payments.payingAmount" },
        },
      },
      {
        $addFields: {
          totalAmountDue: { $subtract: ["$amount", "$totalPayment"] },
        },
      },

      {
        $project: {
          _id: 1,
          firstName: 1,
          lastName: 1,
          dob: 1,
          mobileNo: 1,
          email: 1,
          role: 1,
          startDate: 1,
          endDate: 1,
          status: 1,
          amount: 1,
          gender: 1,
          comment: 1,
          createdAt: 1,
          updatedAt: 1,
          totalPayment: { $ifNull: ["$totalPayment", 0] },
          totalAmountDue: { $ifNull: ["$totalAmountDue", 0] },
        },
      },
      {
        $sort: {
          updatedAt: 1,
        },
      },
    ]);
    res.status(200).json({ statusMsg: "success", data: resp });
  } catch (err) {
    res.status(400).json({ statusMsg: "error", data: err.message });
  }
});

router.route("/summary").get(async (req, res) => {
  try {
    // const resp = await customerData.find().select("-_id amount");
    const resp = await customerData.aggregate([
      {
        $group: {
          _id: "null",
          totalAmount: { $sum: { $toDouble: "$amount" } },
          totalCustomers: { $sum: 1 },
          totalActiveCustomers: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json({ statusMsg: "success", data: resp });
  } catch (err) {
    res.status(400).json({ statusMsg: "error", data: err.message });
  }
});

router.route("/add").post((req, res) => {
  const {
    firstName,
    lastName,
    dob,
    mobileNo,
    email,
    role,
    startDate,
    endDate,
    status,
    amount,
    gender,
    comment,
  } = req.body;

  const newCustomer = new customerData({
    firstName,
    lastName,
    dob,
    mobileNo,
    email,
    role,
    startDate,
    endDate,
    status,
    amount,
    gender,
    comment,
  });

  newCustomer
    .save()
    .then(() =>
      res.json({
        statusMsg: "success",
        data: "customer added successfully",
      })
    )
    .catch((err) =>
      res.status(400).json({ statusMsg: "error", data: err.message })
    );
});

router.route("/edit/:id").put(async (req, res) => {
  try {
    const { id } = req.params;
    const updateCustomer = await customerData.findByIdAndUpdate(
      id,
      // req.body,
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        mobileNo: req.body.mobileNo,
        email: req.body.email,
        role: req.body.role,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        status: req.body.status,
        amount: req.body.amount,
        gender: req.body.gender,
        comment: req.body.comment,
        updatedAt: Date.now(),
      }
      // { new: true } // Return the modified document
    );

    if (!updateCustomer) {
      return res
        .status(404)
        .json({ statusMsg: "error", data: "customer not found" });
    }

    res.json({
      statusMsg: "success",
      data: updateCustomer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusMsg: "error", data: "Internal Server Error" });
  }
});

router.route("/delete/:id").delete(async (req, res) => {
  try {
    const { id } = req.params;
    const deleteCustomer = await customerData.findByIdAndDelete(id);

    if (!deleteCustomer) {
      return res
        .status(404)
        .json({ statusMsg: "error", data: "Customer not found" });
    }
    res.json({
      statusMsg: "success",
      data: "Customer deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ statusMsg: "error", data: "Internal Server Error" });
  }
});

router.route("/payment").post((req, res) => {
  const { custId, adminId, amountPayed, mode, transactionId } = req.body;

  const newCustomer = new customerData({
    custId,
    adminId,
    amountPayed,
    mode,
    transactionId,
  });

  newCustomer
    .save()
    .then(() =>
      res.json({
        statusMsg: "success",
        data: "payed successfully",
      })
    )
    .catch((err) =>
      res.status(400).json({ statusMsg: "error", data: err.message })
    );
});

module.exports = router;
