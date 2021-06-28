import React from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../../services';

export class ConfirmedPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
      message: '',
    };
  }

  componentDidMount() {
    const code = window.location.pathname.replace('/confirm/', '');
    userService.actions.confirmUser(code)
      .then((res) => {
        this.setState({ message: res.message });
      });
    const token = userService.storage.getToken();
    this.setState({ token: token });
  }

  render() {
    const { message, token } = this.state;
    return <main>
      {
        message === 'Confirmed' ?
          <>
            <h1>Account is confirmed</h1>
            <p>You have access to system</p>
            {
              token ?
                <Link to="/todo-list">Go to tasks</Link> :
                <Link to="/login">Go to tasks</Link>
            }
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
