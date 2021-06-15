import React from 'react';
import { Link } from 'react-router-dom';

export class TodoPage extends React.Component {
  render() {
    return <main>
      <h1>todo list</h1>
      <Link to="/">logout</Link>
    </main>
  }
}
