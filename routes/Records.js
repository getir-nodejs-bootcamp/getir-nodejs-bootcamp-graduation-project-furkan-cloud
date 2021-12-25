const express = require('express');
const recordController = require('../controllers/Records');
const schemas = require('../validations/Records');
const validate = require('../middlewares/validate');

const router = express.Router();

// Record API routes
router
  .route('/')
  .post(validate(schemas.getRecords, 'body'), recordController.getData);

module.exports = router;
