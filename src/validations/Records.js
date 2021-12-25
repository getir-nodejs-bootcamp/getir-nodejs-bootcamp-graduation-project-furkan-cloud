const Joi = require('joi').extend(require('@joi/date'));

// Validation for get request for records 
const getRecords = Joi.object({
  startDate: Joi.date().format('YYYY-MM-DD').utc().required(),
  endDate: Joi.date().required(),
  minCount: Joi.number().required().min(0),
  maxCount: Joi.number().required().positive(),
});

module.exports = {
  getRecords,
};
