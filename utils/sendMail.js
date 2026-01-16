const nodemailer = require("nodemailer");

const sendMail = async (to, link) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS
    }
  });
  console.log("MAIL CONFIG:", process.env.MAIL_ID);
  await transporter.sendMail({
    from: process.env.MAIL_ID,
    to,
    subject: "Verify your account",
    html: `
      <h2>Welcome!</h2>
      <p>Click the link below to verify your account:</p>
      <a href="${link}">${link}</a>
    `
  });
};

module.exports = sendMail;
