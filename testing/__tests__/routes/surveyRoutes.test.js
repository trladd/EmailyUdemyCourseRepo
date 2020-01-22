const request = require('supertest')
const app = require('../../../index')

const mockReq = require('../../testUtils/mockRequest');
console.log(mockReq)
describe('Get surveys', () => {
  it('should get a survey', async () => {
    const res = await request(app)
      .get('/api/surveys',mockReq)
    expect(res.statusCode).toEqual(200)
  })
})