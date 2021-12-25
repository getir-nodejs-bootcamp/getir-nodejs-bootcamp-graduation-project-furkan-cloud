const Service = require('../services/Records');
const RecordService = new Service();

// Request handler
exports.getData = async (req, res) => {
  console.log(`req.body`, req.body);

  // Assign endDate to variable for modifying date
  const endDate = new Date(req.body.endDate);

  // Request object for get data from API
  const records = await RecordService.list([
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
  ]).exec((err, data) => {
    // Response payload for unsuccessful request
    if (err) console.log(err);

    // Response payload for successful request
    return res.status(200).json({
      code: 0,
      msg: 'Success',
      records: data,
    });
  });
};
