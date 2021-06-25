import React, { Component } from 'react';
import { tokenService } from '../services/index';
import { Route, Redirect } from 'react-router-dom';
import { REGISTRATION } from './paths.const';
import PropTypes from 'prop-types';

class PrivateRoute extends Component {
  static get propTypes() { 
    return { 
      children: PropTypes.any,
    }; 
  }

  render() {
    const token = tokenService.getToken();
    return <Route
      render={() => 
        token ?
          ({children}) :
          (
            <Redirect
              to={ REGISTRATION }
            />
          )
      }
    />;
  }
}

export default PrivateRoute;
