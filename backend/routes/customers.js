const router = require("express").Router();
const customerData = require("../models/customers.model");
const paymentData = require("../models/paymentDetail.model");

router.route("/").get(async (req, res) => {
  try {
    const resp = await customerData
      .aggregate([
        {
          $lookup: {
            from: "paymentData", // This is the name of the "Amount" collection in the database
            localField: "_id",
            foreignField: "custId",
            as: "amounts",
          },
        },

        {
          $addFields: {
            totalAmount: {
              $reduce: {
                input: "$amounts",
                initialValue: 0,
                in: {
                  $add: [
                    "$$value",
                    { $toDouble: "$$this.payingAmount" }, // Convert each amount to a number
                  ],
                },
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
            firstName: 1,
            lastName: 1,
            status: 1,
            endDate: 1,
            gender: 1,
            totalAmount: 1,
            amounts: 1,
            // totalAmount: { $sum: "$amounts.payingAmount" },
            // You can project other customer fields as needed
          },
        },
      ])
      .exec()
      .then((results) => {
        console.log(results);
        return results;
      })
      .catch((err) => {
        console.error(err);
      });

    res.status(200).json({ statusMsg: "success", data: resp });
  } catch (err) {
    res.status(400).json({ statusMsg: "error", data: err.message });
  }
});

// router.route("/").get(async (req, res) => {
//   try {
//     const resp = await customerData.find();
//     res.status(200).json({ statusMsg: "success", data: resp });
//   } catch (err) {
//     res.status(400).json({ statusMsg: "error", data: err.message });
//   }
// });

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
