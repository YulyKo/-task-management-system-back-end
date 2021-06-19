import React from 'react';
import { Link } from 'react-router-dom';

export class AuthPage extends React.Component {
  render() {
    return <main>
      <h1>form for auth here</h1>
      <Link to="/">go back</Link>
    </main>;
  }
}
