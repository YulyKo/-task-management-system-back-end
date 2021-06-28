import React, { Component } from 'react';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { RouterConfig } from './navigation/RouterConfig';
import './styles/main.css';

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
