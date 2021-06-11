import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SetToursAction, TourType } from '../types/TourTypes';

const initialState: { tours: TourType[] } = { tours: [] };

const tourSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {
    setTours: (state, action: PayloadAction<SetToursAction>) => {
      state.tours = action.payload.tours;
    }
  }
});

export default tourSlice.reducer;
export const { setTours } = tourSlice.actions;
