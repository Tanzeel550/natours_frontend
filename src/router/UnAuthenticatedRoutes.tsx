import React from 'react';
import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';

// const UnAuthenticatedRoutes = ({ isAuthenticated, component: Component, ...rest }: propTypes) => (
//   !isAuthenticated ? <Component {...rest}/> : <Redirect to="/me"/>
// );

// const UnAuthenticatedRoutes = ({ isAuthenticated, children,...rest }: propTypes) => (
//   <Route {...rest} render={() => {
//     return !isAuthenticated
//       ? children
//       : <Redirect to='/me'/>;
//   }}/>
// );

const UnAuthenticatedRoutes = ({component, isAuthenticated, ...rest}: any) => {
  const routeComponent = (props: any) => (
    !isAuthenticated
      ? React.createElement(component, props)
      : <Redirect to={{pathname: '/me'}}/>
  );
  return <Route {...rest} render={routeComponent}/>;
};

export default UnAuthenticatedRoutes;
