import express from 'express';
import { tweetRouter } from './resources/tweet';

export const RestRouter = express.Router();
RestRouter.use('/tweets', tweetRouter);
