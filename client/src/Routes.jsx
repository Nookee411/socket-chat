import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import RestrictedRoute from './components/RestrictedRoute';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import { userSelectors } from './store/slices/userSlice';

import { LINKS } from './constants';

function AppRoutes() {
  const user = useSelector(userSelectors.user);

  return (
    <Switch>
      <RestrictedRoute
        exact
        path={LINKS.chat}
        component={Chat}
        allowIf={user.name !== null}
        redirect={LINKS.login}
      />
      <RestrictedRoute
        allowIf={user.name === null}
        redirect={LINKS.chat}
        path={LINKS.login}
        component={Login}
      />
      <RestrictedRoute
        allowIf={user.name === null}
        redirect={LINKS.chat}
        path={LINKS.register}
        component={Register}
      />
    </Switch>
  );
}

export default AppRoutes;
