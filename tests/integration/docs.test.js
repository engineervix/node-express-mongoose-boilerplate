const request = require('supertest');
const httpStatus = require('http-status');
const config = require('../../src/config/config');

describe('GET /v1/docs', () => {
  afterEach(() => {
    process.env.NODE_ENV = 'test';
    config.env = process.env.NODE_ENV;
    jest.resetModules();
  });
  const envs = [
    // [env, status]
    ['test', httpStatus.OK],
    ['development', httpStatus.OK],
    ['production', httpStatus.NOT_FOUND],
  ];
  test.each(envs)('when running in %p, should return %i', async (env, status) => {
    process.env.NODE_ENV = env;
    const app = require('../../src/app'); // eslint-disable-line global-require
    await request(app).get('/v1/docs/').expect(status);
  });
});
