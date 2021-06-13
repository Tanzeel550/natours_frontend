import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { showAlert } from '../utils/Alerts';
import { startVerifyToken } from '../actions/authActions';
import { getMyBookings } from '../actions/bookingActions';
import { startGetTours } from '../actions/tourActions';
import { AppProps } from '../store/configStore';
import UnAuthenticatedRoutes from './UnAuthenticatedRoutes';
import { clearAlert } from '../reducers/alertReducer';

const Home = React.lazy(() => import('../Components/HomePage/Home'));
const SingleTour = React.lazy(
  () => import('../Components/SingleTourPage/SingleTour')
);
const ErrorPage = React.lazy(() => import('../Components/ErrorPage'));
const User = React.lazy(() => import('../Components/UserPage/User'));
const Header = React.lazy(() => import('../Components/Header'));
const Footer = React.lazy(() => import('../Components/Footer'));
const Login = React.lazy(() => import('../Components/LoginPage/Login'));
const Booking = React.lazy(() => import('../Components/BookingsPage/Booking'));
const AuthenticatedRoutes = React.lazy(() => import('./AuthenticatedRoutes'));
const Loading = React.lazy(
  () => import('../Components/LoadingComponent/Loading')
);
const SignUp = React.lazy(() => import('../Components/SignUpPage/SignUp'));

const mapStateToProps = ({ alert, loading, auth }: AppProps) => ({
  alert,
  loading,
  isAuthenticated: auth.isAuthenticated,
});
const connector = connect(mapStateToProps, {
  startVerifyToken,
  getMyBookings,
  startGetTours,
});
type propsFromRedux = ConnectedProps<typeof connector>;

const AppRouter = (props: propsFromRedux) => {
  useEffect(() => {
    props.alert.type &&
      showAlert(props.alert.type?.toLowerCase()!!, props.alert.message);
    clearAlert();
  }, [props.alert]);

  return (
    <BrowserRouter>
      {props.loading.isLoading && <Loading />}
      {/*@ts-ignore*/}
      <Header />
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path="/tour/:tourId" component={SingleTour} exact={true} />

        <UnAuthenticatedRoutes
          path="/login"
          component={Login}
          exact={true}
          isAuthenticated={props.isAuthenticated}
        />
        <UnAuthenticatedRoutes
          path="/login/:authToken"
          component={Login}
          exact={true}
          isAuthenticated={props.isAuthenticated}
        />

        <UnAuthenticatedRoutes
          path="/signup"
          component={SignUp}
          exact={true}
          isAuthenticated={props.isAuthenticated}
        />
        <UnAuthenticatedRoutes
          path="/signup/:authToken"
          component={SignUp}
          exact={true}
          isAuthenticated={props.isAuthenticated}
        />

        <AuthenticatedRoutes
          path="/me"
          component={User}
          exact={true}
          isAuthenticated={props.isAuthenticated}
        />
        <AuthenticatedRoutes
          path="/my-bookings"
          component={Booking}
          exact={true}
          isAuthenticated={props.isAuthenticated}
        />

        <Route path="*" component={ErrorPage} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default connector(AppRouter);
