import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { NotFound } from './pages/NotFound';
import { TasksListPage } from './pages/todo-list/TasksListPage';
import { RegistrationPage } from './pages/auth/RegistrationPage';
import { LoginPage } from './pages/auth/LoginPage';
import { ConfirmPage } from './pages/auth/ConfirmPage';

const Router = BrowserRouter;

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={ HomePage } />
        <Route path="/registration" component={ RegistrationPage } />
        <Route path="/login" component={ LoginPage } />
        <Route path="/todo-list" component={ TasksListPage } />
        <Route path="/confirm/:code" component={ ConfirmPage } />
        <Route component={ NotFound } />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
