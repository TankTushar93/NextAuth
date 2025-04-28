import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";


connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqbody = await request.json();
        const { token } = reqbody;
        console.log(reqbody);

        //check user is already there
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });
        if (!user) {
            return NextResponse.json({ error: "User Does Not exist" }, { status: 400 });
        }
        console.log(user);

        if (Date.now() > user.verifyTokenExpiry) {
            return NextResponse.json({ error: "Token Expired" }, { status: 400 });
        } 

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        const updatedUser = await user.save();

        return NextResponse.json({
            message: "User verified successfully",
            success: true,
            updatedUser,
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}