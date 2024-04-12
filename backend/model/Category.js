const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  jobCategories: [String],
  jobTypes: [String],
});

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
