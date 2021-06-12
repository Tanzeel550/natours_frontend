import { Redirect } from 'react-router';
import { Route } from 'react-router-dom';
import React from 'react';

// const AuthenticatedRoutes = ({isAuthenticated, component: Component, path, ...props}) =>
//     isAuthenticated ? (
//         <Component path={path} {...props} />
//     ) : (
//         <Redirect to={`/login?from=${path + props.location.search}`}/>
//     );
//

//
// const AuthenticatedRoutes = ({ isAuthenticated, component: Component, ...rest }: propTypes) => (
//   <Route {...rest} render={() => {
//       return isAuthenticated
//         ? Component
//         : <Redirect to='/login'/>;
//   }}/>
// );

const AuthenticatedRoutes = ({ component, isAuthenticated, ...rest }: any) => {
  const routeComponent = (props: any) => (
    isAuthenticated
      ? React.createElement(component, props)
      : <Redirect to={{ pathname: '/login' }}/>
  );
  return <Route {...rest} render={routeComponent}/>;
};

export default AuthenticatedRoutes;

