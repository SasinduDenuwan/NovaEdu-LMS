import { Router } from "express";
import { addInstructor, getInstructors } from "../controllers/instructor.controll";
import { authenticate } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";

const router = Router();

router.post("/add-instructor", authenticate, upload.single("image"), addInstructor);

router.get("/get-all-instructors", authenticate, getInstructors);

router.put("/update-instructor/:instructorId", authenticate, );

router.delete("/delete-instructor/:instructorId", authenticate, );

export default router;