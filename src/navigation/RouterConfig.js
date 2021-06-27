import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegistrationPage } from '../pages/auth/RegistrationPage';
import { RootPage } from '../pages/RootPage';
import { NotFound } from '../pages/NotFound';
// import { HomePage } from '../pages/todo-list/HomePage';
import { CONFIRM, CONFIRM_BY_EMAIL, HOME_PAGE, LOGIN, REGISTRATION, ROOT_PAGE } from './paths.const';
import PrivateRoute from './PrivateRoute';
import { NotConfirmedPage } from '../pages/auth/Confirm/NotConfirmedPage';
import { ConfirmedPage } from '../pages/auth/Confirm/ConfirmedPage';
import { NewHomePage } from '../pages/todo-list/NewHomePage';

export const RouterConfig = () =>
  <Switch>
    {/* publick route */}
    <Route exact path={ROOT_PAGE} component={ RootPage } />
    <Route exact path={REGISTRATION} component={ RegistrationPage } />
    <Route exact path={LOGIN} component={ LoginPage } />
    <Route path={CONFIRM} component={ NotConfirmedPage } />
    <Route path={CONFIRM_BY_EMAIL} component={ ConfirmedPage } />

    {/* private auth route to page with tasks */}
    <PrivateRoute path={ HOME_PAGE }>
      {/* <Route component={ HomePage } /> */}
      <Route component={ NewHomePage } />
    </PrivateRoute>

    {/* for not found */}
    <Route component={ NotFound } />
  </Switch>;
