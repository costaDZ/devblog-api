import jwt from "jsonwebtoken";
import {Request, Response} from "express";
import bcrypt from "bcrypt";
import User from "@models/User";

export const login = async (req: Request, res: Response) => {
  const {email, password} = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({error: "Email and password are required"});
      return;
    }

    const user = await User.findOne({email});
    if (!user) {
      res.status(400).json({error: "Invalid credentials"});
      return;
    }

    if (!user.isVerified) {
      res.status(400).json({error: "Account is not verified yet"});
      return;
    }

    const isPasswordValid = user.password && (await bcrypt.compare(password, user.password));
    if (!isPasswordValid) {
      res.status(400).json({error: "Invalid credentials"});
      return;
    }

    const accessToken = jwt.sign({userId: user._id}, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({userId: user._id}, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });

    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({error: "Internal server error"});
  }
};
