import {Request, Response} from "express";
import bcrypt from "bcrypt";
import User from "@models/User";

import {generateVerificationToken} from "@utils/generateVerificationToken";
import {sendVerificationEmail} from "src/mailtrap/mailtrap";

export const signup = async (req: Request, res: Response) => {
  const {email, password, name} = req.body;
  res.end;
  try {
    if (!email || !password || !name) {
      res.status(400).json({error: "All fields are required"});
    }

    const existingUser = await User.findOne({email});
    if (existingUser) {
      res.status(400).json({error: "User already exists with this email"});
      return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const verificationToken = generateVerificationToken();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      isVerified: false,
    });

    await user.save();

    try {
      await sendVerificationEmail(email, verificationToken);
      res.status(201).json({
        message: "Signup successful! Please check your email to verify your account.",
      });
    } catch (error) {
      console.log("====================================");
      console.log("FALIED TO SEND EMAIL ");
      console.log("====================================");

      res.status(500).json({error: "FALIED TO SEND VERIFICATION EMAIL"});
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Internal server error"});
  }
};
