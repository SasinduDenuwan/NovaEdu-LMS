import { AUTHRequest } from "../middleware/auth.middleware";
import { Response } from "express";
import { Instructor } from "../models/instructor.model";

export const getInstructors = async (req: AUTHRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ code: 401, message: "Unauthorized" });
    }

    const instructors = await Instructor.find({});

    return res.status(200).json({
      code: 200,
      message: "All instructors fetched successfully",
      data: instructors,
    });
  } catch (error) {
    console.error("Error fetching instructors:", error);
    return res.status(500).json({ code: 500, message: "Server Error" });
  }
};

export const addInstructor = async (req: AUTHRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ code: 401, message: "Unauthorized" });
    }
    const { name, role, experience, students, courses, image, bio } = req.body;

    const newInstructor = new Instructor({
      name,
      role,
      experience,
      students,
      courses,
      image,
      bio,
    });
    const savedInstructor = await newInstructor.save();

    return res.status(201).json({
      code: 201,
      message: "Instructor added successfully",
      data: savedInstructor,
    });
  } catch (error) {
    console.error("Error adding instructor:", error);
    return res.status(500).json({ code: 500, message: "Server Error" });
  }
};

export const updateInstructor = async (req: AUTHRequest, res: Response) => {
  // Implementation for updating an instructor
}

export const deleteInstructor = async (req: AUTHRequest, res: Response) => {
  // Implementation for deleting an instructor
}