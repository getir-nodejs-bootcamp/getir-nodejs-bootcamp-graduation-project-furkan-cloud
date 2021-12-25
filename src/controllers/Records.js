const Service = require('../services/Records');
const RecordService = new Service();
const ApiError = require('../errors/ApiError');

/**
 * @api {post} /records Get Records information
 * @apiVersion 0.0.0
 * @apiName getData
 * @apiGroup Records
 * 
 * @apiBody {String} startDate    Mandatory start date
 * @apiBody {String} endDate      Mandatory end date
 * @apiBody {Number} minCount     Mandatory positive min count (can be zero)
 * @apiBody {Number} maxCount     Mandatory positive max count
 *
 * @apiSuccess (200) {String} code                 Status For Request.
 * @apiSuccess (200) {String} msg                  Description Of The Code.
 * @apiSuccess (200) {Array} records               Filtered Items according to the request.
 * @apiSuccess (200) {String} records.key          Filtered Items according to the request.
 * @apiSuccess (200) {String} records.createdAt    Created Date of the record
 * @apiSuccess (200) {Number} records.totalCount   Sum of the counts of the record
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "code": 0,
 *       "msg": "Success",
 *       "records": [
 *            {
 *                  "key": "RXczioLf",
 *                  "createdAt": "2016-12-23T01:03:04.111Z",
 *                  "totalCount": 62
 *            },
 *            {
 *                  "key": "MEcffHVK",
 *                  "createdAt": "2016-12-02T19:02:04.249Z",
 *                  "totalCount": 68
 *            },
 *                   ]
 *      }
 *
 * @apiError (Error 4xx) NotFound          Response payload or page was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.2 404 Not Found
 *     {
 *       "code": 1,
 *       "msg": "No data found with that query"
 *     }
 * 
 * @apiError (Error 5xx) InternalServer    Server encountered an unexpected condition that prevented it from fulfilling the request.
 * @apiErrorExample Error-Response:
 *     HTTP/1.2 500 Internal Server Error
 *     {
 *       "code": 2,
 *       "msg": "Something wrong happened in internal server"
 *     }
 */

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
