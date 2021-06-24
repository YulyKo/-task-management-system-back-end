import React from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../services';
import { TOKEN_NAME } from '../../utils/auth.consts';

export class ConfirmPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }

  componentDidMount() {
    const code = window.location.pathname.replace('/confirm/', '');
    if (code) {
      authService.confirmUser(code); 
    }
  }

  render() {
    const { token } = this.state;
    return <main>
      <h1>For confirm click to button</h1>
      {
        token === '' ?
          <Link to="/login">go to login</Link> :
          <Link to="/todo-list">go to tasks</Link>
      }
    </main>;
  }
}
