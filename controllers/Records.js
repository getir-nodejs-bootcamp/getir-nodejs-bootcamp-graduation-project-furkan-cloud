const Service = require('../services/Records');
const RecordService = new Service();
const ApiError = require('../errors/ApiError');

// Request handler
exports.getData = async (req, res, next) => {
  console.log(`req.body`, req.body);

  // Assign endDate to variable for modifying date
  const endDate = new Date(req.body.endDate);

  const pipeline = [
    {
      // Query for createdAt property
      $match: {
        createdAt: {
          $gte: new Date(req.body.startDate),
          $lte: new Date(endDate.setHours(23, 59, 59, 999)),
        },
      },
    },
    {
      // Add totalCount field to response payload
      $addFields: {
        totalCount: {
          $reduce: {
            input: '$counts',
            initialValue: 0,
            in: { $add: ['$$value', '$$this'] },
          },
        },
      },
    },
    {
      // Query for totalCount property
      $match: {
        totalCount: { $gte: req.body.minCount, $lte: req.body.maxCount },
      },
    },
    {
      // Remove unneccessary fields from response payload
      $project: {
        _id: 0,
        value: 0,
      },
    },
  ];

  // Request object for get data from API
  const records = await RecordService.list(pipeline)
    .then((data) => {
      if (!data) {
        return next(ApiError.notFound('No data found with that query', 404));
      }
      res.status(200).json({
        code: 0,
        msg: 'Success',
        records: data,
      });
    })
    .catch((err) =>
      next(
        ApiError.internalError('Something wrong happened in internal server')
      )
    );
};
