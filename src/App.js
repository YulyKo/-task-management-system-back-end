import React, { Component } from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { HOME_PAGE } from './navigation/paths.const';
import { RouterConfig } from './navigation/RouterConfig';
import { userService } from './services/index';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>
    );
  }
}

export default App;
