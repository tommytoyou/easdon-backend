const nodemailer = require("nodemailer");

async function sendEmail({ to, subject, text, html }) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or another provider (e.g., "hotmail", "yahoo", or custom SMTP)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Easdon Orders" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}

module.exports = sendEmail;
