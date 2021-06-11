import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClearLoadingAction, SetLoadingAction } from '../types/LoadingTypes';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: { isLoading: false },
  reducers: {
    setLoading: (state, action: PayloadAction<SetLoadingAction>) => {
      state.isLoading = true;
    },
    clearLoading: (state, action: PayloadAction<ClearLoadingAction>) => {
      state.isLoading = false;
    }
  }
});

export default loadingSlice.reducer;
export const { setLoading, clearLoading } = loadingSlice.actions;