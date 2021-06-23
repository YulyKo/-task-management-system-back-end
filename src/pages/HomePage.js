import React from 'react';
import { Link } from 'react-router-dom';

export class HomePage extends React.Component {
  render() {
    return <main>
      <h1>Welcome to TMS</h1>
      <p>It is task manager system</p>
      <Link to="/registration">Get started</Link>
    </main>;
  }
}
