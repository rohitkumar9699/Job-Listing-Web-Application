const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    // Set up your SMTP transporter (use your service or Gmail credentials)
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or 'SendGrid', etc.
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email could not be sent");
  }
};

module.exports = sendEmail;
