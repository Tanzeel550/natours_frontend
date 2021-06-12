import React from 'react';
import { NavLink } from 'react-router-dom';
import { TOUR_IMAGES_BASE_URL } from '../../config';
import { TourType } from '../../types/TourTypes';

// TODO
// import icons from '../../utils/img/icons.svg';
const icons = require('../../utils/img/icons.svg') as string;

const CardData = ({ icon, data }: { icon: string; data: string }) => (
  <div className="card__data">
    <svg className="card__icon">
      <use xlinkHref={icon} />
    </svg>
    <span>{data}</span>
  </div>
);

const Card = ({ tour }: { tour: TourType }) => (
  <div className="card">
    <div className="card__header">
      <div className="card__picture">
        <div className="card__picture-overlay">&nbsp;</div>
        <img
          src={TOUR_IMAGES_BASE_URL + tour?.imageCover}
          alt={tour?.name}
          className="card__picture-img"
        />
      </div>

      <h3 className="heading-tertirary">
        <span>{tour?.name}</span>
      </h3>
    </div>

    <div className="card__details">
      <h4 className="card__sub-heading">{`Easy ${tour?.duration}-day tour`}</h4>
      <p className="card__text">{tour?.summary}</p>

      <CardData
        icon={`${icons}#icon-map-pin`}
        data={tour?.startLocation?.description}
      />
      <CardData
        icon={`${icons}#icon-calendar`}
        data={
          new Date(tour.startDates?.[0]!!)?.getFullYear() +
          ' ' +
          new Date(tour.startDates?.[0]!!)?.getDate()
        }
      />
      <CardData
        icon={`${icons}#icon-flag`}
        data={`${tour?.locations?.length} stops`}
      />
      <CardData
        icon={`${icons}#icon-user`}
        data={`${tour?.maxGroupSize} people`}
      />
    </div>

    <div className="card__footer">
      <p>
        <span className="card__footer-value">${tour?.price} </span>
        <span className="card__footer-text">per person</span>
      </p>
      <p className="card__ratings">
        <span className="card__footer-value">{tour?.ratingsAverage}</span>
        <span className="card__footer-text">
          rating ({tour?.ratingsQuantity})
        </span>
      </p>
      <NavLink to={`/tour/${tour?.id}`} className="btn btn--green btn--small">
        Details
      </NavLink>
    </div>
  </div>
);

export default Card;
