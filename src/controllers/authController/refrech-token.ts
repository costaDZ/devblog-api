import jwt from "jsonwebtoken";
import {Request, Response} from "express";
import User from "@models/User";

export const refreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    res.status(400).json({error: "No refresh token provided"});
    return;
  }

  try {
    jwt.verify(refreshToken, process.env.JWT_SECRET as string, async (err: any, decoded: any) => {
      if (err) {
        res.status(403).json({error: "Invalid refresh token"});
        return;
      }

      const user = await User.findOne({_id: decoded.userId, refreshToken});

      if (!user) {
        res.status(404).json({error: "User not found or refresh token is invalid"});
        return;
      }

      const newAccessToken = jwt.sign({userId: user._id}, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
      });

      const newRefreshToken = jwt.sign({userId: user._id}, process.env.JWT_SECRET as string, {
        expiresIn: "7d",
      });

      user.refreshToken = newRefreshToken;
      await user.save();

      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  } catch (error) {
    res.status(500).json({error: "Internal server error"});
  }
};
