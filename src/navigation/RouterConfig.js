import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConfirmPage } from '../pages/auth/ConfirmPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegistrationPage } from '../pages/auth/RegistrationPage';
import { RootPage } from '../pages/RootPage';
import { NotFound } from '../pages/NotFound';
import { HomePage } from '../pages/todo-list/HomePage';
import { HOME_PAGE, LOGIN, REGISTRATION, ROOT_PAGE } from './paths.const';
import PrivateRoute from './PrivateRoute';

export const RouterConfig = () =>
  <Switch>
    {/* publick route */}
    <Route exact path={ROOT_PAGE} component={ RootPage } />

    {/* private auth routes */}
    <Route exact path={REGISTRATION} component={ RegistrationPage } />
    <Route exact path={LOGIN} component={ LoginPage } />
    <PrivateRoute path={HOME_PAGE}>
      <Route component={ HomePage } />
    </PrivateRoute>
    <Route path="/confirm/:code" component={ ConfirmPage } />

    {/* for not found */}
    <Route component={ NotFound } />
  </Switch>;
