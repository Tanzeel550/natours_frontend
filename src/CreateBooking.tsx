import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { withRouter } from 'react-router';
import Loading from './Components/LoadingComponent/Loading';
import { startBookTour } from './actions/bookingActions';

const connector = connect(null, { startBookTour });
type propsFromRedux = ConnectedProps<typeof connector>;

const CreateBooking = (props: propsFromRedux & RouteComponentProps) => {
  useEffect(() => {
    const bookTour = async () => {
      const { tourId } = props.match.params as { tourId: string };
      try {
        await props.startBookTour(tourId);
        props.history.push('/my-bookings');
      } catch (e) {
        console.log(e);
        props.history.push(`/tour/${tourId}`);
      }
    };
    bookTour().then().catch();
  });
  return <Loading />;
};

export default withRouter(connector(CreateBooking));
