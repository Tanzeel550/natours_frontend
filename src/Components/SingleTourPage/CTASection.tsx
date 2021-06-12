import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { NavLink } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { startReceiveSession } from '../../actions/bookingActions';
import { TOUR_IMAGES_BASE_URL } from '../../config';
import { simulateErrorAlert } from '../../actions/alertActions';
import { AppProps } from '../../store/configStore';
import { TourType } from '../../types/TourTypes';

// TODO
// import icons from '../../utils/img/icons.svg';
const logoWhite = require('../../utils/img/logo-white.png') as string;

const mapStateToProps = ({ auth }: AppProps) => ({ isAuthenticated: auth.isAuthenticated });
const connector = connect(mapStateToProps, { simulateErrorAlert });
type propsFromRedux = ConnectedProps<typeof connector>

const CTASection = (props: propsFromRedux & { tour: TourType }) => {
  const handleBookings = async () => {
    document.querySelector('.btn__book-tour')!!.textContent = 'Loading...';
    const { id } = props.tour;
    try {
      const session = await startReceiveSession(id);
      const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY!!);
      await stripe?.redirectToCheckout({
        // @ts-ignore
        sessionId: (session).id
      });
    } catch (e) {
      document.querySelector('.btn__book-tour')!!.textContent = 'Book Tour';
      props.simulateErrorAlert(e.message);
    }
  };

  let { images, duration } = props.tour;
  return (
    <section className="section-cta">
      <div className="cta">
        <div className="cta__img cta__img--logo">
          <img src={logoWhite} alt="Natours logo" className=""/>
        </div>
        {images?.map((image, index) => (
          <img
            src={TOUR_IMAGES_BASE_URL + image}
            alt={`${index + 1}`}
            className={`cta__img cta__img--${index}`}
            key={index}
          />
        ))}
        <div className="cta__content">
          <h2 className="heading-secondary">What are you waiting for?</h2>
          <p className="cta__text">
            {duration} days. 1 adventure. Infinite memories. Make it yours today!
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