import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function RestrictedRoute({ allowIf, redirect, ...other }) {
  return allowIf ? <Route {...other} /> : <Redirect to={redirect} />;
}

export default RestrictedRoute;
