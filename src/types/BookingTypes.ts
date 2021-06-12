import { TourType } from './TourTypes';
import { UserType } from './AuthTypes';

export interface BookingType {
  tour: TourType,
  user: UserType
  createdAt: number;
  price: number;
  paid: boolean;
}

export interface SetBookingsAction {
  bookings: BookingType[]
}

export interface AddBookingAction {
  booking: BookingType
}