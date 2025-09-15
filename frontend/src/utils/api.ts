import { fetchClient } from '../client';
import { ROUTE } from './constants';
import type { TApiResponse, TScan, TScans } from '../types/api';

const { HOME, SCAN } = ROUTE;

/**
 * @description Scan setter
 * Runs and saves one or multiple URL scans
 * @author Luca Cattide
 * @date 15/09/2025
 * @param {Array<string>} urls
 * @returns {*}  {Promise<TApiResponse>}
 */
const postScan = async (urls: Array<string>): Promise<TApiResponse> =>
  await fetchClient.post(`${HOME.PATH}${SCAN.PATH}`, {
    urls,
  });

/**
 * @description Scans getter
 * Retrieves multiple scans
 * @author Luca Cattide
 * @param {number} limit
 * @param {number} skip
 * @returns {*}  {Promise<TApiResponse>}
 */
const getScans = async (limit: number, skip: number): Promise<TScans> => {
  const { data } = await fetchClient.get(
    `${HOME.PATH}${SCAN.PATH}/${SCAN.LIST.PATH}?limit=${limit}&skip=${skip}`,
  );

  return data;
};

/**
 * @description Scan getter
 * Retrieves a single scan
 * @author Luca Cattide
 * @date 14/09/2025
 * @param {string} id
 * @returns {*}  {Promise<TApiResponse>}
 */
const getScan = async (id: string): Promise<TScan> => {
  const { data } = await fetchClient.get(`${HOME.PATH}${SCAN.PATH}/${id}`);

  return data;
};

/**
 * @description Scan deleter
 * Remove a single scan
 * @author Luca Cattide
 * @param {string} id
 * @returns {*}  {Promise<TApiResponse>}
 */
const deleteScan = async (id: string): Promise<TApiResponse> =>
  await fetchClient.delete(`${HOME.PATH}${SCAN.PATH}/${id}`);

export { deleteScan, getScan, getScans, postScan };
