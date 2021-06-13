import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AlertType,
  SetErrorAlertTypeAction,
  SetSuccessAlertTypeAction,
} from '../types/AlertTypes';

const initialState: AlertType = {
  type: undefined,
  message: '',
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setSuccessAlert: (
      state,
      action: PayloadAction<SetSuccessAlertTypeAction>
    ) => {
      state.type = 'Success';
      state.message = action.payload.message;
    },
    setErrorAlert: (state, action: PayloadAction<SetErrorAlertTypeAction>) => {
      state.type = 'Error';
      state.message = action.payload.message;
    },
    clearAlert: state => {
      state.type = undefined;
      state.message = '';
    },
  },
});
export default alertSlice.reducer;
export const { setSuccessAlert, setErrorAlert, clearAlert } =
  alertSlice.actions;
