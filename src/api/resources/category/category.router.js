import express from 'express';
import passport from 'passport';

import categoryController from './category.controller.js';

const standardPolicy = [passport.authenticate('jwt', { session: false })];

export const categoryRouter = express.Router();

categoryRouter.route('/').post(standardPolicy, categoryController.create);
