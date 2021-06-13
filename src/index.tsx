import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppRouter from './router/AppRouter';
import configStore from './store/configStore';
import './utils/style.css';
import Loading from './Components/LoadingComponent/Loading';
import { setTours } from './reducers/tourReducer';
import { startGetTours } from './actions/tourActions';
import { TourType } from './types/TourTypes';
import { setErrorAlert } from './reducers/alertReducer';
import { startVerifyToken } from './actions/authActions';
import { LoginAction } from './types/AuthTypes';
import { login } from './reducers/authReducer';
import { getMyBookings } from './actions/bookingActions';
import { setBookings } from './reducers/bookingsReducer';

const jsx = (
  <Suspense fallback={<Loading />}>
    <Provider store={configStore}>
      <AppRouter />
    </Provider>
  </Suspense>
);

ReactDOM.render(<Loading />, document.getElementById('root'));

startGetTours()
  .then((data: TourType[]) => {
    configStore.dispatch(setTours({ tours: data }));
    return startVerifyToken();
  })
  .then(({ token, user }: LoginAction) => {
    if (token && user.id) configStore.dispatch(login({ token, user }));
    console.log('User authenticated');
    return getMyBookings();
  })
  .then(data => {
    // TODO: need to this out
    if (data?.data) configStore.dispatch(setBookings({ bookings: data.data }));
    ReactDOM.render(jsx, document.getElementById('root'));
  })
  .catch(e => {
    configStore.dispatch(
      setErrorAlert({ message: e.response?.data?.message || e.message })
    );
    ReactDOM.render(jsx, document.getElementById('root'));
  });

window.addEventListener('unhandledrejection', e =>
  console.error(
    `Unhandled rejection (promise: ${e.promise}, reason: ${e.reason}).`
  )
);
