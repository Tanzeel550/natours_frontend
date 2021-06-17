import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { NavLink } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { startBookTour } from '../../actions/bookingActions';
import { TOUR_IMAGES_BASE_URL } from '../../config';
import { AppProps } from '../../store/configStore';
import { TourType } from '../../types/TourTypes';

import logoWhite from '../../utils/img/logo-white.png';

const mapStateToProps = ({ auth }: AppProps) => ({
  isAuthenticated: auth.isAuthenticated,
});
const connector = connect(mapStateToProps, { startBookTour });
type propsFromRedux = ConnectedProps<typeof connector>;

const CTASection = (props: propsFromRedux & { tour: TourType }) => {
  const handleBookings = async () => {
    document.querySelector('.btn__book-tour')!!.textContent = 'Loading...';
    try {
      await props.startBookTour(props.tour.id);
    } catch (e) {
      document.querySelector('.btn__book-tour')!!.textContent = 'Book Tour';
    }
  };

  let { images, duration } = props.tour;
  return (
    <section className="section-cta">
      <div className="cta">
        <div className="cta__img cta__img--logo">
          <img src={logoWhite} alt="Natours logo" className="" />
        </div>
        {images?.slice(0, 2).map((image, index) => (
          <img
            src={TOUR_IMAGES_BASE_URL + image}
            alt={`${index + 1}`}
            className={`cta__img cta__img--${index + 1}`}
            key={index}
          />
        ))}
        <div className="cta__content">
          <h2 className="heading-secondary">What are you waiting for?</h2>
          <p className="cta__text">
            {duration} days. 1 adventure. Infinite memories. Make it yours
            today!
          </p>

          {props.isAuthenticated ? (
            <button
              className="btn btn--green span-all-rows btn__book-tour"
              onClick={handleBookings}
            >
              Book Tour
            </button>
          ) : (
            <NavLink
              className="btn btn--green span-all-rows btn__book-tour"
              to="/login"
            >
              Login to Book Tour
            </NavLink>
          )}
        </div>
      </div>
    </section>
  );
};
export default connector(CTASection);
