import User from "@/models/userMode";
import dbConnect from "@/app/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { sendToken } from "@/app/utils/jwt";

export const POST = async (req) => {
  try {
    const { email, password } = await req.json();
    await dbConnect();

    // Check for required fields
    if (!email || !password) {
      return NextResponse.json({
        success: false,
        message: "It's required to fill both the details",
      });
    }

    // Find user by email
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return NextResponse.json({
        success: false,
        message: "Email or Password is incorrect",
      });
    }

    // Compare passwords
    const matchedPassword = await bcrypt.compare(password, findUser.password);
    if (!matchedPassword) {
      return NextResponse.json({
        success: false,
        message: "Email or Password is incorrect",
      });
    }

    return sendToken(findUser, "User logged in Successfully");
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({
      success: false,
      message: "An error occurred during login. Please try again.",
    });
  }
};
