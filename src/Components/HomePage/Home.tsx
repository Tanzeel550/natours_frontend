import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Card from './Card';
import { AppProps } from '../../store/configStore';

const mapStateToProps = ({ tours, bookings }: AppProps) => ({
  tours: tours.tours.filter(
    tour =>
      bookings.bookings.filter(booking => booking.id === tour.id).length === 0
  ),
});

const connector = connect(mapStateToProps);
type propsFromRedux = ConnectedProps<typeof connector>;

export const Home: React.FC<propsFromRedux> = ({ tours }: propsFromRedux) => {
  return tours.length > 0 ? (
    <main className="main">
      <div className="card-container">
        {tours.map(tour => (
          <Card key={tour.id} tour={tour} />
        ))}
      </div>
    </main>
  ) : (
    <div className="error__msg">Sorry! No tours were found here</div>
  );
};

export default connector(Home);
