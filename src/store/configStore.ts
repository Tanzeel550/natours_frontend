import thunk from 'redux-thunk';
import tourReducer from '../reducers/tourReducer';
import authReducer from '../reducers/authReducer';
import bookingsReducer from '../reducers/bookingsReducer';
import errorReducer from '../reducers/alertReducer';
import loadingReducer from '../reducers/loadingReducer';
import { configureStore } from '@reduxjs/toolkit';

const configStore = configureStore(
  {
    reducer: {
      tours: tourReducer,
      auth: authReducer,
      bookings: bookingsReducer,
      alert: errorReducer,
      loading: loadingReducer
    },
    middleware: [thunk]
  }
);

configStore.subscribe(() => {
  console.log(configStore.getState());
});

export default configStore;
export const storeDispatch = configStore.dispatch;
