const request = require('supertest');
const app = require('../config/test-app');

describe('Test the records route', () => {
  jest.setTimeout(10000);

  test('valid test', async () => {
    await request(app)
      .post('/records')
      .send({
        minCount: 69,
        maxCount: 70,
        startDate: '2016-01-28',
        endDate: '2016-01-28',
      })
      .expect(200);
  });
});
