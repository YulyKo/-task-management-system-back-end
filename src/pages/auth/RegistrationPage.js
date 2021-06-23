import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';

export class RegistrationPage extends React.Component {
  render() {
    return <main>
      <h1>form RegistrationPage for auth here</h1>
      <AuthForm />
      <div>
        <p>Do you have account? Go to</p>
        <Link to="/login">Login page</Link>
      </div>
      <Link to="/">go home page</Link>
    </main>;
  }
}
