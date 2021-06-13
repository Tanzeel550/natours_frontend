import axios from 'axios';
import {
  BOOKINGS_API_BASE_URL,
  NATOURS_REACT,
  REQUEST_TIMEOUT,
} from '../config';
import { addBooking } from '../reducers/bookingsReducer';
import { setErrorAlert, setSuccessAlert } from '../reducers/alertReducer';
import { AppDispatch } from '../store/configStore';
import { clearLoading, setLoading } from '../reducers/loadingReducer';

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

export const startReceiveSession =
  (tourId: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
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
      const { data } = await createInstance().post(`/tour/${tourId}/booking`);
      dispatch(addBooking(data.data));
      dispatch(clearLoading());
      dispatch(
        setSuccessAlert({ message: 'The Booking was created successfully' })
      );
    } catch (e) {
      setErrorAlert({ message: e.response?.data?.message || e.message });
    }
  };
