import { Request, Response } from "express";
import { IUSER, Role, User } from "../models/user.model";
import OTP from "../models/otp.model";
import bcrypt from "bcryptjs";
import { signAccessToken, signRefreshToken } from "../utils/tokens";
import { AUTHRequest } from "../middleware/auth.middleware";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ChildProcess } from "child_process";
dotenv.config();

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET as string;

export const registerUser = async (req: Request, res: Response) => {
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

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = (await User.findOne({ email })) as IUSER | null;
    if (!existingUser) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, existingUser.password);
    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = signAccessToken(existingUser);
    const refreshToken = signRefreshToken(existingUser);

    res.status(200).json({
      message: "success",
      data: {
        email: existingUser.email,
        roles: existingUser.roles,
        accessToken,
        refreshToken,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getMyProfile = async (req: AUTHRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const user = await User.findById(req.user.sub).select("-password");

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const { email, roles, _id } = user as IUSER;

  res.status(200).json({ message: "ok", data: { id: _id, email, roles } });
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: "Token required" });
    }

    const payload: any = jwt.verify(token, JWT_REFRESH_SECRET);
    const user = await User.findById(payload.sub);
    if (!user) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    const accessToken = signAccessToken(user);

    res.status(200).json({
      accessToken,
    });
  } catch (err) {
    res.status(403).json({ message: "Invalid or expire token" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
  
    if (!existingUser) {
      return res.status(200).json({ code:404, message: "No account found with that email !" });
    }else{
      // delete any existing otp for that email
      await OTP.deleteMany({ email });

      // otp generation and email sending logic goes here
      // otp has 6 digit numeric code
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // if the email sending is successful then the otp is saved in the database with expiry time of 15 minutes
      // For now, we will assume email sending is always successful`
      
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now

      const savedOTP = await OTP.create({ email, code: otpCode, expiresAt });

      if(!savedOTP){
        return res.status(500).json({ code:500, message: "Could not generate OTP, please try again !" });
      }
      return res.status(200).json({ code:200, message: `OTP sent successfully !` });
    }
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const checkOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    const existingOTP = await OTP.findOne({ email, code: otp });

    if (existingOTP) {
      res.status(200).json({ code: 200, message: "OTP verified successfully" });
    } else {
      res.status(400).json({ code: 400, message: "Invalid OTP" });
    }
 
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({ code: 404, message: "User not found" });
    }

    const hash = await bcrypt.hash(password, 10);

    existingUser.password = hash;
    await existingUser.save();

    res.status(200).json({ code: 200, message: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
}