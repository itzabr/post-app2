const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASS,
  },
});

module.exports = async (to, link) => {
  try {
    await transporter.sendMail({
      from: `"PostApp" <${process.env.MAIL_ID}>`,
      to,
      subject: "Verify your account",
      html: `<p>Click here to verify your account:</p>
             <a href="${link}">${link}</a>`
    });
  } catch (err) {
    console.error("❌ Mail error:", err.message);
  }
};
