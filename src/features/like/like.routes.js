import express from 'express';
import { LikeController } from './like.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

const likeRouter = express.Router();
const likeController = new LikeController();

likeRouter.get('/:id', (req, res) => {
    likeController.getLikes(req, res)
});

likeRouter.post('/toggle/:id', jwtAuth,(req, res) => {
    likeController.toogleLike(req, res);
});

export default likeRouter;