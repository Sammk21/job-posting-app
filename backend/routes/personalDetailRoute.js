const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const personalDetails = require("../controllers/personalDetails");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });


router.post( "/",upload.single("resume"), personalDetails.addPersonalDetails);
router.get("/:userId", personalDetails.getUserData)

module.exports = router;
