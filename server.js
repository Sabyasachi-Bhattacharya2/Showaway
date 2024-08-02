import express from 'express';
import { connectUsingMongoose } from './src/config/mongoose.config.js';
import userRouter from './src/features/user/user.routes.js';
import postRouter from './src/features/post/post.routes.js';
import commentRouter from './src/features/comment/comment.routes.js';
import likeRouter from './src/features/like/like.routes.js';
import friendRouter from './src/features/friends/friend.routes.js';
import otpRouter from './src/features/otp/otp.routes.js';

const server = express();

server.use(express.json());



server.use('/api/users', userRouter);

server.use('/api/comments', commentRouter);

server.use('/api/likes', likeRouter);

server.use('/api/otp', otpRouter);

server.use('/api/friends', friendRouter );

server.use('/api', postRouter);




server.listen(4000, () => {
    console.log("Server is running at 4000");
    connectUsingMongoose();
})