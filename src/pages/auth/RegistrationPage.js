import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../../components/auth/AuthForm';

export class RegistrationPage extends React.Component {
  render() {
    return <main>
      <h1>Welcome to task manager system</h1>
      <AuthForm />
      <div>
        <p>Do you have account? Go to</p>
        <Link to="/login">Login page</Link>
      </div>
      <Link to="/">Go to home page</Link>
    </main>;
  }
}
