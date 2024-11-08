import {Request, Response} from "express";
import bcrypt from "bcrypt";
import User from "@models/User";

import {generateVerificationCode} from "@utils/generateVerificationCode";
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
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const verificationToken = generateVerificationCode();

    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 h
      isVerified: false,
    });

    await user.save();

    await sendVerificationEmail();

    res.status(201).json({
      message: "Signup successful! Please check your email to verify your account.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Internal server error"});
  }
};
