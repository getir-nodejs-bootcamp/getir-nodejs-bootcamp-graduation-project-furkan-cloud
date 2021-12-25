const express = require('express');
const config = require('./config');
const loaders = require('./loaders');

const app = express();

// Run config files and loaders
config();
loaders();

// Middlewares
app.use(express.json());

// Listen server and routes
app.listen(process.env.APP_PORT, () => {
  console.log('Server is running');
});
