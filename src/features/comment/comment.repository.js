import mongoose from "mongoose";
import { commentSchema } from "./comment.schema.js";




const CommentModel = mongoose.model('Comment', commentSchema);

export default class CommentRepository {

    async getCommentForPost(postId) {
        return await CommentModel.find({post: postId});
    }

    async createNewComment(postId, userId, commentText) {
        console.log("Level 11");
        const newComment = new CommentModel({
            post: postId,
            user: userId,
            comment: commentText
        });
        console.log("Level 12");
        await newComment.save();
        return newComment;
    }

    async deleteAComment(commentId, userID) {
        const deletedComment = await CommentModel.findOneAndDelete({
            _id: commentId,
            user: userID
        });
        return deletedComment;
    }

    async updateAComment(commentId, userId, commentText) {
        const updatedComment = await CommentModel.findOneAndUpdate({
            _id: commentId, user: userId
        }, 
        {
            $set: {comment: commentText}
        }, {
            new: true
        });

        return updatedComment;
    }
}