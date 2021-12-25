const express = require('express');
const config = require('./config');
const router = require('./routes');
const loaders = require('./loaders');

const app = express();

config();
loaders();

app.use(express.json());

app.listen(process.env.APP_PORT, () => {
  console.log('Server is running');
  app.use('/', router);
});
