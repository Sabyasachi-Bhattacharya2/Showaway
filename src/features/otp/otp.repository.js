import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import { UserModel } from '../user/user.repository.js';
import bcrypt from 'bcrypt';
import { otpSchema } from './otp.schema.js';
import {ObjectId} from 'mongoose';

const OtpModel = mongoose.model('Otp', otpSchema);
export default class OtpRepository {
    async sendEmailOtp(email) {
        const user = await UserModel.findOne({email: email});
        if(!user) {
            return "User not found";
        }
        console.log(user);
        const otpDb = new OtpModel({
            user: user._id,

        });
        await otpDb.save();
        const transporter = nodemailer.createTransport({
            service: 'Outlook',
            auth: {
                user:"bhattacharyasabyasachi2@outlook.com",
                pass: "borpxhqdnilsztwy"
            }
        });

        const mailOptions = {
            from: "bhattacharyasabyasachi2@outlook.com",
            to: email,
            subject: "OTP",
            text:`The password reset OTP is ${otpDb.otp.toString()}`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                console.log(error);
            } else {
                console.log("Email sent "+info);
            }
        })
    }

    async verifyEmailOtp(otp, email) {
        const user = await UserModel.findOne({email: email.toString()});
        if(!user) {
            console.log("User not found");
            return false;
        }
        console.log(user);
        const otpFromDB = await OtpModel.findOne({user: user._id});
        console.log(otpFromDB);
        console.log(`otpFromDB.otp == otp ${otp} ${otpFromDB.otp}`)
        return otpFromDB.otp == otp;   
    }

    async resetEmailPassword(email, newPassword) {
        const user = await UserModel.findOne({email});
        if(!user) {
            return "User not found";
        }

        user.hashedPassword = await bcrypt.hash(newPassword, 12);
        await user.save();
        return "Password updated Successfully";
    }
}