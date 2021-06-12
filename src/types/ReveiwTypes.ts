import { UserType } from './AuthTypes';
import { TourType } from './TourTypes';

export interface ReviewType {
  review: string;
  rating: number;
  user: UserType;
  tour: TourType;
}
