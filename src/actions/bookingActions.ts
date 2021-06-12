import axios from 'axios';
import {
  BOOKINGS_API_BASE_URL,
  NATOURS_REACT,
  REQUEST_TIMEOUT,
} from '../config';
import { addBooking, setBookings } from '../reducers/bookingsReducer';
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

export const startReceiveSession =
  (tourId: string) =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      const { data } = await createInstance().post(
        `/tour/${tourId}/create-session`,
        {
          cancel_url: `${NATOURS_REACT + '/tour/' + tourId}`,
          // success_url: `${NATOURS_REACT + '/createBooking/tour/' + id}`
          success_url: `${NATOURS_REACT}/my-bookings?alert=BOOKING`,
        }
      );
      return data.session;
    } catch (e) {
      dispatch(setErrorAlert(e.response?.data?.message || e.message));
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
      dispatch(setErrorAlert(e.response?.data?.message || e.message));
    }
  };

export const getMyBookings =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch(setLoading());
      const { data } = await createInstance().get('/my-booked-tours');
      dispatch(setBookings(data.data));
      dispatch(clearLoading());
    } catch (e) {
      dispatch(setErrorAlert(e.response?.data?.message || e.message));
    }
  };
