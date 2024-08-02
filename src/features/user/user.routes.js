import express from 'express';
import UserController from './user.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';


const userRouter = express.Router();

const userController = new UserController();

userRouter.post('/signup', (req, res) => {
    userController.userSignup(req, res);
});

userRouter.post('/signin', (req, res) => {
    userController.userSignin(req, res);
});

userRouter.get('/logout', jwtAuth,(req, res) => {
    userController.userLogout(req, res);
})

userRouter.get('/get-details/:userId', jwtAuth, (req, res) => {
    userController.getDetails(req, res);
});

userRouter.get('/get-all-details', (req, res) => {
    userController.getAllDetails(req, res);
});
export default userRouter;