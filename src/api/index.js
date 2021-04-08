import express from 'express';

// own modules
import { tweetRouter } from './resources/tweet/index.js';
import { userRouter } from './resources/user/user.router.js';

export const RestRouter = express.Router();
RestRouter.use('/tweets', tweetRouter);
RestRouter.use('/users', userRouter);
