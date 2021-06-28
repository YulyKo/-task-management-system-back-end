import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { ROOT_PAGE } from '../../navigation/paths.const';
import { storage } from '../../services/index';

export default class LogoutButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }

  logout() {
    storage.clean();
    this.setState({ clicked: true });
  }

  render() {
    const { clicked } = this.state;
    return <>
      <button className="logout" onClick={this.logout.bind(this)}>Logout</button>
      {
        clicked ? <Redirect to={ROOT_PAGE} /> : ''
      }
    </>;
  }
}
