import { AppDispatch } from '../store/configStore';
import { clearLoading, setLoading } from '../reducers/loadingReducer';

export const simulateLoading =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(setLoading());
  };

export const exitLoading =
  () =>
  async (dispatch: AppDispatch): Promise<void> => {
    dispatch(clearLoading());
  };
