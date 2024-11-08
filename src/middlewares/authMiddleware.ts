import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET as string;

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(403).json({message: "No token provided"});
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.body.useId = (decoded as {userId: string}).userId;
    next();
  } catch (error) {
    res.status(401).json({message: "Invalid token"});
  }
};
