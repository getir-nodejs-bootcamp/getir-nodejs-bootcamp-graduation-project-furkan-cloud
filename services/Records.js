const BaseService = require('./BaseService');
const BaseModel = require('../models/Records');

// BaseService instance for Records
class Records extends BaseService {
  constructor() {
    super(BaseModel);
  }
}

module.exports = Records;
