import { UserType } from './AuthTypes';
import { ReviewType } from './ReveiwTypes';

export interface TourType {
  id: string;
  name: string;
  duration: number;
  maxGroupSize: number;
  difficulty: 'easy' | 'medium' | 'difficult';
  ratingsAverage: number;
  ratingsQuantity: number;
  price: number;
  priceDiscount?: number;
  summary?: string;
  description?: string;
  imageCover: string;
  images?: [string];
  startDates?: [Date];
  startLocation: {
    description: string;
    type: ['Points'];
    coordinates: [number, number];
  };
  locations: [
    {
      type: 'Point';
      description: string;
      address: string;
      coordinates: [number, number];
    }
  ];
  guides: [UserType];
  reviews: [ReviewType];
}

export interface SetToursAction {
  tours: TourType[];
}
