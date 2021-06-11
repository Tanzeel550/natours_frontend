import axios from 'axios';
import { REQUEST_TIMEOUT, TOURS_API_BASE_URL } from '../config';
import { setTours } from '../reducers/tourReducer';
import { setErrorAlert } from '../reducers/alertReducer';
import configStore from '../store/configStore';

const instance = axios.create({
  baseURL: TOURS_API_BASE_URL,
  timeout: REQUEST_TIMEOUT
});

export const startGetTours = () => async (dispatch: typeof configStore.dispatch): Promise<void> => {
  try {
    const { data } = await instance.get('');
    dispatch(setTours(data.data.data));
  } catch (e) {
    dispatch(setErrorAlert(e.response?.data?.message || e.message));
  }
};
