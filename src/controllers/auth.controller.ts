import { Request, Response } from "express";
import User, { IUser } from "../models/User";

import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  const user: IUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  user.password = await user.encryptPassword(user.password);

  const savedUser = await user.save();
  const token: string = jwt.sign({ _id: savedUser._id }, process.env
    .TOKEN_SECRET as string);
  res
    .header("auth-token", token)
    .status(201)
    .json(savedUser);
};

export const signin = async (req: Request, res: Response) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json("Email is wrong");

  const correctPassword = await user.validatePassword(req.body.password);
  if (!correctPassword) return res.status(400).json("Password is wrong");

  const token: string = jwt.sign(
    { _id: user._id },
    process.env.TOKEN_SECRET as string,
    {
      expiresIn: 60 * 60 * 24
    }
  );

  res
    .header("auth-token", token)
    .status(200)
    .json(user);
};

export const profile = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId);
  if (!user) return res.status(404).json("No user found");

  res.json(user);
};
