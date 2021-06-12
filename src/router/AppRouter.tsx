import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { showAlert } from '../utils/Alerts';
import { startVerifyToken } from '../actions/authActions';
import { getMyBookings } from '../actions/bookingActions';
import { startGetTours } from '../actions/tourActions';
import { AppProps } from '../store/configStore';
import UnAuthenticatedRoutes from './UnAuthenticatedRoutes';

const Home = React.lazy(() => import('../Components/HomePage/Home'));
const SingleTour = React.lazy(() => import('../Components/SingleTourPage/SingleTour'));
const ErrorPage = React.lazy(() => import('../Components/ErrorPage'));
const User = React.lazy(() => import('../Components/UserPage/User'));
const Header = React.lazy(() => import('../Components/Header'));
const Footer = React.lazy(() => import('../Components/Footer'));
const Login = React.lazy(() => import('../Components/LoginPage/Login'));
const CreateBooking = React.lazy(() => import('../CreateBooking'));
const Booking = React.lazy(() => import('../Components/BookingsPage/Booking'));
const AuthenticatedRoutes = React.lazy(() => import('./AuthenticatedRoutes'));
const Loading = React.lazy(() => import('../Components/LoadingComponent/Loading'));
const SignUp = React.lazy(() => import('../Components/SignUpPage/SignUp'));

const mapStateToProps = ({ alert, loading, auth }: AppProps) => ({
  alert,
  loading,
  isAuthenticated: auth.isAuthenticated
});
const connector = connect(mapStateToProps, {
  startVerifyToken,
  getMyBookings,
  startGetTours
});
type propsFromRedux = ConnectedProps<typeof connector>

const AppRouter = (props: propsFromRedux) => {
  useEffect(() => {
    const initRequests = async () => {
      try {
        await props.startGetTours();
        await props.startVerifyToken();
        await props.getMyBookings();
      } catch (e) {
      }
    };
    initRequests().then().catch();
  }, [props]);

  useEffect(() => {
    props.alert && showAlert(props.alert.type!!, props.alert.message);
  }, [props.alert]);

  return (
    <BrowserRouter>
      {props.loading && <Loading/>}
      {/*@ts-ignore*/}
      <Header/>
      <Switch>
        <Route path="/" component={Home} exact={true}/>
        <Route path="/tour/:tourId" component={SingleTour} exact={true}/>

        <UnAuthenticatedRoutes path="/login" component={Login} exact={true} isAuthenticated={props.isAuthenticated}/>
        <UnAuthenticatedRoutes path="/login/:authToken" component={Login} exact={true}
                               isAuthenticated={props.isAuthenticated}/>

        <UnAuthenticatedRoutes path="/signup" component={SignUp} exact={true} isAuthenticated={props.isAuthenticated}/>
        <UnAuthenticatedRoutes path="/signup/:authToken" component={SignUp} exact={true}
                               isAuthenticated={props.isAuthenticated}/>

        <AuthenticatedRoutes path="/me" component={User} exact={true} isAuthenticated={props.isAuthenticated}/>
        <AuthenticatedRoutes path="/my-bookings" component={Booking} exact={true}
                             isAuthenticated={props.isAuthenticated}/>

        <Route path="/createBooking/tour/:tourId" exact={true} component={CreateBooking}/>
        <Route path="*" component={ErrorPage}/>
      </Switch>
      <Footer/>
    </BrowserRouter>
  );
};

export default connector(AppRouter);