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
    return <main className="confirmed-page">
      <img className="confirmed-page__img" src="https://firebasestorage.googleapis.com/v0/b/green-peach.appspot.com/o/tms-resourses%2Ftms-img2.jpg?alt=media&token=343cc7da-84b6-4569-8851-09bc8ff268a9" alt="image" />
      {
        message === 'Confirmed' ?
          <div className="confirmed-page__container">
            <h1 className="title">Account is confirmed</h1>
            <p className="subtitle">You have access to system</p>
            {
              token ?
                <Link className="confirmed-page__container_link" to="/todo-list">Go to tasks</Link> :
                <Link className="confirmed-page__container_link" to="/login">Go to tasks</Link>
            }
          </div> :
          <div className="confirmed-page__container">
            <h1>Account isn&#39;t confirmed</h1>
            <p>User not exist</p>
            <Link className="confirmed-page__container_link" to="/registration">Go to registration</Link>
          </div>
      }
    </main>;
  }
}
