
import { NextResponse } from "next/server";




export async function GET( ){
    try {
        const data = NextResponse.json({
            message:"USer LoggedOut Successfully!!",
            success:true,
            status:200
        })
        data.cookies.set("token","",{httpOnly:true,expires:new Date(0)});
        return data;
    } catch (error:any) {
        return Response.json({error: error.message},
            {status: 500}
        );
    }
}