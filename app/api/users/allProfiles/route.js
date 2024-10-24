import dbConnect from "@/app/dbConfig/dbConfig";
import User from "@/models/userMode";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();

    const users = await User.find({}).select("-password");

    const response = NextResponse.json({
      success: true,
      users,
    });

    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch (error) {
    console.error("Error retrieving users:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Error retrieving users.",
      },
      { status: 500 }
    );
  }
};
