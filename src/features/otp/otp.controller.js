import OtpRepository from "./otp.repository.js";
import jwt from 'jsonwebtoken';

export class OtpController {
    constructor() {
        this.otpRepository = new OtpRepository();
    }

    async sendOtp(req, res) {
        const email = req.body.email;
        
        const otp = await this.otpRepository.sendEmailOtp(email);
        console.log(`OTP VERIFICATION SEND ${email}`);
        if(!otp) {
            return res.status(404).send("OTP generation unsuccesful");
        }
        res.status(201).send(otp);
    }

    async verifyOtp(req, res) {
        const otp = req.body.otp;
        const email = req.body.email;
        const isOtp = await this.otpRepository.verifyEmailOtp(otp, email);
        if(isOtp) {
            const token = jwt.sign({
                email: email,
                otp: otp
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            })
            return res.status(200).send(token);
        }
        res.status(404).send('Unauthorised');
    }

    async resetPassword(req, res) {
        const newPassword = req.body.newPassword;
        const token = req.headers.authorization;
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const decodedEmail = decoded.email;
        const response = await this.otpRepository.resetEmailPassword(decodedEmail, newPassword);
        res.send(response);
    }
}