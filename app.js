const express = require('express');
const config = require('./config');
const router = require('./routes');
const loaders = require('./loaders');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

config();
loaders();

app.use(express.json());

app.listen(process.env.APP_PORT, () => {
  console.log('Server is running');
  app.use('/', router);

  app.use((req, res, next) => {
    const error = new Error(`Can't find ${req.originalUrl} on this server!`);
    error.status = 404;
    error.errorCode = 1;
    next(error);
  });

  app.use(errorHandler);
});
