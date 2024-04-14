import axios from 'axios';
import { getTokenFromLocalStorage } from '../helpers/localstorage.helper';

export const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    Authorization: `Bearer ` + getTokenFromLocalStorage() || '',
  },
});
