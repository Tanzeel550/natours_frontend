import configStore from '../store/configStore';
import { clearLoading, setLoading } from '../reducers/loadingReducer';

export const simulateLoading = () => async (dispatch: typeof configStore.dispatch): Promise<void> => {
  dispatch(setLoading({}));
};

export const exitLoading = () => async (dispatch: typeof configStore.dispatch): Promise<void> => {
  dispatch(clearLoading({}));
};

