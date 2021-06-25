import React, { Component } from 'react';
import { ROOT_PAGE } from '../../navigation/paths.const';
import { tokenService , authService} from '../../services/index';
import { createBrowserHistory } from 'history';

export class LogoutButton extends Component {
  history = createBrowserHistory();

  redirect() {
    // redirect without reloading page, but after dont show root page
    // console.log(this.history.location);
    // this.history.push(ROOT_PAGE);
    window.location.pathname = ROOT_PAGE;
  }

  logout() {
    tokenService.cleanToken();
    authService.clearConfirmedStatus();
    authService.clearOwnerKey();
    this.redirect();
  }

  render() {
    return <button onClick={this.logout.bind(this)}>Logout</button>;
  }
}
