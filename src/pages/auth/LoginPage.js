import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
// import AuthForm from '../../components/AuthForm';

export class LoginPage extends React.Component {
  render() {
    return <main>
      <h1>Welcome to task manager system</h1>
      <LoginForm />
      <div>
        <p>Don&#39;t you have account? Go to</p>
        <Link to="/registration">Registration page</Link>
      </div>
      <Link to="/">Go to home page</Link>
    </main>;
  }
}
