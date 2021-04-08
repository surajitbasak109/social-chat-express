import express from 'express';
import passport from 'passport';

import tweetController from './tweet.controller.js';

export const tweetRouter = express.Router();
tweetRouter
  .route('/')
  .post(passport.authenticate('jwt', { session: false }), tweetController.create)
  .get(passport.authenticate('jwt', { session: false }), tweetController.findAll);

tweetRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), tweetController.findOne)
  .delete(passport.authenticate('jwt', { session: false }), tweetController.delete)
  .put(passport.authenticate('jwt', { session: false }), tweetController.update);
