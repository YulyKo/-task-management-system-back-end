import React, { Component }  from 'react';
import validator from 'validator';
import User from '../../models/user.class';
import { CONFIRM } from '../../navigation/paths.const';
import { authService, tokenService } from '../../services';
import { passwordParams, messages, locate as locales } from '../../utils/auth.const';
// import { createBrowserHistory } from 'history';
import { Redirect } from 'react-router-dom';

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
        email: 'test@mail.com',
        password: '1qASDFGHJKL',
        username: 'sdfghj',
        passwordConfirm: '1qASDFGHJKL',
      },
      access: false,
    };
  }

  setFieldValue(field, e){
    let fields = this.state.user;
    fields[field] = e.target.value;
    this.setState({fields});
  }

  compareUser() {
    const user = new User();
    user.email = this.state.user.email;
    user.password = this.state.user.password;
    user.username = this.state.user.username;
    console.log(user);
    return user;
  }

  setAccessToken(res) {
    const token = res.accessToken;
    tokenService.setToken(token);
  }

  validUser(res) {
    const key = Object.keys(res)[0];
    if (key === 'message') {
      this.setState({ userExistError: messages.USER_EXIST });
      this.setState({ access: false });
    }
    authService.setOwnerKey(this.state.user.email);
    this.setState({ access: true });
    this.setAccessToken(res);
  }

  validUsername() {
    const username = this.state.user.username;
    validator.isAlphanumeric(username, locales, { ignore: '^[a-zA-Z а-яА-Я\-]+$' }) ?
      this.setState({ usernameError: '' }) :
      this.setState({ usernameError: messages.INVALID_USERNAME });
  }

  validPasswordConfirm() {
    const password = this.state.user.password;
    const passwordConfirm = this.state.user.passwordConfirm;
    validator.equals(password, passwordConfirm) ?
      this.setState({ passwordConfirmError: '' }) :
      this.setState({ passwordConfirmError: messages.NOT_EQUALS_PASSWRODS });
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

  checkExistRequired(fieldName) {
    const errorsArrayName = fieldName + 'Error';
    const fieldValue = this.state.user[fieldName];
    const message = messages.REQUARIED;
    let resMessage = validator.isEmpty(fieldValue) ?
      message : '';
    this.setState({ [errorsArrayName]: resMessage });
    if (resMessage === '') return true;
  }

  handleValidation() {
    for (const fieldName in this.state.user) {
      // check requiered
      let isInputted = this.checkExistRequired(fieldName);

      if (isInputted) {
        // check by rules
        switch (fieldName) {
        case 'email':
          this.validEmail();
          break;

        case 'password':
          this.validPassword();
          break;
        
        case 'passwordConfirm':
          this.validPasswordConfirm();
          break;

        case 'username':
          this.validUsername();
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
    if (
      this.state.emailError === '' &&
      this.state.passwordError === '' &&
      this.state.usernameError === '' &&
      this.state.passwordConfirmError === '') {
      const newUser = this.compareUser();
      const smth = authService.registration(newUser);
      smth.then(res => {
        this.validUser(res);
      });
    }
    console.log(this.state.userExistError);
  }

  render() {
    const { access } = this.state;
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
        type="password"
        placeholder="passwordConfirm"
        onChange={this.setFieldValue.bind(this, 'passwordConfirm')} />
      <span className="error">{this.state.passwordConfirmError}</span>

      <span className="error">{this.state.userExistError}</span>

      <button type="submit">
        Registration
      </button>
      {
        access ? 
          <Redirect to={CONFIRM} /> : ''
      }
    </form>;
  }
}
