import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
     },
    comment: String
});

