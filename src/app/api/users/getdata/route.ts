import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectDB();

export async function GET(request: NextRequest) {
  try {
    // 1. Read the token from cookies
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Verify the token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);

    const userId = (decodedToken as { id: string }).id;

    // 3. Find the user by ID
    const user = await User.findById(userId).select("-password"); // Don't return password

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 4. Return name and email
    return NextResponse.json({
      name: user.name,
      email: user.email,
    });
    
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
