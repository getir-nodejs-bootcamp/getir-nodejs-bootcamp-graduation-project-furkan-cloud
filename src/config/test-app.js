const express = require('express');
const morgan = require('morgan');
const config = require('../config');
const router = require('../routes');
const loaders = require('../loaders');
const accessLogStream = require('../scripts/loggers/logger');
const errorHandler = require('../middlewares/errorHandler');

const app = express();

config(); // set env config
loaders(); // load db

// middlewares
app.use(express.json());
app.use(morgan('combined', { stream: accessLogStream })); // setup the logger

app.use('/', router);

// error middleware for unknown route requests
app.use((req, res, next) => {
  const error = new Error(`Can't find ${req.originalUrl} on this server!`);
  error.status = 404;
  error.errorCode = 1;
  next(error);
});

// error middleware for handling errors
app.use(errorHandler);

module.exports = app;
