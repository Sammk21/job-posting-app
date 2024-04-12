const express = require("express");
const router = express.Router();

const {
  register,
  login,
  forgotPassword,
  checkOtp,
  setNewPassword,
} = require("../controllers/authcontroller" );

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// Forgot password route
router.post("/forgotpassword", forgotPassword);

//check the otp
router.post("/checkotp", checkOtp)


//set new password
router.post("/setpassword", setNewPassword);




module.exports = router;
