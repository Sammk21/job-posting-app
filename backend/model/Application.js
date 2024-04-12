const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  personalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PersonalDetails",
    required: true,
  },
  applicationStatus: {
    type: String,
    enum: ["accepted", "rejected", "pending"], // Add more statuses as needed
    default: "pending",
  },
});

module.exports = mongoose.model("Application", applicationSchema);
