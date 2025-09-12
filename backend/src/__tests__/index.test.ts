import { Server } from 'http';
import request from 'supertest';
import mongoose from 'mongoose';
import server from '../index';
import { ROUTES, TEST } from '../utils/constants';

// Backend Unit Test
describe('Backend Unit Test', () => {
  let app: Server;
  // Increasing timeout for CI environment if needed
  const { TIMEOUT } = TEST;

  // Helpers
  /**
   * @description Server connection closer
   * Ends the server connection
   * @author Luca Cattide
   * @returns {*}  {Promise<void>}
   */
  const closeConnection = async (): Promise<void> => {
    app = await server;

    app.close();
  };

  // Setup
  beforeAll(async () => {
    await closeConnection();
  }, TIMEOUT);
  // Tests
  it(
    'Checks if the server is actually running - Needs running node process',
    async () => {
      await request(app)
        .get(ROUTES.BASE_PATHNAME)
        .expect('Content-Type', /text/)
        .expect(200);
    },
    TIMEOUT,
  );
  // Indexing tests to output a well-organized testing report
  require('./routes/scan.test');
  // Teardown
  afterEach(async () => {
    await closeConnection();
  }, TIMEOUT);
  afterAll(() => mongoose.connection.close(), TIMEOUT);
});
