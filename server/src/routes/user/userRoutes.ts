import express from "express";
import { sendUserDetails } from "../../controllers/user/userController";

const router = express.Router();

router.get("/details", sendUserDetails);

export default router;
