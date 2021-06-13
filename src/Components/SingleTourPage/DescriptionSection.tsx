import React from 'react';
import { USER_IMAGES_BASE_URL } from '../../config';
import { UserType } from '../../types/AuthTypes';
import { TourType } from '../../types/TourTypes';

import icons from '../../utils/img/icons.svg';

const GuideComponent = ({ guide }: { guide: UserType }) => (
  <div className="overview-box__detail">
    <img
      src={USER_IMAGES_BASE_URL + guide.photo}
      alt="Lead guide"
      className="overview-box__img"
    />
    <span className="overview-box__label">{guide.role}</span>
    <span className="overview-box__text">{guide.name}</span>
  </div>
);

const OverViewBoxComponent = ({
  icon,
  label,
  text,
}: {
  label: string;
  text: string;
  icon: any;
}) => (
  <div className="overview-box__detail">
    <svg className="overview-box__icon">
      <use xlinkHref={`${icons}#${icon}`} />
    </svg>
    <span className="overview-box__label">{label}</span>
    <span className="overview-box__text">{text}</span>
  </div>
);

const OverViewBox = ({ tour }: { tour: TourType }) => (
  <div className="overview-box">
    <div>
      <div className="overview-box__group">
        <h2 className="heading-secondary ma-bt-lg">Quick facts</h2>

        <OverViewBoxComponent
          icon="icon-calendar"
          label="Next Date"
          text={
            new Date(tour?.startDates?.[0]!!).getFullYear() +
            ' ' +
            new Date(tour?.startDates?.[0]!!).getDate()
          }
        />
        <OverViewBoxComponent
          icon="icon-trending-up"
          label="Difficulty"
          text={tour.difficulty}
        />
        <OverViewBoxComponent
          icon="icon-calendar"
          label="Participants"
          text={`${tour.maxGroupSize} People`}
        />
        <OverViewBoxComponent
          icon="icon-calendar"
          label="Rating"
          text={`${tour.ratingsAverage} / 5`}
        />
      </div>

      <div className="overview-box__group">
        <h2 className="heading-secondary ma-bt-lg">Your tour guides</h2>
        {tour.guides.map((guide, index) => (
          <GuideComponent guide={guide} key={index} />
        ))}
      </div>
    </div>
  </div>
);

const DescriptionBox = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => (
  <div className="description-box">
    <h2 className="heading-secondary ma-bt-lg">About {name} tour</h2>
    {description.split('\n').map((line, index) => (
      <p className="description__text" key={index}>
        {line}
      </p>
    ))}
  </div>
);

const DescriptionSection = ({ tour }: { tour: TourType }) => (
  <section className="section-description">
    <OverViewBox tour={tour} />
    <DescriptionBox description={tour.description || ''} name={tour.name} />
  </section>
);

export default DescriptionSection;
