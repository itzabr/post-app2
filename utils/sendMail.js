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


// const { Resend } = require("resend");

// console.log("🔑 RESEND_API_KEY =", process.env.RESEND_API_KEY);

// const resend = new Resend(process.env.RESEND_API_KEY);

// module.exports = async function sendMail(to, verifyLink) {
//   try {
//     const result = await resend.emails.send({
//       from: "PostApp <onboarding@resend.dev>",
//       to,
//       subject: "Verify your PostApp account",
//       html: `
//         <h2>Email Verification</h2>
//         <p>Click the link below:</p>
//         <a href="${verifyLink}">${verifyLink}</a>
//       `
//     });

//     console.log("📨 Resend response:", result);
//   } catch (err) {
//     console.error("❌ Resend error:", err);
//   }
// };
