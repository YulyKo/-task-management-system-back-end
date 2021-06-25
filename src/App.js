import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RootPage } from './pages/RootPage';
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
    // if (!this.state.token) {
    //   return <BrowserRouter>
    //     <RootPage />
    //   </BrowserRouter>;
    // }
    return (
      <BrowserRouter>
        {/* <HomePage /> */}
        <RouterConfig />
      </BrowserRouter>
    );
  }
}

export default App;
