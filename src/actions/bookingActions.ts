import axios from 'axios';
import { BOOKINGS_API_BASE_URL, NATOURS_REACT, REQUEST_TIMEOUT } from '../config';
import { addBooking, setBookings } from '../reducers/bookingsReducer';
import configStore from '../store/configStore';
import { setErrorAlert } from '../reducers/alertReducer';

const createInstance = () => {
  return axios.create({
    baseURL: BOOKINGS_API_BASE_URL,
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    },
    timeout: REQUEST_TIMEOUT
  });
};

export const startReceiveSession = (tourId: string) => async (dispatch: typeof configStore.dispatch): Promise<void> => {
  try {
    const { data } = await createInstance().post(`/tour/${tourId}/create-session`, {
      cancel_url: `${NATOURS_REACT + '/tour/' + tourId}`,
      // success_url: `${NATOURS_REACT + '/createBooking/tour/' + id}`
      success_url: `${NATOURS_REACT}/my-bookings?alert=BOOKING`
    });
    return data.session;
  } catch (e) {
    dispatch(setErrorAlert(e.response?.data?.message || e.message));
  }
};

export const startBookTour = (tourId: string) => async (dispatch: typeof configStore.dispatch): Promise<void> => {
  try {
    const { data } = await createInstance().post(`/tour/${tourId}/booking`);
    dispatch(addBooking(data.data));
  } catch (e) {
    dispatch(setErrorAlert(e.response?.data?.message || e.message));
  }
};

export const getMyBookings = () => async (dispatch: typeof configStore.dispatch): Promise<void> => {
  try {
    const { data } = await createInstance().get('/my-booked-tours');
    dispatch(setBookings(data.data));
  } catch (e) {
    dispatch(setErrorAlert(e.response?.data?.message || e.message));
  }
};
