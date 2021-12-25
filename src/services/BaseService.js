// Base Service for all of the services
class BaseService {
  constructor(model) {
    this.BaseModel = model;
  }

  // common methods for services
  list(where) {
    return this.BaseModel?.aggregate(where || {});
  }
}

module.exports = BaseService;
