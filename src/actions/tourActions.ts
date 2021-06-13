import axios from 'axios';
import { REQUEST_TIMEOUT, TOURS_API_BASE_URL } from '../config';

const instance = axios.create({
  baseURL: TOURS_API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
});

export const startGetTours = async () => {
  const { data } = await instance.get('');
  return data.data.data;
};
