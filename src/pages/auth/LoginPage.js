import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
// import AuthForm from '../../components/AuthForm';

export class LoginPage extends React.Component {
  render() {
    return <main className="page">
      <h1 className="reg-page__title subtitle">Welcome to task manager system</h1>
      <LoginForm />
      <div className="reg-page__info">
        <p className="text">Don&#39;t you have account?</p>
        <Link className="reg-page__info_link text" to="/registration">Registration page</Link>
        <Link className="text link" to="/">Go to home page</Link>
      </div>
    </main>;
  }
}
