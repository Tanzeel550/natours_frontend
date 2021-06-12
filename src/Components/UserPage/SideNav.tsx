import React from 'react';
import { NavLink } from 'react-router-dom';
import Item from './ItemClass';

const Icons = require("../../utils/img/icons.svg")

const SideNavItem = (item: Item) => (
  // <li className={item.className || ''}>
  <li>
    <NavLink to={`${item.link}`}>
      <svg>
        <use xlinkHref={`${Icons}#${item.icon}`}/>
      </svg>
      {item.text}
    </NavLink>
  </li>
);

const SideNav = ({ itemsList }:{itemsList: Item[]}) =>
  itemsList.map((item, index) => <SideNavItem {...item} key={index}/>);

export default SideNav;
