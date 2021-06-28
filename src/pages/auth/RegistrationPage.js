import React from 'react';
import { Link } from 'react-router-dom';
import RegistrationForm from '../../components/auth/RegistrationForm';

export class RegistrationPage extends React.Component {
  render() {
    return <main className="page">
      <h1 className="reg-page__title subtitle">Welcome to task manager system</h1>
      <RegistrationForm/>
      <div className="reg-page__info">
        <p className="text">Do you have account?</p>
        <Link className="reg-page__info_link text" to="/login">Login page</Link>
        <Link className="text link" to="/">Go to home page</Link>
      </div>
    </main>;
  }
}
