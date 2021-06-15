import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { AuthPage } from './pages/AuthPage';
import { NotFound } from './pages/NotFound';

const Router = BrowserRouter;

ReactDOM.render(
  <React.StrictMode>
   <Router>
      <Switch>
        <Route exact path="/" component={ HomePage } />
        <Route path="/auth" component={ AuthPage } />
        <Route component={ NotFound } />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
