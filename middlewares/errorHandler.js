const sendErrorDev = (err, res) => {
  console.log('errdev', err);
  res.status(err.status).json({
    status: err.status,
    stack: err.stack,
    code: err.errorCode,
    msg: err.message || 'Internal Server Error...',
  });
};

const sendErrorProd = (err, res) => {
  console.log('errprod', err);
  res.status(err.status).json({
    code: err.errorCode,
    msg: err.message || 'Internal Server Error...',
  });
};

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

module.exports = (err, req, res, next) => {
  console.log('Error middleware worked name', err);
  err.status = err.status || 500;

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    if (error.name === 'CastError') {
      error = handleCastErrorDB(error);
    }
    sendErrorProd(error, res);
  }
};
