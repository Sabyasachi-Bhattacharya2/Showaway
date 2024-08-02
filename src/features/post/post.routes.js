import express from 'express';
import jwtAuth from '../../middlewares/jwt.middleware.js';
import PostController from './post.controller.js';


const postRouter = express.Router();
const postController = new PostController();

postRouter.post('/posts', jwtAuth, (req, res) => {
   postController.createPost(req, res); 
});

postRouter.get('/posts/all', (req, res) => {
   postController.getAllPosts(req, res);
});

// access to Api link for retrieving an user specific post
postRouter.get('/posts', jwtAuth,(req, res) => {
   postController.getUserSpecificPost(req, res);
});

postRouter.get('/posts/:postId', (req, res) => {
   postController.getSpecificPostByPostID(req, res);
});

postRouter.delete('/posts/:postId', jwtAuth,(req, res) => {
   postController.deletePost(req, res);
});

export default postRouter;