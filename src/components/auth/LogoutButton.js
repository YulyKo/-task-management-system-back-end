import { Component } from "react";
import { tokenService , authService} from '../../services/index';

export class LogoutButton extends Component {

  constructor() {
    this.logout.bind(this);
  }

  logout() {
    tokenService
  }

  render() {
    return <button onClick={this.logout}>Logout</button>
  }
}