import React from 'react';
import {USER_IMAGES_BASE_URL} from '../../config';
import { ReviewType } from '../../types/ReveiwTypes';

// TODO
// import icons from '../../utils/img/icons.svg';
const Icons = require("../../utils/img/icons.svg") as string;

const ReviewsSection = ({reviews}:{reviews: ReviewType[]}) => (
    <section className="section-reviews">
        <div className="reviews">
            {reviews.map((review, index) => (
                <div className="reviews__card" key={index}>
                    <div className="reviews__avatar">
                        <img
                            src={USER_IMAGES_BASE_URL + review?.user?.photo}
                            alt={review?.user?.name}
                            className="reviews__avatar-img"
                        />
                        <h6 className="reviews__user">{review?.user?.name}</h6>
                    </div>
                    <p className="reviews__text">{review?.review}</p>
                    <div className="reviews__rating">
                        {[1, 2, 3, 4, 5].map((num, value) => (
                            <svg
                                className={`reviews__star reviews__star--${
                                    num <= review?.rating ? 'active' : 'inactive'
                                }`}
                                key={value}
                            >
                                <use xlinkHref={`${Icons}#icon-star`}/>
                            </svg>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </section>
);

export default ReviewsSection;
