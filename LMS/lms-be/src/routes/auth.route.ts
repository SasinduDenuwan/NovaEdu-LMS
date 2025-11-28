import { Router } from "express";
import { forgotPassword, getMyProfile, login, refreshToken, registerUser } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerUser);

router.post("/login", login);   

router.post("/refresh", refreshToken)

router.post("/forgot-password", forgotPassword)

router.get("/me", authenticate, getMyProfile)

export default router;