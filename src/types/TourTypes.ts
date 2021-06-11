import { UserType } from './AuthTypes';

export interface TourType {
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
  startLocation: string;
  locations: [
    {
      type: 'Point';
      description: string;
      address: string;
      coordinates: [number];
    }
  ];
  guides: UserType;
}

export interface SetToursAction {
  tours: TourType[]
}
