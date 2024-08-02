import mongoose from "mongoose";
import { postSchema } from "./post.schema.js";


const PostModel = mongoose.model("Post", postSchema);

export default class PostRepository {
    async createNewPost(post) {
        const newPost = new PostModel(post);
        await newPost.save();
        return newPost;
    }

    async getAllUserPosts() {
        return await PostModel.find();
    }

    async getAllUserSpecificPosts(userId) {
        const userPosts = await PostModel.find({user: userId});
        return userPosts;
    } 

    async getASpecificPostByPostId(postID) {
        const post = await PostModel.find({_id: postID});
        return post;
    }

    async deleteAPost(postID, userID) {
        const deletedPost = await PostModel.findOneAndDelete({
            _id: postID,
            user: userID
        });
        return deletedPost; 
    }
}