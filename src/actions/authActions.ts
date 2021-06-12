import axios from 'axios';
import Cookies from 'js-cookie';
import { NATOURS_REACT, REQUEST_TIMEOUT, USERS_API_BASE_URL } from '../config';
import { AppDispatch } from '../store/configStore';
import { login, logout } from '../reducers/authReducer';
import { setErrorAlert, setSuccessAlert } from '../reducers/alertReducer';
import { clearLoading, setLoading } from '../reducers/loadingReducer';

const createInstance = () => {
  return axios.create({
    baseURL: USERS_API_BASE_URL,
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    },
    timeout: REQUEST_TIMEOUT
  });
};

export const startVerifyToken = () => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(setLoading())
    
    if (!localStorage.getItem('token')) throw new Error();
    const { data } = await createInstance().post('/verifyToken');
    const { token, user } = data;
    localStorage.setItem('token', token);
    dispatch(login({ token, user }));
    
    dispatch(clearLoading())
    dispatch(setSuccessAlert({ message: data.data }));
  } catch (e) {
    dispatch(setErrorAlert(e.response?.data?.message || e.message));
    Cookies.remove('token');
  }
};

export const startSendLoginEmail = (email: string, password: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(setLoading())
    const { data } = await createInstance().post(`${USERS_API_BASE_URL}/sendLoginEmail`, {
      email,
      password,
      linkToRedirect: `${NATOURS_REACT}/login`
    });

    dispatch(clearLoading())
    dispatch(setSuccessAlert({ message: data.data }));
  } catch (e) {
    dispatch(setErrorAlert(e.response?.data?.message || e.message));
  }
};

export const startLogin = (authToken: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(setLoading())

    const { data } = await createInstance().get(`${USERS_API_BASE_URL}/login/${authToken}`);
    const { token, user } = data;
    localStorage.setItem('token', token);
    dispatch(login({ token, user }));

    dispatch(clearLoading())
    dispatch(setSuccessAlert({ message: data.data }));
  } catch (e) {
    dispatch(setErrorAlert(e.response?.data?.message || e.message));
  }
};

export const startSignUp = (authToken: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(setLoading())

    const { data } = await createInstance().get(`${USERS_API_BASE_URL}/signup/${authToken}`);
    const { token, user } = data;
    localStorage.setItem('token', token);
    dispatch(login({ token, user }));
    
    dispatch(clearLoading())
    dispatch(setSuccessAlert({ message: data.data }));
  } catch (e) {
    dispatch(setErrorAlert(e.response?.data?.message || e.message));
  }
};

export const startSendSignUpEmail = (name: string, email: string, password: string, confirmPassword: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(setLoading())

    const { data } = await createInstance().post(`${USERS_API_BASE_URL}/sendSignUpEmail`, {
      name,
      email,
      password,
      confirmPassword,
      linkToRedirect: `${NATOURS_REACT}/sendSignUpEmail`
    });

    dispatch(clearLoading())
    dispatch(setSuccessAlert({ message: data.data }));
  } catch (e) {
    dispatch(setErrorAlert(e.response?.data?.message || e.message));
  }
};

export const startLogout = () => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(setLoading())

    await createInstance().get('/logout');
    dispatch(logout({}));
    Cookies.remove('token');

    dispatch(clearLoading())
    dispatch(setSuccessAlert({ message: 'You have logged out successfully' }));
  } catch (e) {
    dispatch(setErrorAlert(e.response?.data?.message || e.message));
  }
};

export const startUpdateMe = (data: object) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(setLoading())

    const res = await createInstance().put('/updateMe', data);
    // TODO
    // dispatch(setUser(res.data.data));

    dispatch(clearLoading())
    dispatch(setSuccessAlert({ message: 'You have been updated successfully' }));
  } catch (e) {
    dispatch(setErrorAlert(e.response?.data?.message || e.message));
  }
};

export const startUpdatePassword = (currentPassword: string,
                                    password: string,
                                    confirmPassword: string) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    dispatch(setLoading())

    await createInstance().put('/updatePassword', {
      currentPassword,
      password,
      confirmPassword
    });

    dispatch(clearLoading())
    dispatch(setSuccessAlert({ message: 'Your password has been updated successfully' }));
  } catch (e) {
    dispatch(setErrorAlert(e.response?.data?.message || e.message));
  }
};
