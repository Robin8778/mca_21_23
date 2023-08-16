// domainToASCII.com/verfiytoken/assdas️
//domain.com/verfiytoken?token=adadasd

import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import User from "../models/userModel"

export const sendEmail=async({email,emailType,userId}:any)=>{
    try{


        //create a hashed token
        const hashedToken=await bcryptjs.hash(userId.toString(),10)

        if(emailType==="VERIFY"){
            await User.findByIdAndUpdate(userId,{
                verfiedToken:hashedToken,
                verifyTokenExpiry:Date.now()+360000
            })
        }
        else if(emailType==="RESET"){
            await User.findByIdAndUpdate(userId,{
                forgotPasswordToken:hashedToken,
                forgotPasswordTokenExpiry:Date.now()+360000
            })
        }

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "d419ac574bd355",
              pass: "0c16c7d734f455"
              //todo add these to .env file
            }
          });

          const mailOptions={
            from:"robin.007660@gmail.com",
            to:email,
            subject:emailType==="VERIFY"?"Verify Your Email":"Reset your password",
            html:`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>to 
            ${emailType==="VERIFY"?"verfiy your email":"reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
          }

          const mailresponse=await transport.sendMail(mailOptions);
          return mailresponse


       
    }catch(error:any){
        throw new Error(error.message)
    }
}


