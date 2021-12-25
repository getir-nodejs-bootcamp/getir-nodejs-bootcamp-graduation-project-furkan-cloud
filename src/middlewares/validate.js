const httpStatus = require('http-status');

// validate middleware for validating request payload with Joi
const validate = (schema, source) => (req, res, next) => {
  const { value, error } = schema.validate(req[source]);

  // Format validation error
  if (error) {
    const errorMessage = error?.details
      ?.map((detail) => detail?.message)
      .join(', ');
    return res.status(httpStatus.BAD_REQUEST).send({ error: errorMessage });
  }
  Object.assign(req, value); // Assign error value to request payload
  return next(); // Pass to next middleware
};

module.exports = validate;
