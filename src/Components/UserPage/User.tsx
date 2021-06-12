import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Item from './ItemClass';
import SideNav from './SideNav';
import InfoSettingsForm from './InfoSettingsForm';
import UpdatePassword from './UpdatePasswordForm';
import { AppProps } from '../../store/configStore';

const items = [
  new Item('settings', '/me', 'Settings'),
  new Item('briefcase', '/my-bookings', 'Bookings'),
  new Item('star', '/my-reviews', 'My Reviews'),
  new Item('credit-card', '/payment', 'Billing'),
];

const adminItems = [
  new Item('map', '/manage-tours', 'Manage Tours'),
  new Item('users', '/manage-users', 'Manage Users'),
  new Item('star', '/manage-reviews', 'Manage Tours'),
  new Item('briefcase', '/manage-bookings', 'Manage Bookings'),
];

const mapStateToProps = ({ auth }: AppProps) => ({ isAdmin: auth.isAdmin });
const connector = connect(mapStateToProps);
type propsFromRedux = ConnectedProps<typeof connector>;

const Main = ({ isAdmin }: propsFromRedux) => (
  <main className="main">
    <div className="user-view">
      <nav className="user-view__menu">
        <ul className="side-nav">
          <SideNav itemsList={items} />
        </ul>
        {isAdmin && (
          <div className="user-view__menu admin-nav">
            <h5 className="admin-nav__heading">Admin</h5>
            <ul className="side-nav">
              <SideNav itemsList={adminItems} />
            </ul>
          </div>
        )}
      </nav>

      <div className="user-view__content">
        <InfoSettingsForm />
        <div className="line">&nbsp;</div>
        <UpdatePassword />
      </div>
    </div>
  </main>
);

export default connector(Main);
