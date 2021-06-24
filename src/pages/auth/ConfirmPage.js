import React from 'react';
import { Link } from 'react-router-dom';
import { TOKEN_NAME } from '../../utils/auth.consts';

export class ConfirmPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }

  componentDidMount() {
    const token = localStorage.getItem(TOKEN_NAME);
    this.setState({ token: token });
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
