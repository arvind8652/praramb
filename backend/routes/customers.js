const router = require("express").Router();
let customerData = require("../models/customers.model");

router.route("/").get(async (req, res) => {
  try {
    const resp = await customerData.find();
    res.status(200).json({ statusMsg: "success", data: resp });
  } catch (err) {
    res.status(400).json({ statusMsg: "error", data: err.message });
  }
});

router.route("/add").post((req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const dob = req.body.dob;
  const mobileNo = req.body.mobileNo;
  const email = req.body.email;
  const role = req.body.role;
  const startDate = req.body.startDate;
  const endDate = req.body.endDate;
  const status = req.body.status;
  const amount = req.body.amount;
  const gender = req.body.gender;
  const comment = req.body.comment;

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

module.exports = router;
