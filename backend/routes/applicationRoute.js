// routes/applicationRoutes.js
const express = require("express");
const router = express.Router();
const applicationController = require("../controllers/applicationController");

router.post("/", applicationController.createApplication);
router.get("/", applicationController.getApplications);
router.put("/:applicationId", applicationController.updateApplicationStatus);
router.get("/user/:userId", applicationController.getApplicationsByUserId);
router.post("/send-reject", applicationController.rejectedApplications);

module.exports = router;
