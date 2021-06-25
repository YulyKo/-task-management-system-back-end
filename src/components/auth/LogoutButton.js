import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { ROOT_PAGE } from '../../navigation/paths.const';
import { tokenService , authService} from '../../services/index';

export class LogoutButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }

  logout() {
    tokenService.cleanToken();
    authService.clearConfirmedStatus();
    authService.clearOwnerKey();
    this.setState({ clicked: true });
  }

  render() {
    const { clicked } = this.state;
    return <>
      <button onClick={this.logout.bind(this)}>Logout</button>
      {
        clicked ? <Redirect to={ROOT_PAGE} /> : ''
      }
    </>;
  }
}
