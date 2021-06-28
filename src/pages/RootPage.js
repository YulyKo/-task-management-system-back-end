import React from 'react';
import { Link } from 'react-router-dom';

export class RootPage extends React.Component {
  render() {
    return <main className="page home-page">
      <div className="home-page__column">
        <h1 className="title">Welcome to TMS</h1>
        <p className="subtitle">It is task manager system</p>
        <Link className="text link" to="/registration">Get started</Link>
      </div>
      <img className="home-page__img" src="https://firebasestorage.googleapis.com/v0/b/green-peach.appspot.com/o/tms-resourses%2Fimg-tms.jpg?alt=media&token=a1beb20c-4665-4abe-adef-b5c556a60d05" alt="image" />
    </main>;
  }
}
