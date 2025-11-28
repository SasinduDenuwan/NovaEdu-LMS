import { Router } from "express";
import { checkOTP, forgotPassword, getMyProfile, login, refreshToken, registerUser, resetPassword } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerUser);

router.post("/login", login);   

router.post("/refresh", refreshToken)

router.post("/forgot-password", forgotPassword)

router.post("/check-otp", checkOTP)

router.put("/reset-password", resetPassword)

router.get("/me", authenticate, getMyProfile)

export default router;