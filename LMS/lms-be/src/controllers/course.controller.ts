import { AUTHRequest } from "../middleware/auth.middleware";
import { Response } from "express";
import { Course } from "../models/course.model";

export const getAllCourses = async (req: AUTHRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ code: 401, message: "Unauthorized" });
    }

    const courses = await Course.find({}).populate("instructor", "name _id image role experience");

    return res.status(200).json({
      code: 200,
      message: "All courses fetched successfully",
      data: courses,
    });

  } catch (error) {
    res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
}

export const addCourse = async (req: AUTHRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ code: 401, message: "Unauthorized" });
    }

    const course = await Course.create(req.body);

    return res.status(201).json({
      code: 201,
      message: "Course added successfully",
      data: course,
    });

  } catch (error) {
    res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
} 

export const deleteCourse = async (req: AUTHRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ code: 401, message: "Unauthorized" });
    }

    const course = await Course.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      code: 200,
      message: "Course deleted successfully",
      data: course,
    });

  } catch (error) {
    res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
} 

export const updateCourse = async (req: AUTHRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ code: 401, message: "Unauthorized" });
    }

    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });

    return res.status(200).json({
      code: 200,
      message: "Course updated successfully",
      data: course,
    });

  } catch (error) {
    res.status(500).json({ code: 500, message: "Internal Server Error" });
  }
}