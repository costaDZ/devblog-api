import {MailtrapClient} from "mailtrap";
import {generateMailHtmlTemplate} from "./mail-html-template";

const client = new MailtrapClient({
  token: process.env.MAILTRAP_TOKEN as string,
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Mailtrap Test",
};

export async function sendVerificationEmail(recipient: string, verificationToken: string) {
  client
    .send({
      from: sender,
      to: [
        {
          email: recipient,
        },
      ],
      subject: "Verification Account Dev Blog ✔",
      text: "Verification Account Dev Blog. Please verify your email address.",
      html: generateMailHtmlTemplate(verificationToken), // Add the HTML here
      category: "Integration Test",
    })
    .then(console.log, console.error);
}
