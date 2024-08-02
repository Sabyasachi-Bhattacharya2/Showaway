import mongoose from "mongoose";


export const likeSchema = new mongoose.Schema({
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'on_model'
    },
    on_model: {
        type: String,
        enum: ['Post', 'Like']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likeCount: {
        type: Number,
        default: 0
    },
    likeStatus: {
        type: Boolean,
        default: false
    }
});