const express = require('express');
const recordController = require('../controllers/Records');
const schemas = require('../validations/Records');
const validate = require('../middlewares/validate');

const router = express.Router();

/**
 * @route   POST /records
 * @desc    Get filtered Records data
 * @access  Public
 */
router
  .route('/records')
  .post(validate(schemas.getRecords, 'body'), recordController.getData);

module.exports = router;
