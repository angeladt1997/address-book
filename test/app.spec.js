
const app = require('../src/app')

describe('App', () => {
  it('GET / responds with 200 containing address', () => {
    return supertest(app)
      .get('/')
      .expect(200, "address")
  })
})