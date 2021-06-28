import React, { Component } from 'react';
import { userService } from '../services/index';
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
    const token = userService.storage.getToken();
    const confirmed = userService.storage.getConfirmedStatus();
    return <Route
      render={() => 
        // token && confirmed
        ( token && confirmed ) ?
          this.props.children :
          <Redirect
            to={ REGISTRATION }
          />
      }
    />;
  }
}

export default PrivateRoute;
