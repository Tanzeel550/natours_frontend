import React from 'react';
import { NavLink, RouteComponentProps } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { startLogout } from '../actions/authActions';
import { USER_IMAGES_BASE_URL } from '../config';
import { AppProps } from '../store/configStore';

const logoWhite = require("../utils/img/logo-white.png") as string

const mapStateToProps = ({ auth }: AppProps) => ({
  user: auth.user, isAuthenticated: auth.isAuthenticated
});
const connector = connect(mapStateToProps, {
  startLogout
});
type propsFromRedux = ConnectedProps<typeof connector>

const Header = (props: propsFromRedux & RouteComponentProps) => {

  const handleLogout = async () => {
    const logoutButton = document.querySelector('.logout_button')!!;
    logoutButton.textContent = 'Logging Out';

    try {
      await props.startLogout();
      await setTimeout(() => {
      }, 2000);
      props.history.push('/');
      logoutButton.textContent = 'Logged Out';
    } catch (e) {
      logoutButton.textContent = 'Logout';
    }
  };

  return (
    <header className="header">
      <nav className="nav nav--tours">
        <NavLink className="nav__el" to="/">
          All tours
        </NavLink>
        <form className="nav__search">
          <button className="nav__search-btn">
            <svg>
              <use xlinkHref="img/icons.svg#icon-search"/>
            </svg>
          </button>
          <input type="text" placeholder="Search tours" className="nav__search-input"/>
        </form>
      </nav>
      <div className="header__logo">
        <img src={logoWhite} alt="Natours logo"/>
      </div>
      <nav className="nav nav--user">
        {props.user ? (
          <div>
            <NavLink to="/my-bookings" className="nav__el">
              My bookings
            </NavLink>
            <NavLink to="/me" className="nav__el">
              <img
                src={`${USER_IMAGES_BASE_URL}/${props.user.photo}`}
                alt={props.user.name}
                className="nav__user-img"
              />
              <span>{props.user.name}</span>
            </NavLink>
            <button
              className="nav__el nav__el--cta logout_button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <NavLink to="/login" className="nav__el">
              Login
            </NavLink>

            <NavLink to="/signup" className="nav__el nav__el--cta">
              Sign up
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  );
};

export default connector(Header)