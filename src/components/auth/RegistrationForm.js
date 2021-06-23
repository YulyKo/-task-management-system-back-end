import React, { Component }  from 'react';
import validator from 'validator';
import { messages } from '../../utils/auth.consts';

export default class RegistrationForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      usernameError: '',
      emailError: '',
      passwordError: '',
      passwordConfirmError: '',
      userExistError: '',
      user: {
        email: '',
        password: '',
        username: '',
        passwordConfirm: '',
      },
    };
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
    const message = messages.REQUARIED;
    let resMessage = validator.isEmpty(fieldValue) ?
      message : '';
    this.setState({ [errorsArrayName]: resMessage });
    if (resMessage === '') {
      return true;
    }
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
      // send user to API
      console.log(user);
    }
  }

  render() {
    return <form id="form" onSubmit={this.onSubmit.bind(this)}>
      <input
        type="text"
        placeholder="username"
        onChange={this.setFieldValue.bind(this, 'username')} />
      <span className="error">{this.state.usernameError}</span>

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

      <input
        type="passwordConfirm"
        placeholder="passwordConfirm"
        onChange={this.setFieldValue.bind(this, 'passwordConfirm')} />
      <span className="error">{this.state.passwordConfirmError}</span>

      <button type="submit">
        Login
      </button>
    </form>;
  }
}
