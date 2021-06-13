import React from 'react';
import { TOUR_IMAGES_BASE_URL } from '../../config';
import { TourType } from '../../types/TourTypes';

import icons from '../../utils/img/icons.svg';

const HeaderSection = ({ name, duration, locations, imageCover }: TourType) => (
  <section className="section-header">
    <div className="header__hero">
      <div className="header__hero-overlay">&nbsp;</div>
      <img
        className="header__hero-img"
        src={TOUR_IMAGES_BASE_URL + imageCover}
        alt=""
      />
    </div>
    <div className="heading-box">
      <h1 className="heading-primary">
        <span>{name}</span>
      </h1>
      <div className="heading-box__group">
        <div className="heading-box__detail">
          <svg className="heading-box__icon">
            <use xlinkHref={`${icons}#icon-clock`} />
          </svg>
          <span className="heading-box__text">{duration} days</span>
        </div>
        <div className="heading-box__detail">
          <svg className="heading-box__icon">
            <use xlinkHref={`${icons}#icon-map-pin`} />
          </svg>
          <span className="heading-box__text">
            {locations && locations[0].description}
          </span>
        </div>
      </div>
    </div>
  </section>
);

export default HeaderSection;
