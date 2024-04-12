const Category = require("../model/Category");

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ status: "success", data: category });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res
        .status(404)
        .json({ status: "error", message: "Category not found" });
    }
    res
      .status(200)
      .json({ status: "success", message: "Category deleted successfully" });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!category) {
      return res
        .status(404)
        .json({ status: "error", message: "Category not found" });
    }
    res.status(200).json({ status: "success", data: category });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category) {
      return res
        .status(404)
        .json({ status: "error", message: "Category not found" });
    }
    res.status(200).json({ status: "success", data: category });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ status: "success", data: categories });
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
};