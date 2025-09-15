import { fetchClient, queryClient } from '../client';
import { API, ROUTE } from './constants';
import type { TApiResponse, TScan, TScans } from '../types/api';

const { HOME, SCAN } = ROUTE;

/**
 * @description Existing scans checker
 * Verifies if a single or a set of URLs have been already tested
 * @author Luca Cattide
 * @param {Array<string>} urls
 * @returns {*}  {Promise<{ exist: boolean; urls: Array<string> }>}
 */
const isExisting = async (
  urls: Array<string>,
): Promise<{ exist: boolean; urls: Array<string> }> => {
  const { data } = await queryClient.fetchQuery({
    queryKey: [API.TOKEN.GET_SCANS],
    queryFn: () => getScans(),
  });
  const existingUrls: Array<string> = [];

  return {
    exist:
      data &&
      data.some(({ id, url }) => {
        // Existing check - Keep track of existing ones in order to be updated
        if (urls.includes(url)) {
          existingUrls.push(id);

          return true;
        }
      })
        ? true
        : false,
    urls: existingUrls,
  };
};

/**
 * @description Scan setter
 * Runs and saves one or multiple URL scans
 * @author Luca Cattide
 * @date 15/09/2025
 * @param {Array<string>} urls
 * @returns {*}  {Promise<TApiResponse | TScan>}
 */
const postScan = async (
  urls: Array<string>,
): Promise<TApiResponse | TScan[]> => {
  const check = await isExisting(urls);

  // Existing check - Avoid re-create same record - Update it instead by performing a new test on it
  return check.exist
    ? await Promise.all(check.urls.map(async (id) => await putScan(id)))
    : await fetchClient.post(`${HOME.PATH}${SCAN.PATH}`, {
        urls,
      });
};

/**
 * @description Scans getter
 * Retrieves multiple scans
 * @author Luca Cattide
 * @param {number} [limit]
 * @param {number} [skip]
 * @returns {*}  {Promise<TScans>}
 */
const getScans = async (limit?: number, skip?: number): Promise<TScans> => {
  const { data } = await fetchClient.get(
    `${HOME.PATH}${SCAN.PATH}/${SCAN.LIST.PATH}${limit && skip ? `?limit=${limit}&skip=${skip}` : limit ? `?limit=${limit}` : skip ? `?skip=${skip}` : ''}`,
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
 * @description Scan putter
 * Updates a single scan
 * @author Luca Cattide
 * @param {string} id
 * @returns {*}  {Promise<TScan>}
 */
const putScan = async (id: string): Promise<TScan> => {
  const { data } = await fetchClient.put(`${HOME.PATH}${SCAN.PATH}/${id}`);

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
