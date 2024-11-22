export const generateMailHtmlTemplate = (verificationToken: string) => `
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f9f9f9;
      }
      .email-container {
        max-width: 600px;
        margin: 20px auto;
        background: white;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        overflow: hidden;
      }
      .header {
        background-color: #4CAF50;
        color: white;
        text-align: center;
        padding: 20px;
        font-size: 24px;
      }
      .content {
        padding: 20px;
      }
      .content p {
        font-size: 16px;
        line-height: 1.5;
        color: #333;
      }
      .button-container {
        text-align: center;
        margin-top: 20px;
      }
      .verify-button {
        background-color: #4CAF50;
        color: white;
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 16px;
        display: inline-block;
      }
      .verify-button:hover {
        background-color: #45a049;
      }
      .footer {
        text-align: center;
        font-size: 12px;
        color: #777;
        padding: 10px 0;
        border-top: 1px solid #eaeaea;
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        Verify Your Account
      </div>
      <div class="content">
        <p>Hello,</p>
        <p>Thank you for signing up for Dev Blog! Please click the button below to verify your account:</p>
        <div class="button-container">
      <a href="${process.env.BASE_URL}/verify-email?token=${verificationToken}" class="verify-button" style="padding: 10px 20px; color: white; background: #4CAF50; text-decoration: none; border-radius: 5px;">Verify Account</a>
        </div>
        <p>If you didn't request this email, please ignore it.</p>
      </div>
      <div class="footer">
        &copy; ${new Date().getFullYear()} Dev Blog. All rights reserved.
      </div>
    </div>
  </body>
</html>
`;
