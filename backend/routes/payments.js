const router = require("express").Router();
const paymentData = require("../models/paymentDetail.model");
const customerData = require("../models/customers.model");

router.route("/:id").get(async (req, res) => {
  try {
    const { id } = req.params;
    const paymentDetail = await paymentData.find({ custId: id });
    const customerDetail = await customerData.findById(id).select("amount");
    let remainingAmount = customerDetail.amount;

    if (paymentDetail?.length > 0) {
      // Extract payingAmount from paymentDetail
      let payingAmounts = paymentDetail.map((data) => data.payingAmount);
      // Calculate sum of payingAmounts
      let sumOfPayingAmounts = payingAmounts.reduce(
        (acc, curr) => acc + Number(curr),
        0
      );
      remainingAmount = remainingAmount - sumOfPayingAmounts;
    }
    let response = {
      totalAmount: customerDetail.amount,
      remainingAmount,
      payedAmountList: paymentDetail,
    };
    res.status(200).json({ statusMsg: "success", data: response });
  } catch (err) {
    res.status(400).json({ statusMsg: "error", data: err.message });
  }
});

router.route("/add").post((req, res) => {
  const { custId, adminId, payingAmount, mode, transactionId } = req.body;

  const newPayment = new paymentData({
    custId,
    adminId,
    payingAmount,
    mode,
    transactionId,
  });
  newPayment
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
