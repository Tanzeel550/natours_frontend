import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: { isLoading: false },
  reducers: {
    setLoading: state => {
      state.isLoading = true;
    },
    clearLoading: state => {
      state.isLoading = false;
    },
  },
});

export default loadingSlice.reducer;
export const { setLoading, clearLoading } = loadingSlice.actions;
