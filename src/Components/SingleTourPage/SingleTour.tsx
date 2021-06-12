import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import HeaderSection from './HeaderSection';
import DescriptionSection from './DescriptionSection';
import MapBoxSection from './MapBoxSection';
import PicturesSection from './PicturesSection';
import ReviewsSection from './ReviewsSection';
import CTASection from './CTASection';
import { RouteComponentProps } from 'react-router-dom';
import { AppProps } from '../../store/configStore';

const mapStateToProps = ({ tours, bookings }: AppProps) => ({
  bookings: bookings.bookings,
  tours: tours.tours,
});
const connector = connect(mapStateToProps);
type propsFromRedux = ConnectedProps<typeof connector>;

const SingleTour = (props: propsFromRedux & RouteComponentProps) => {
  const tour = props.tours.find(
    tour => tour.id === (props.match.params as { tourId: string }).tourId
  );

  useEffect(() => {
    if (!tour) {
      props.history.push('/error');
    }
  }, [props.history, tour]);

  const isTourBooked = props.bookings.find(booking => booking?.id === tour?.id);
  return tour ? (
    <div>
      <HeaderSection {...tour} />
      <DescriptionSection tour={tour} />
      <MapBoxSection locations={tour.locations} startDates={tour.startDates} />
      <PicturesSection images={tour.images} />
      <ReviewsSection reviews={tour.reviews} />
      {!isTourBooked && <CTASection tour={tour} />}
    </div>
  ) : (
    <h1>There is no tour here, Please Go to home page and then try again!</h1>
  );
};

export default connector(SingleTour);
