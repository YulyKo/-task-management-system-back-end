import React, { Component } from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { HOME_PAGE } from './navigation/paths.const';
import { RouterConfig } from './navigation/RouterConfig';
import { tokenService } from './services/index';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: tokenService.getToken(),
    };
  }

  render() {
    if (this.state.token) {
      return <BrowserRouter>
        <Redirect to={HOME_PAGE} />
        <RouterConfig />
      </BrowserRouter>;
    }
    return (
      <BrowserRouter>
        {/* <HomePage /> */}
        <RouterConfig />
      </BrowserRouter>
    );
  }
}

export default App;
