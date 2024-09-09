import express from "express";
import authRoutes from "./auth/authRoutes";
import userRoutes from "./user/userRoutes";
import passport from "passport";
const router = express.Router();

router.use("/auth", authRoutes);
router.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  userRoutes
);

export default router;
