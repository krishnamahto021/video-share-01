import { Request, RequestHandler } from "express";
import User from "../../model/userSchema";
import { sendResponse } from "../../utils/sendResponse";
import {
  compareHashedPassword,
  hashPassword,
} from "../../utils/passwordHelper";
import { generateToken } from "../../utils/jwtToken";

interface RegisterReq extends Request {
  body: {
    email: string;
    password: string;
  };
}

// sign up the user
export const signUpUser: RequestHandler = async (req: RegisterReq, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return sendResponse(res, 400, "Account already exists", false);
    } else {
      const hashedPassword = await hashPassword(password);
      const newUser = await User.create({
        email: email,
        password: hashedPassword,
      });
      return sendResponse(res, 200, "Account created sucessfully", true, {
        newUser,
      });
    }
  } catch (error) {
    console.error(`Error in creating user ${error}`);
    return sendResponse(res, 500, "Internal server error", false);
  }
};

// sign in the user

export const signInUser: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 400, "Account doesn't exist", false);
    } else {
      const result = await compareHashedPassword(password, user.password);
      if (result) {
        const token = await generateToken(user);
        return sendResponse(res, 200, "User sign in sucesfully", true, {
          user,
          token,
        });
      } else {
        return sendResponse(res, 400, "Password mismatch", false);
      }
    }
  } catch (error) {
    sendResponse(res, 500, "internal server error", false);
  }
};
