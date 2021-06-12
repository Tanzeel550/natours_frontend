import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AddBookingAction,
  BookingType,
  SetBookingsAction,
} from '../types/BookingTypes';

const initialState: { bookings: BookingType[] } = {
  bookings: [],
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<AddBookingAction>) => {
      state.bookings = [...state.bookings, action.payload.booking];
    },
    setBookings: (state, action: PayloadAction<SetBookingsAction>) => {
      state.bookings = action.payload.bookings;
    },
  },
});

export default bookingsSlice.reducer;
export const { addBooking, setBookings } = bookingsSlice.actions;
