const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../model/User");
const keys = require("../config/key");
const crypto = require("crypto");
const { generateOTP, sendOTP } = require("../util/otp");

// Register
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
      role,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.json({ msg: "User registered successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };

    jwt.sign(payload, keys.jwtSecret, { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token, user : {
          name:user.name,
          id: user.id,
          email: user.email,
          role: user.role
        } }); 
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


// Forgot Password
exports.forgotPassword = async (req, res) => {
const { forgotPasswordEmail } = req.body;
console.log(forgotPasswordEmail);
try {
  const user = await User.findOne({ email: forgotPasswordEmail });
  console.log(user)

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const otp = generateOTP();
   user.otp = otp;
    user.otpExpires = Date.now() + 600000;
    await user.save();
    await sendOTP(forgotPasswordEmail, otp);
    return res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

exports.checkOtp = async (req, res) => {
const { email, otp } = req.body;
try {
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  // Check if OTP is valid and within expiry time
  if (user.otp === otp && user.otpExpires > Date.now()) {
    return res.status(200).json({ message: "OTP is valid" });
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: "Internal server error" });
}
}

exports.setNewPassword =  async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Encrypt the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password with the hashed password
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

 

 