const NATOURS_NODE = process.env.NATOURS_NODE;
export const NATOURS_REACT = process.env.NATOURS_REACT;

const NATOURS_API_BASE_URL = `${NATOURS_NODE}/api/v1`;

export const TOURS_API_BASE_URL = `${NATOURS_API_BASE_URL}/tours`;
export const USERS_API_BASE_URL = `${NATOURS_API_BASE_URL}/users`;
export const REVIEWS_API_BASE_URL = `${NATOURS_API_BASE_URL}/reviews`;
export const BOOKINGS_API_BASE_URL = `${NATOURS_API_BASE_URL}/bookings`;

export const TOUR_IMAGES_BASE_URL = `${NATOURS_NODE}/img/tours/`;
export const USER_IMAGES_BASE_URL = `${NATOURS_NODE}/img/users/`;

export const REQUEST_TIMEOUT = 3600000; //ms

export const WAITING_TIMEOUT = 2000; // ms -> 2s
export const OTHER_IMAGES_BASE_URL = `${NATOURS_NODE}/img`;
export const PROMISE_AREAS = {
    LOADING_TOUR: 'LOADING_TOUR',
    LOADING_ALL_TOURS: 'LOADING_ALL_TOURS'
};
