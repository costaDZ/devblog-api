import {Request, Response} from "express";
import User from "@models/User";

export const verifyEmail = async (req: Request, res: Response) => {
  const {token} = req.query;

  try {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiresAt: {$gt: Date.now()},
    });

    if (!user) {
      res.status(400).json({error: "Invalid or expired verification token."});
      return;
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    res.status(200).json({message: "Email verified successfully! You can now log in."});
  } catch (error) {
    console.error(error);
    res.status(500).json({error: "Internal server error"});
  }
};
