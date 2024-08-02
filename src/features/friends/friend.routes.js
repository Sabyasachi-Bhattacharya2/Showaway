import express from 'express';
import { FriendController } from './friend.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';


const friendRouter = express.Router();
const friendController = new FriendController();


friendRouter.get('/get-friends/:userId', (req, res) => {
    friendController.getFriends(req, res);
});

friendRouter.get('/get-pending-requests', jwtAuth,(req, res) => {
    friendController.getPendingRequests(req, res);
});

friendRouter.get('/toggle-friendship/:friendId', jwtAuth,(req, res) => {
    friendController.toggleFriendship(req, res);
});

friendRouter.get('/response-to-request/:friendId', jwtAuth,(req, res) => {
    friendController.acceptanceFriendship(req, res);
});

export default friendRouter;