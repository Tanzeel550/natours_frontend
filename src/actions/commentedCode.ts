/*
<------------------- tourActions ------------------->
import { setTours } from '../reducers/tourReducer';
import { setErrorAlert } from '../reducers/alertReducer';
import { AppDispatch } from '../store/configStore';
import { clearLoading, setLoading } from '../reducers/loadingReducer';
export const startGetTours =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch(setLoading());

      const { data } = await instance.get('');
      dispatch(setTours({ tours: data.data.data }));
      dispatch(clearLoading());
    } catch (e) {
        setErrorAlert({ message: e.response?.data?.message || e.message })
    }
  };
*/

/*
<--------------- authActions ------------------->
import { AppDispatch } from '../store/configStore';
import { clearLoading, setLoading } from '../reducers/loadingReducer';
import { login } from '../reducers/authReducer';
import { setErrorAlert, setSuccessAlert } from '../reducers/alertReducer';
export const startVerifyToken =
  () =>
    async (dispatch: AppDispatch): Promise<void> => {
      try {
        dispatch(setLoading());

        if (!localStorage.getItem('token')) throw new Error();
        const { data } = await createInstance().post('/verifyToken');
        const { token, user } = data;
        localStorage.setItem('token', token);
        dispatch(login({ token, user }));

        dispatch(clearLoading());
        dispatch(setSuccessAlert({ message: data.data }));
      } catch (e) {
          setErrorAlert({ message: e.response?.data?.message || e.message })
        localStorage.remove('token');
      }
    };
*/

/*
<--------------- bookingsActions ----------------------->
import { AppDispatch } from '../store/configStore';
import { clearLoading, setLoading } from '../reducers/loadingReducer';
import { setBookings } from '../reducers/bookingsReducer';
import { setErrorAlert } from '../reducers/alertReducer';
export const getMyBookings =
  () =>
    async (dispatch: AppDispatch): Promise<void> => {
      try {
        dispatch(setLoading());
        const { data } = await createInstance().get('/my-booked-tours');
        dispatch(setBookings(data.data));
        dispatch(clearLoading());
      } catch (e) {
          setErrorAlert({ message: e.response?.data?.message || e.message })
      }
    };
*/

export default {};
