import PostRepository from "./post.repository.js";

export default class PostController {
    constructor() {
        this.postRepository = new PostRepository();
    }


    // Controller Function for creating a new post 
    async createPost(req, res) {
        const userId = req.userID;
        const {data, imageUrl, caption} = req.body;
        const newPost = await this.postRepository.createNewPost({
            user: userId,
            data: data,
            imageUrl: imageUrl,
            caption: caption
        });
        console.log("NEWPOST CREATED" + newPost);
        res.status(201).send(newPost);
    }


    // Function returning all posts irrespective of the user
    async getAllPosts(req, res) {
        const posts = await this.postRepository.getAllUserPosts();
        res.status(200).send(posts);
    }

    // Controller function for retrieving an user specific post
    async getUserSpecificPost(req, res) {
        const userId = req.userID;
        const userPost = await this.postRepository.getAllUserSpecificPosts(userId);
        console.log('THIS IS THE USERPOST'+ userPost);
        res.status(200).send(userPost);
    }

    // Controller function for retrieving a post based on Id
    async getSpecificPostByPostID(req, res) {
        const postID = req.params.postId;
        const post = await this.postRepository.getASpecificPostByPostId(postID);
        res.status(200).send(post);
    }

    // Controller function for deleting a post
    // Deletes a specific post userAuth required
    async deletePost(req, res) {
        const postID = req.params.postId;
        const userID = req.userID;
        const deletedPost = this.postRepository.deleteAPost(postID, userID);
        if(!deletedPost) {
            return res.status(404).send('Unauthorized');
        }

        res.status(201).send('Post deleted successfully');
    }

}