import mongoose from "mongoose";

export const otpSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },

    otp: {
        type: Number
    }, 

    expiresAt: {
        type: Date
    }

});


const randomNumber = () => Math.floor(1000 + (Math.random() * 9999));

otpSchema.pre('save', function(next) {
    
    if(this.isNew && !this.otp) {
        this.otp = randomNumber();
    }

    const now = new Date();
    this.expiresAt = new Date(now.getTime() + 5 * 60000);
    next();
});