import { Router } from "express";
import { getMyProfile, login, refreshToken, registerUser } from "../controllers/auth.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", registerUser);

router.post("/login", login);   

router.post("/refresh", refreshToken)

router.get("/me", authenticate, getMyProfile)

export default router;