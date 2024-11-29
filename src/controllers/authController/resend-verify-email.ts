import {Request, Response} from "express";
import User from "@models/User";
import {generateVerificationToken} from "@utils/generateVerificationToken";
import {sendVerificationEmail} from "src/mailtrap/mailtrap";

export const resendVerifyEmail = async (req: Request, res: Response) => {
  const {email} = req.body;

  const user = await User.findOne({email});
  if (!user) {
    res.status(400).send("User not found.");
    return;
  }

  if (user.isVerified) {
    res.status(400).send("User is already verified.");
    return;
  }

  const token = generateVerificationToken();
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + 24);

  user.verificationToken = token;
  user.verificationTokenExpiresAt = expirationDate;

  try {
    await sendVerificationEmail(email, token);
  } catch (error) {
    res.status(500).send("Sending verification Email failed");
    return;
  }

  res.send("Verification email sent.");
};
