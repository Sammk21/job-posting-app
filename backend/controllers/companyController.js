
const Company = require("../model/Company");


exports.createCompany = async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).send(company);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.createCompany = async (req, res) => {
     try {
       const company = new Company(req.body);
       await company.save();
       res.status(201).send(company);
     } catch (err) {
       res.status(400).send(err);
     }
}

// Get all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.send(companies);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get company by ID
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).send({ message: "Company not found" });
    }
    res.send(company);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update company by ID
exports.updateCompanyById = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!company) {
      return res.status(404).send({ message: "Company not found" });
    }
    res.send(company);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Delete company by ID
exports.deleteCompanyById = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).send({ message: "Company not found" });
    }
    res.send(company);
  } catch (err) {
    res.status(500).send(err);
  }
};
