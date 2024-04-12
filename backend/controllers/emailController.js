
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "bc2bd86d0f4342",
    pass: "787d2d8a6163a1",
  },
});

exports.sendEmail = async (req, res) => {
  const {  name, email, applicationId } = req.body;





  try {
    await transporter.sendMail({
      from: "testideamagix@gmail.com",
      to: "05sameerk@gmail.com",
      subject: "hello my name is "+ name + " and email is " + email,
      text: "email test succesfull",
    });

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
};
