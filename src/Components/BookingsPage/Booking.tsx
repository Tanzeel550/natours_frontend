import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Card from '../HomePage/Card';
import { AppProps } from '../../store/configStore';

const mapStateToProps = ({ bookings }: AppProps) => ({
  bookings: bookings.bookings,
});
const connector = connect(mapStateToProps);
type propsFromRedux = ConnectedProps<typeof connector>;

const Booking: React.FC<propsFromRedux> = ({ bookings }: propsFromRedux) => {
  console.log(bookings);

  return bookings?.length > 0 ? (
    <main className="main">
      <div className="card-container">
        {bookings.map((booking, index) => (
          <Card key={index} tour={booking.tour} />
        ))}
      </div>
    </main>
  ) : (
    <h1>No bookings Yet. Start Booking!</h1>
  );
};

export default connector(Booking);
