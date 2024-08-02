import mongoose from "mongoose";

export const friendListArray = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    acceptanceStatus: {
        type: Boolean,
        default: false
    }
}); 



export const friendSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    friendList: [friendListArray]
});