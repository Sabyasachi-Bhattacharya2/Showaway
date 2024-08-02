import express from 'express';
import { CommentController } from './comment.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';


const commentRouter = express.Router();
const commentController = new CommentController();

commentRouter.get('/:postId', (req, res) => {
    commentController.getComment(req, res);
}); // Route to the postId 


commentRouter.post('/:postId', jwtAuth, (req, res) => {
    commentController.createComment(req, res);
});

commentRouter.delete('/:commentId', jwtAuth, (req, res) => {
    commentController.deleteComment(req, res);
});

commentRouter.put('/:commentId', jwtAuth, (req, res) => {
    commentController.updateComment(req, res);
});


export default commentRouter;