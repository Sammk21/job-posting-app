const mongoose = require("mongoose");

const PersonalDetailsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  resume: {
    type: String, // Assuming you store the path to the resume file
  },
  yearsOfExperience: {
    type: Number,
  },
  preferredTechnologies: {
    type: [String], // Assuming an array of strings for multiple technologies
  },
});

module.exports = mongoose.model("PersonalDetails", PersonalDetailsSchema);
