import { RequestHandler } from "express";
import { sendResponse } from "../../utils/sendResponse";
import User from "../../model/userSchema";

export const sendUserDetails: RequestHandler = async (req, res) => {
  try {
    if (req.user instanceof User) {
      const userId = req.user._id;
      if (!userId) {
        return sendResponse(res, 400, "User not found", false);
      }
      const user = await User.findById(userId).select("-password");
      if (!user) {
        return sendResponse(res, 400, "User not found", false);
      }
      sendResponse(res, 200, "Details found", true, { user });
    }
  } catch (error) {
    sendResponse(res, 500, "Internal server error", false);
  }
};
