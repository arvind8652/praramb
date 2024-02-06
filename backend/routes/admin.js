const router = require("express").Router();
let adminData = require("../models/admin.model");

router.route("/login").post(async (req, res) => {
  const { mobileNo, password } = req.body;
  try {
    const user = await adminData
      .findOne({ mobileNo, password })
      .select("-password -createdAt -updatedAt -__v");
    if (user) {
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
