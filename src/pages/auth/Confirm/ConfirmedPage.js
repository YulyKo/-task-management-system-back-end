import React from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../../services';

export class ConfirmedPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      message: any,
    };
  }

  componentDidMount() {
    const code = window.location.pathname.replace('/confirm/', '');
    authService.confirmUser(code)
      .then((res) => {
        this.setState({ message: res.message });
      });
  }

  render() {
    const { message } = this.state;
    return <main>
      {
        message === 'Confirmed' ?
          <>
            <h1>Account is confirmed</h1>
            <p>You have access to system</p>
            <Link to="/todo-list">Go to tasks</Link>
          </> :
          <>
            <h1>Account isn&#39;t confirmed</h1>
            <p>User not exist</p>
            <Link to="/registration">Go to registration</Link>
          </>
      }
    </main>;
  }
}
