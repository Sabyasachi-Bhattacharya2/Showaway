import mongoose from "mongoose";

export const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'User'
    },
    data: String,
    imageUrl: String,
    caption: String
});