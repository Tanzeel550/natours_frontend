import React from 'react';
import {NavLink} from 'react-router-dom';

// TODO
const logoGreen = require("../utils/img/logo-green.png") as string;

const Footer = () => (
    <div className="footer">
        <div className="footer__logo">
            <img src={logoGreen} alt="Natours logo"/>
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
        <p className="footer__copyright">&copy; by Tanzeel Ahmed. All rights reserved.</p>
    </div>
);
export default Footer;
