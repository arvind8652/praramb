const router = require("express").Router();
const { default: mongoose } = require("mongoose");
let adminData = require("../models/admin.model");
let brandDetailsData = require("../models/brandDetails.model");

router.route("/login").post(async (req, res) => {
  const { mobileNo, password } = req.body;
  try {
    const user = await adminData
      .findOne({ mobileNo, password })
      .select("-password -createdAt -updatedAt -__v");
    if (user) {
      console.log("check login Detail----------", user?.brandId);

      const brandId = new mongoose.Types.ObjectId(user.brandId);
      const brandDetail = await brandDetailsData.findOne({
        _id: new mongoose.Types.ObjectId("66237a78fc46bd3859a813c8"),
      });
      // .select("-__v");

      console.log("brandDetailVal-------", brandDetail);
      res.status(200).json({ statusMsg: "success", data: user });
    } else {
      res
        .status(401)
        .json({ statusMsg: "error", message: "Invalid mobileNo or password" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ statusMsg: "error", message: "Internal Server Error" });
  }
});

router.route("/add").post((req, res) => {
  const { name, mobileNo, password, role, experience } = req.body;
  const newAdmin = new adminData({
    name,
    mobileNo,
    password,
    role,
    experience,
  });

  newAdmin
    .save()
    .then(() =>
      res.json({
        statusMsg: "success",
        data: "admin added successfully",
      })
    )
    .catch((err) =>
      res.status(400).json({ statusMsg: "error", data: err.message })
    );
});

module.exports = router;
