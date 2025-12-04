import { Router } from "express";
import { addInstructor, getInstructors } from "../controllers/instructor.controll";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.post("/add-instructor", authenticate, addInstructor);

router.get("/get-all-instructors", authenticate, getInstructors);

export default router;