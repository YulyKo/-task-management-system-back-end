import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from '../../components/AuthForm';

export class LoginPage extends React.Component {
  render() {
    return <main>
      <h1>form LoginPage for auth here</h1>
      <AuthForm />
      <div>
        <p>Don&#39;t you have account? Go to</p>
        <Link to="/registration">Registration page</Link>
      </div>
      <Link to="/">go home page</Link>
    </main>;
  }
}
