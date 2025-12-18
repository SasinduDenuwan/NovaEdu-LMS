import { Router } from "express";
import { addStudent, getStudents, updateStudent, deleteStudent } from "../controllers/student.controller";
import { authenticate } from "../middleware/auth.middleware";
import { requireRole } from "../middleware/role.middleware";
import { Role } from "../models/user.model";

const router = Router();

router.post("/add-student", authenticate, requireRole([Role.ADMIN, Role.USER]), addStudent);

router.get("/get-all-students", authenticate, requireRole([Role.ADMIN, Role.USER]), getStudents);

router.put("/update-student/:studentId", authenticate, requireRole([Role.ADMIN, Role.USER]), updateStudent);

router.delete("/delete-student/:studentId", authenticate, requireRole([Role.ADMIN, Role.USER]), deleteStudent);

export default router;