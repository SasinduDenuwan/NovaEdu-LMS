import { User } from "../models/user.model";
import { Role } from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

export const addStudent = async (req: Request, res: Response) => {
  try {
    const { email, password, firstname, lastname } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    //   new User()
    const user = await User.create({
      email,
      password: hash,
      firstname,
      lastname,
      roles: [Role.USER],
    });

    res.status(201).json({
      message: "User registed",
      data: { email: user.email, roles: user.roles },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal; server error",
    });
  }
};

export const getStudents = async (req: Request, res: Response) => {
  try {
    const users = await User.find({ roles: Role.USER, isActive: true }).select("-password");
    res.status(200).json({
      message: "success",
      data: users,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};  

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { email, password, firstname, lastname } = req.body;
    const user = await User.findById(req.params.studentId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if (email) user.email = email;
    if (password) {
      const hash = await bcrypt.hash(password, 10);
      user.password = hash;
    }
    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;

    await user.save();
    res.status(200).json({
      message: "User updated",
      data: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.studentId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.isActive = false;
    await user.save();
    res.status(200).json({
      message: "User deleted",
      data: user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};