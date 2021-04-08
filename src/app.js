// import third party pacakges
import express from 'express';
import logger from 'morgan';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import Passport from 'passport';

// enable dotenv
dotenv.config();

// import own modules/components
import { RestRouter } from './api/index.js';
import { connect } from './config/db.js';
import swaggerDocument from './config/swagger.js';
import { configJWTStrategy } from "./api/middlewares/passport-jwt.js";

// create express instance
const app = express();

// define port
const PORT = process.env.PORT || 3000;

// connect database
connect();

// log every request
if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}

// use passport initialize middleware
app.use(Passport.initialize());
configJWTStrategy();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

// use api router
app.use('/api', RestRouter);
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
  })
);

// middleware for invalid route
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.message = 'Invalid route';
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    error: {
      message: error.message,
    },
  });
});

// start the server
app.listen(PORT, () => {
  console.log(`Server is running at PORT http://localhost:${PORT}`);
});
