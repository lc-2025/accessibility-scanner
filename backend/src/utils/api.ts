import { Request, Response } from 'express';
import Joi from 'joi';
import puppeteer from 'puppeteer';
import { loadPage } from '@axe-core/puppeteer';
import { SCAN } from './constants';
import TQueryFilter from '../types/api/Query';
import { Status, TScanResults } from '../types/models/Scan';

/**
 * @description Date setter
 * Convers timestamp string to valid Date ISO format
 * @author Luca Cattide
 * @param {string} timestamp
 * @returns {*}  {(Date | string)}
 */
const setDate = (timestamp: string): Date | string =>
  timestamp && timestamp !== '' ? new Date(timestamp) : timestamp;

/**
 * @description Query filter setter
 * Sets the query search element to match
 * @author Luca Cattide
 * @param {*} data
 * @param {boolean} [parse]
 * @returns {*}  {TQueryFilter}
 */
const setFilter = (data: any, parse?: boolean): TQueryFilter => {
  data = parse ? JSON.parse(data as string) : data;

  return {
    id: {
      $in: data,
    },
  };
};

/**
 * @description Request validation helper
 * Checks the integrity of querystring and body sent data
 * @author Luca Cattide
 * @param {Request} request
 * @param {Response} response
 * @param {Joi.ObjectSchema<any>} schema
 */
const validateRequest = (
  request: Request,
  response: Response,
  schema: Joi.ObjectSchema<any>,
): void => {
  const { error } = schema.validate({
    ...request.params,
    ...request.query,
    ...request.body,
  });

  // Validation check
  if (error) {
    response.status(409).send(error.details[0].message);
  }
};

/** URL tests helper
 * Performs accessibility test on the provided set of URLs
 * @description
 * @author Luca Cattide
 * @param {Array<string>} urls
 * @returns {*}  {Promise<TScanResults[]>}
 */
const testUrls = async (urls: Array<string>): Promise<TScanResults[]> =>
  await Promise.all(
    urls.map(async (url) => {
      let scanResult = SCAN;

      try {
        scanResult = {
          ...scanResult,
          url,
          status: Status.Running,
        };

        // Chrome shell is less stable but more efficient in performance
        const browser = await puppeteer.launch({ headless: 'shell' });
        const axeBuilder = await loadPage(browser, url);
        const results = await axeBuilder.analyze();

        scanResult.status = Status.Pending;

        // Results check
        if (results) {
          const { timestamp, violations } = results;

          scanResult = {
            ...scanResult,
            status: Status.Done,
            timestamp,
            violations,
          };
        }

        await browser.close();

        return scanResult;
      } catch (error) {
        console.error(error);
        scanResult.status = Status.Error;

        return scanResult;
      }
    }),
  );

export { setDate, setFilter, validateRequest, testUrls };
