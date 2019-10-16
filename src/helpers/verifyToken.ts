import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

interface IPayload {
  _id: string;
  iat: number;
  exp: number;
}

export const validation = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json("Access denied");

  const payload = jwt.verify(token, process.env
    .TOKEN_SECRET as string) as IPayload;
  req.userId = payload._id;
  next();
};
