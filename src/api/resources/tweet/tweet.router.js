import express from 'express';
import passport from 'passport';

import tweetController from './tweet.controller.js';
import { isArtist } from '../../middlewares/is-artist.js';

const artistPolicy = [passport.authenticate('jwt', { session: false }), isArtist];

export const tweetRouter = express.Router();
tweetRouter
  .route('/')
  .post(artistPolicy, tweetController.create)
  .get(passport.authenticate('jwt', { session: false }), tweetController.findAll);

tweetRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), tweetController.findOne)
  .delete(artistPolicy, tweetController.delete)
  .put(artistPolicy, tweetController.update);
