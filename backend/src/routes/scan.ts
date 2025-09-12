import { Router } from 'express';
import { ROUTES } from '../utils/constants';
import {
  getScans,
  getScan,
  postScan,
  putScan,
  deleteScan,
} from '../controllers/scan';

// Router
const routerScan = Router();

// Routes - Scan
routerScan.post('', postScan);
routerScan.get(ROUTES.API.SCAN.GET_ALL, getScans);
routerScan.get(ROUTES.API.SCAN.GET, getScan);
routerScan.put(ROUTES.API.SCAN.GET, putScan);
routerScan.delete(ROUTES.API.SCAN.GET, deleteScan);

export default routerScan;
