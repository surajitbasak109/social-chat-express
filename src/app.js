// import third party pacakges
import express from 'express';
import logger from 'morgan';

// enable dotenv
require('dotenv').config();

// import own modules/components
import { RestRouter } from './api';
import { connect } from './config/db';

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

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

// use api router
app.use('/api', RestRouter);

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
