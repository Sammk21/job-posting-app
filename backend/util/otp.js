// Import Nodemailer
const nodemailer = require("nodemailer");

// Generate OTP Function
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
};

// Nodemailer Transporter Configuration
const transporter = nodemailer.createTransport({
host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
     user: "bc2bd86d0f4342",
      pass: "787d2d8a6163a1",
  },
});



// Send OTP Function
const sendOTP = async (email, otp) => {
  try {
    await transporter.sendMail({
      from: "ameer5102001@gmail.com",
      to: email,
      subject: "Your OTP for Password Reset",
      text: `Your OTP for password reset is: ${otp}. This OTP is valid for 10 minutes.`,
    });
    console.log("OTP sent successfully to", email);
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP");
  }
};

module.exports = { generateOTP, sendOTP };
