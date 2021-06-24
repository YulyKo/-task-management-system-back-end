import { any } from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services';
import { TOKEN_NAME } from '../../utils/auth.consts';

export class ConfirmPage extends React.Component {

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
      <h1>For confirm click to button</h1>
      { message }
      {
        message === 'Confirmed' ?
          <Link to="/todo-list">Go to tasks</Link> :
          <Link to="/login">Go to login</Link>
      }
    </main>;
  }
}
