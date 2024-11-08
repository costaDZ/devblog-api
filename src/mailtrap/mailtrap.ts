import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  secure: false,
  port: 587,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendVerificationEmail() {
  const info = await transporter.sendMail({
    from: "casacasino7@gmail.com",
    to: ["casacasino7@gmail.com", "nadgmo@gmail.com"],
    subject: "Verification Account Dev Blog ✔",
    text: "Verification Account Dev Blog",
    html: "<b>TEST VERIFICATION ACCOUNT</b>",
  });
  console.log("Message sent: %s", info.messageId);
}
