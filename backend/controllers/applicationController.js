// controllers/applicationController.js
const Application = require("../model/Application");
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "bc2bd86d0f4342",
    pass: "787d2d8a6163a1",
  },
});

exports.createApplication = async (req, res) => {
  try {
    const { userId, companyId, personalDetailsId } = req.body;
    const application = new Application({
      user: userId,
      company: companyId,
      personalDetails: personalDetailsId,
    });

    console.log(userId)
    await application.save();
      const mailOptions = {
        from: "testideamagix@gmail.com",
        to: "testideamagix@example.com",
        subject: "New Application Submitted",
        text: "A new application has been submitted successfully.",
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
  
    res
      .status(201)
      .json({ success: true, message: "Application saved successfully" });
  } catch (error) {
    console.error("Error creating application:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to save application" });
  }
};

exports.getApplications = async (req, res) => {
   try {
     const applications = await Application.find()
       .populate("user")
       .populate("company")
       .populate("personalDetails");
     res.status(200).json({ status: "success", data: applications });
   } catch (err) {
     res.status(400).json({ status: "error", message: err.message });
   }
}

exports.updateApplicationStatus = async (req, res) => {
  try {
    const { applicationId } = req.params;
    const { status } = req.body;

    const application = await Application.findByIdAndUpdate(
      applicationId,
      { applicationStatus: status },
      { new: true }
    );

    if (!application) {
      return res
        .status(404)
        .json({ success: false, error: "Application not found" });
    }

    res.status(200).json({
      success: true,
      message: "Application status updated successfully",
      data: application,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to update application status" });
  }
};

exports.getApplicationsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const applications = await Application.find({ user: userId })
      .populate("user")
      .populate("company")
      .populate("personalDetails");
       console.log("Applications:", applications);

    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    console.error("Error fetching applications by user ID:", error);
    res
      .status(500)
      .json({ success: false, error: "Failed to fetch applications" });
  }
};

exports.rejectedApplications = async (req, res) => {

  const { email, reason } = req.body;


   if (!email || !reason) {
     return res.status(400).json({ error: "Email and reason are required." });
   }

    const mailOptions = {
      from: "your-email@example.com",
      to: email,
      subject: "Application Rejection",
      text: `Dear Applicant,\n\nWe regret to inform you that your application has been rejected.\nReason: ${reason}\n\nSincerely,\nThe Admin Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Error sending email.' });
    }
    console.log('Email sent:', info.response);
    res.json({ message: 'Email sent successfully.' });
    
});


}