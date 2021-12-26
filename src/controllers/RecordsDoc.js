// documentation
/**
 * @api {post} /records Get Records information
 * @apiVersion 0.0.0
 * @apiName getRecords
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