import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConfirmPage } from '../pages/auth/ConfirmPage';
import { LoginPage } from '../pages/auth/LoginPage';
import { RegistrationPage } from '../pages/auth/RegistrationPage';
import { RootPage } from '../pages/RootPage';
import { NotFound } from '../pages/NotFound';
import { HomePage } from '../pages/todo-list/HomePage';
import { HOME_PAGE, LOGIN, REGISTRATION, ROOT_PAGE } from './paths.consts';

export const RouterConfig = () =>
  <Switch>
    {/* publick route */}
    <Route exact path={ROOT_PAGE} component={ RootPage } />

    {/* private auth routes */}
    <Route exact path={REGISTRATION} component={ RegistrationPage } />
    <Route exact path={LOGIN} component={ LoginPage } />
    <Route path={HOME_PAGE} component={ HomePage } />
    <Route path="/confirm/:code" component={ ConfirmPage } />

    {/* for not found */}
    <Route component={ NotFound } />
  </Switch>;
