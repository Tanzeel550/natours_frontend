import axios from 'axios';
import {
  BOOKINGS_API_BASE_URL,
  NATOURS_REACT,
  REQUEST_TIMEOUT,
} from '../config';
import { setErrorAlert, setSuccessAlert } from '../reducers/alertReducer';
import { AppDispatch } from '../store/configStore';
import { clearLoading, setLoading } from '../reducers/loadingReducer';
import { loadStripe } from '@stripe/stripe-js';
import { STRIPE_PUBLIC_KEY } from '../env';

const createInstance = () => {
  return axios.create({
    baseURL: BOOKINGS_API_BASE_URL,
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    timeout: REQUEST_TIMEOUT,
  });
};

export const getMyBookings = async (): Promise<any> => {
  try {
    const { data } = await createInstance().get('/my-booked-tours');
    return data.data;
  } catch (e) {}
};

export const startReceiveSession = async (tourId: string): Promise<void> => {
  try {
    const { data } = await createInstance().post(
      `/tour/${tourId}/create-session`,
      {
        frontend_url: NATOURS_REACT,
      }
    );
    return data.session;
  } catch (e) {
    setErrorAlert({ message: e.response?.data?.message || e.message });
  }
};

export const startBookTour =
  (tourId: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch(setLoading());
      const session = await startReceiveSession(tourId);
      console.log(session);
      const stripe = await loadStripe(STRIPE_PUBLIC_KEY);
      await stripe?.redirectToCheckout({
        // @ts-ignore
        sessionId: session.id,
      });
      dispatch(clearLoading());
      dispatch(
        setSuccessAlert({ message: 'The Booking was created successfully' })
      );
    } catch (e) {
      setErrorAlert({ message: e.response?.data?.message || e.message });
    }
  };
