const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: String,
    enum: ["user", "admin"], // Define possible roles // Default role is user
  },
  otp: { type: String },
  otpExpires: { type: Date },

  personalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PersonalDetails",
  },
  applications: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
});

module.exports = mongoose.model("User", UserSchema);
