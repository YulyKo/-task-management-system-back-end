import React from 'react';

export class NotConfirmedPage extends React.Component {
  render() {
    return <main className="page home-page">
      <img className="home-page__img" src="https://firebasestorage.googleapis.com/v0/b/green-peach.appspot.com/o/tms-resourses%2Fimg-tms.jpg?alt=media&token=a1beb20c-4665-4abe-adef-b5c556a60d05" alt="image" />
      <div className="home-page__column">
        <h1 className="title">We sent you message for confirm.</h1>
        <p className="subtitle">Please, check your email</p>
        <p className="subtitle">P.S. close this page. You&#39;ll redirect to new one</p>
      </div>
    </main>;
  }
}
