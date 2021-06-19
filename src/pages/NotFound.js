import React from 'react';
import { Link } from 'react-router-dom';

export class NotFound extends React.Component {
  render() {
    return <main>
      <h1>404 page not found</h1>
      <Link to="/">go back</Link>
    </main>;
  }
}
