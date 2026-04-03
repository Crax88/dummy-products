import axios from 'axios';
import { CONFIG } from '../model/config';

export const api = axios.create({
  baseURL: CONFIG.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
