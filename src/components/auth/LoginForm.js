import React, { Component }  from 'react';
import validator from 'validator';
import { login } from '../../services/auth';
import { passwordParams, messages, TOKEN_NAME } from '../../utils/auth.consts';

export default class LoginForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      emailError: '',
      passwordError: '',
      userExistError: '',
      user: {
        email: '',
        password: '',
      },
    };
  }
  
  setAccessToken(res) {
    localStorage.setItem(TOKEN_NAME, res.accessToken);
  }

  validUser(res) {
    console.log(res, res.message);
    if (res.message) {
      this.setState({ userExistError: res.message });
    }
    this.setAccessToken(res);
  }

  validPassword() {
    const password = this.state.user.password;
    validator.isStrongPassword(password, passwordParams) ?
      this.setState({ passwordError: '' }) :
      this.setState({ passwordError: messages.INVALID_PASSWORD });
  }

  validEmail() {
    const email = this.state.user.email;
    validator.isEmail(email) ?
      this.setState({ emailError: '' }) :
      this.setState({ emailError: messages.INVALID_EMAIL });
  }

  setFieldValue(field, e){
    let fields = this.state.user;
    fields[field] = e.target.value;
    this.setState({fields});
  }

  checkExistRequired(fieldName) {
    const errorsArrayName = fieldName + 'Error';
    const fieldValue = this.state.user[fieldName];
    let resMessage = validator.isEmpty(fieldValue) ?
      messages.REQUARIED : '';
    this.setState({ [errorsArrayName]: resMessage });
    if (resMessage === '') return true;
  }

  handleValidation() {
    for (const fieldName in this.state.user) {
      let isInputted = this.checkExistRequired(fieldName);
      if (isInputted) {
        switch (fieldName) {
        case 'email':
          this.validEmail();
          break;
        case 'password':
          this.validPassword();
          break;

        default:
          break;
        }
      }
    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.handleValidation();
    if (this.state.emailError === '' && this.state.passwordError === '') {
      const user = this.state.user;
      const smth = login(user);
      smth.then(res => this.validUser(res));
    }
  }

  render() {
    return <form id="form" onSubmit={this.onSubmit.bind(this)}>
      <input
        type="text"
        placeholder="email"
        onChange={this.setFieldValue.bind(this, 'email')} />
      <span className="error">{this.state.emailError}</span>

      <input
        type="password"
        placeholder="password"
        onChange={this.setFieldValue.bind(this, 'password')} />
      <span className="error">{this.state.passwordError}</span>

      <span className="error">{this.state.userExistError}</span>

      <button type="submit">
        Login
      </button>
    </form>;
  }
}
