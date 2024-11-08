import {Request, Response} from "express";

export const logout = (_: Request, res: Response) => {
  try {
    res.status(200).json({message: "Logged out successfully"});
    return;
  } catch (error) {
    res.status(500).json({error: "Internal server error"});
    return;
  }
};
