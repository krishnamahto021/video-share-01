import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { IUser } from "../model/userSchema";
dotenv.config();

export const generateToken = async (user: IUser) => {
  const secretKey = process.env.JWT_SECRET_KEY as string;
  const jwtToken = await jwt.sign(user.toJSON(), secretKey, {
    expiresIn: "1d",
  });
  return jwtToken;
};
