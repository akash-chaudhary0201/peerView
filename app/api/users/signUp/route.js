import User from "@/models/userMode";
import dbConnect from "@/app/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendEmail } from "@/app/utils/sendEmail";
import { authenticator } from "otplib";

export const POST = async (req) => {
  try {
    const {
      userName,
      email,
      password,
      year,
      section,
      skills,
      phoneNumber,
      linkedIn,
      portFolio,
      resume,
      certifications,
    } = await req.json();

    await dbConnect();

    // Check if email is from KIET (optional validation)
    if (!email.endsWith("@kiet.edu")) {
      return NextResponse.json({
        success: false,
        message: "Email should be of KIET (@kiet.edu)",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = authenticator.generate(email);
    const otpExpires = Date.now() + 10 * 60 * 1000;

    // Create the user first
    const newUser = await User.create({
      userName,
      email,
      skills,
      phoneNumber,
      certifications,
      linkedIn,
      portFolio,
      year,
      section,
      password: hashedPassword,
      otp,
      otpExpires,
    });

    // Send OTP on email
    const mailResponse = await sendEmail(newUser.email, otp);
    if (!mailResponse) {
      // If sending OTP fails, delete the user
      await User.deleteOne({ _id: newUser._id });
      return NextResponse.json({
        success: false,
        message: "Failed to send OTP. User profile has been removed.",
      });
    }

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      newUser,
      mailResponse,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error,
    });
  }
};
