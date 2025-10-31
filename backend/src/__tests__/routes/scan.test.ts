import { Server } from 'http';
import request from 'supertest';
import server from '../../index';
import { ROUTES, MESSAGE, TEST } from '../../utils/constants';

// Scan API Unit Test
describe('Scan API Unit Test - REST', () => {
  let app: Server;
  let response: any = null;
  // Increasing timeout for CI environment if needed
  const { TIMEOUT, ID } = TEST;

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

  /**
   * @description Scan run helper
   * Send a scan run request
   * @author Luca Cattide
   * @date 12/09/2025
   * @returns {*}  {Promise<void>}
   */
  const runScans = async (): Promise<void> => {
    response = await request(app)
      .post(`${ROUTES.API.BASE_PATHNAME}`)
      .send({ urls: TEST.URLS })
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).not.toBeNull();
    expect(response.body.result).toBe(MESSAGE.RUN);
  };

  /**
   * @description Scans list helper
   * @author Luca Cattide
   * @date 12/09/2025
   * @returns {*}  {Promise<void>}
   */
  const getScans = async (): Promise<void> => {
    response = await request(app)
      .get(`${ROUTES.API.BASE_PATHNAME}${ROUTES.API.SCAN.GET_ALL}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.data.length).toBeGreaterThan(0);
  };

  /**
   * @description Scan initialization helper
   * Defines a series of mocked data to test
   * @author Luca Cattide
   * @date 12/09/2025
   * @returns {*}  {Promise<string>}
   */
  const initScan = async (): Promise<string> => {
    await runScans();
      await closeConnection();
      await getScans();
      await closeConnection();

      return response.body.data[0].id;
  }

  /**
   * @description Scan ID assertion helper
   * @author Luca Cattide
   * @date 12/09/2025
   * @param {boolean} [multiple]
   * @param {string} [id]
   */
  const assertId = (multiple?: boolean, id?: string): void => {
    expect(response.body).not.toBeNull();
    expect(multiple ? response.body[0].id : response.body.id).toBe(id ?? ID);
  };

  // Setup
  beforeEach(async () => {
    await closeConnection();
  }, TIMEOUT);
  // Tests
  it(
    'Runs new scans',
    async () => {
      await runScans();
    },
    TIMEOUT,
  );
  it(
    'Gets a specific scan by ID',
    async () => {
      const id = await initScan();

      response = await request(app)
        .get(`${ROUTES.API.BASE_PATHNAME}/${id}`)
        .expect('Content-Type', /json/)
        .expect(200);

      assertId(false, id);
    },
    TIMEOUT,
  );
  it(
    'Gets a list of scans',
    async () => {
      await getScans();
    },
    TIMEOUT,
  );
  it(
    'Updates a specific scan by ID',
    async () => {
      const id = await initScan();

      response = await request(app)
        .put(`${ROUTES.API.BASE_PATHNAME}/${id}`)
        .expect(200);
    },
    TIMEOUT,
  );
  it(
    'Deletes a specific scan by ID',
    async () => {
      const id = await initScan();

      response = await request(app)
        .delete(`${ROUTES.API.BASE_PATHNAME}/${id}`)
        .expect('Content-Type', /json/)
        .expect(200);

      assertId(false, id);
    },
    TIMEOUT,
  );
  it(
    'Returns an error on unexpected user input',
    async () => {
      response = await request(app)
        .get(`${ROUTES.API.BASE_PATHNAME}/foo`)
        .expect('Content-Type', /json/)
        .expect(500);
    },
    TIMEOUT,
  );
  it(
    'Returns an error on missing user input',
    async () => {
      response = await request(app)
        .post(`${ROUTES.API.BASE_PATHNAME}`)
        .expect('Content-Type', /json/)
        .expect(400);

      expect(response.body.message).toContain(MESSAGE.MISSING);
    },
    TIMEOUT,
  );
  // Teardown
  afterEach(async () => {
    await closeConnection();
  }, TIMEOUT);
});
