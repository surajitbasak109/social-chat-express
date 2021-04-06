import express from 'express';
import tweetController from './tweet.controller';

export const tweetRouter = express.Router();
tweetRouter
  .route('/')
  .post(tweetController.create)
  .get(tweetController.findAll);
