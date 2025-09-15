import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { RATE_LIMIT } from './utils/constants';

// Fetching Client
const fetchClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: RATE_LIMIT.WINDOW,
  // May be improved with XSFR token
});

// Query Client
const queryClient = new QueryClient();

declare global {
  interface Window {
    __TANSTACK_QUERY_CLIENT__: import('@tanstack/query-core').QueryClient;
  }
}

window.__TANSTACK_QUERY_CLIENT__ = queryClient;

export { fetchClient, queryClient };
