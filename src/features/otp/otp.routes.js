import express from 'express';
import { OtpController } from './otp.controller.js';

const otpRouter = express.Router();
const otpController = new OtpController();


otpRouter.post('/send', (req, res) => {
    otpController.sendOtp(req, res);
});


otpRouter.post('/verify', (req, res) => {
    otpController.verifyOtp(req, res);
});

otpRouter.put('/reset-password', (req, res) => {
    otpController.resetPassword(req, res);
});

export default otpRouter;