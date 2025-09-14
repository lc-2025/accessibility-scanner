import { fetchClient } from '../client';
import { ROUTE } from './constants';
import type { TScans } from '../types/api';

const { HOME, SCAN } = ROUTE;

/**
 * @description Scans getter
 * Retrieves multiple scans
 * @author Luca Cattide
 * @param {number} limit
 * @param {number} skip
 * @returns {*}  {Promise<TScans>}
 */
const getScans = async (limit: number, skip: number): Promise<TScans> => {
  const { data } = await fetchClient.get(
    `${HOME.PATH}${SCAN.PATH}/${SCAN.LIST.PATH}?limit=${limit}&skip=${skip}`,
  );

  return data;
};

export { getScans };
