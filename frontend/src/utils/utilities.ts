import { CACHE } from './constants';

/**
 * @description Cache enabler
 * Sets the cache on production environment
 * @author Luca Cattide
 * @returns {*}  {number}
 */
const enableCache = (): number => (import.meta.env.PROD ? CACHE : 0);

export { enableCache };
