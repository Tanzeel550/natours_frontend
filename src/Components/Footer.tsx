import React from 'react';
import { NavLink } from 'react-router-dom';

import * as logoGreen from '../utils/img/logo-green.png';

const Footer = () => (
  <div className="footer">
    <div className="footer__logo">
      <img src={logoGreen.default} alt="Natours logo" />
    </div>
    <ul className="footer__nav">
      <li>
        <NavLink to="/">About us</NavLink>
      </li>
      <li>
        <NavLink to="/">Download apps</NavLink>
      </li>
      <li>
        <NavLink to="/">Become a guide</NavLink>
      </li>
      <li>
        <NavLink to="/">Careers</NavLink>
      </li>
      <li>
        <NavLink to="/">Contact</NavLink>
      </li>
    </ul>
    <p className="footer__copyright">
      &copy; by Tanzeel Ahmed. All rights reserved.
    </p>
  </div>
);
export default Footer;
