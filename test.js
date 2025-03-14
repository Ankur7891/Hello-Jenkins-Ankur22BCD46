const request = require('supertest');
const app = require('./index');

describe('GET /', () => {
  let server;

  beforeAll(() => {
    server = app.listen(8081);
  });

  afterAll((done) => {
    server.close(() => {
      done();
    });
  });

  it('should return: Name, Roll No. saying Hello!', async () => {
    const res = await request(server).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Ankur Majumdar (2022BCD0046) Says Hello!!!');
  });
});
