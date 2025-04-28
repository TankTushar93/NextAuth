import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export const sendEmail = async({email, emailType, userId}:any) =>{
    try {
        const hashedtoken = await bcrypt.hash(userId.toString(),10);

        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,{verifyToken:hashedtoken,verifyTokenExpiry:Date.now() + 3600000});
        }else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashedtoken,forgotPasswordTokenExpiry:Date.now() + 3600000});
        }

       // Looking to send emails in production? Check out our Email API/SMTP product!
    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
        user: '70a62ab0ac6554',
        pass: 'b4be72ea78f0b6',
    }
});

console.log("NODEMAILER_USER:", process.env.NODEMAILER_USER);
console.log("NODEMAILER_PASSWORD:", process.env.NODEMAILER_PASSWORD);


        const mailOptions = {
         from: "tanktushar7@gmail.com",
         to: email,
         subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
         html: `<p>Click <a href="http://localhost:3000/verifyemail?token=${hashedtoken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
         or copy and paste this link in your browser. <br> ${process.env.BASE_URL}/verifyemail?token=${hashedtoken}
         </p>`
        }; 
        
       const mailresponse =  await transport.sendMail(mailOptions);
       return mailresponse;

    } catch (error:any) {
        throw new Error(error.message);
    }
}
