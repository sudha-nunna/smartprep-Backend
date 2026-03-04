require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendResetPasswordEmail = async (to, token) => {
  const resetLink = `${process.env.CLIENT_URL || "http://localhost:3000"}/auth/reset-password/${token}`;

  const msg = {
    to,
    from: process.env.EMAIL_FROM,
    subject: "Reset Your 11+ SmartPrep Password",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2e54bfff;">Reset Your Password</h2>
        <p>You requested a password reset for your 11+ SmartPrep account. Please click the button below to set a new password:</p>
        <p style="text-align: center; margin: 25px 0;">
          <a href="${resetLink}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Reset Password</a>
        </p>
        <p>This link will expire in 15 minutes.</p>
        <p>If you did not request a password reset, please ignore this email or contact support.</p>
        <hr style="border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 0.8em; color: #666;">The 11+ SmartPrep Team</p>
      </div>
    `,
  };

   try {
    await sgMail.send(msg);
    console.log("Password reset email sent to:", to);
  } catch (error) {
    console.error("SendGrid error:", error.response?.body?.errors || error.message);
  }
};

module.exports = { sendResetPasswordEmail };