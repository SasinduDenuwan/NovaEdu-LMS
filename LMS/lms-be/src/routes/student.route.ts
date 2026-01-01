import { Router } from "express";
import { addStudent, getStudents, updateStudent, deleteStudent, getUserProfile, updateUserProfile, changeUserPassword } from "../controllers/student.controller";
import { authenticate } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";
import { Role } from "../models/user.model";
import { upload } from "../middleware/upload.middleware";

const router = Router();

router.post("/add-student", authenticate, requireRole([Role.ADMIN]), addStudent);

router.get("/get-all-students", authenticate, requireRole([Role.ADMIN]), getStudents);

router.put("/update-student/:studentId", authenticate, requireRole([Role.ADMIN]), updateStudent);

router.delete("/delete-student/:studentId", authenticate, requireRole([Role.ADMIN]), deleteStudent);

router.get("/profile", authenticate, requireRole([Role.USER, Role.STUDENT]), getUserProfile);
router.put("/profile", authenticate, requireRole([Role.USER, Role.STUDENT]), upload.single("profilePic"), updateUserProfile);
router.put("/change-password", authenticate, requireRole([Role.USER, Role.STUDENT]), changeUserPassword);

export default router;