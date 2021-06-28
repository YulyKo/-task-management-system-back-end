import React from 'react';
import { Link } from 'react-router-dom';

export class NotFound extends React.Component {
  render() {
    return <main className="page">
      <h1 className="title">404 page not found</h1>
      <Link className="text link" to="/">Home page</Link>
    </main>;
  }
}
