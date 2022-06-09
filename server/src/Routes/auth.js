const router = require("express").Router();
const UserBL = require("../db/user");

//Register a new User
router.post("/signup", async (req, res) => {
  try {
    // create a new user
    const newUser = await new UserBL({
      name: req.body.name,
      mobileNo: req.body.mobileNo,
      gender: req.body.gender,
      upi: req.body.mobileNo + "@ybl",
    });
    // save a new user
    await newUser.save();
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await UserBL.findOne({ mobileNo: req.body.mobileNo });
    if (!user) {
      res.status(404).send("No user found");
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

module.exports = router;
