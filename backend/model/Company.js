const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  title: String,
  details: String,
  skills: String,
  exp: String,
  description: String,
  salary: String,
});


module.exports = mongoose.model("Company", companySchema);
