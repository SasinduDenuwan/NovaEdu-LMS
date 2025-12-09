import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { addCourse, getAllCourses, updateCourse, deleteCourse } from "../controllers/course.controller";
import { requireRole } from "../middleware/role.middleware";
import { Role } from "../models/user.model";

const router = Router();

router.post("/add-course", authenticate, requireRole([Role.ADMIN, Role.USER]), addCourse);
router.get("/get-all-courses", authenticate, requireRole([Role.ADMIN, Role.USER]), getAllCourses);
router.put("/update-course/:courseId", authenticate, requireRole([Role.ADMIN, Role.USER]), updateCourse);
router.delete("/delete-course/:courseId", authenticate, requireRole([Role.ADMIN, Role.USER]), deleteCourse);

export default router;