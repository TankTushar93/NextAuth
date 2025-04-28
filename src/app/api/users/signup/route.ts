import {connectDB} from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectDB();


export  async function POST(request: NextRequest) {
    try {
     const reqbody = await request.json();  
     const {name, email, password} = reqbody;
     console.log(reqbody);

     //check user is already there

  const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400});
        }
     
        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        //send verification email

        await sendEmail({
            email,
            emailType: "VERIFY",
            userId: savedUser._id,  
        });

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser,
        });

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}