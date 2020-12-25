const request = require('supertest');
const httpStatus = require('http-status');
const config = require('../../src/config/config');

describe('availability of /docs', () => {
  afterEach(() => {
    process.env.NODE_ENV = 'test';
    config.env = process.env.NODE_ENV;
    jest.resetModules();
  });
  const envs = [
    // [env, docs, status]
    ['test', 'available', httpStatus.OK],
    ['development', 'available', httpStatus.OK],
    ['production', 'unavailable', httpStatus.NOT_FOUND],
  ];
  test.each(envs)('in %p mode, /docs should be %p', async (env, docs, status) => {
    process.env.NODE_ENV = env;
    const routes = require('../../src/routes/v1'); // eslint-disable-line global-require
    const app = require('../../src/app'); // eslint-disable-line global-require
    // v1 api routes
    app.use('/v1', routes);
    await request(app).get('/v1/docs/').send().expect(status);
  });
});
