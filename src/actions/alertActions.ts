import { AppDispatch } from '../store/configStore';
import { setErrorAlert, setSuccessAlert } from '../reducers/alertReducer';

export const simulateSuccessAlert = (message: string) => async (dispatch: AppDispatch): Promise<void> => {
  dispatch(setSuccessAlert({ message }));
};

export const simulateErrorAlert = (message: string) => async (dispatch: AppDispatch): Promise<void> => {
  dispatch(setErrorAlert({ message }));
};
