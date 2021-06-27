import React, { Component }  from 'react';
import validator from 'validator';
import User from '../../models/user.class';
import { CONFIRM } from '../../navigation/paths.const';
import { userService } from '../../services';
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
        email: '',
        password: '',
        username: '',
        passwordConfirm: '',
      },
      access: false,
    };
  }

  // test user
  // "email": "test@mail.com",
  // "password": "1qASDFGHJKL"

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
    userService.storage.setToken(token);
  }

  validUser(res) {
    const key = Object.keys(res)[0];
    if (key === 'message') {
      this.setState({ userExistError: messages.USER_EXIST });
      this.setState({ access: false });
    } else {
      userService.storage.setOwnerKey(this.state.user.email);
      this.setState({ access: true });
      this.setAccessToken(res);
    }
    console.log(this.state);
  }

  validUsername() {
    const username = this.state.user.username;
    const validStatus = validator.isAlphanumeric(username, locales, { ignore: '^[a-zA-Z а-яА-Я\-]+$' });
    if (validStatus){
      this.setState({ usernameError: '' });
    } else {
      this.setState({ usernameError: messages.INVALID_USERNAME });
      return false;
    }
  }

  validPasswordConfirm() {
    const password = this.state.user.password;
    const passwordConfirm = this.state.user.passwordConfirm;
    const validStatus = validator.equals(password, passwordConfirm);
    if (validStatus){
      this.setState({ passwordConfirmError: '' });
    } else {
      this.setState({ passwordConfirmError: messages.NOT_EQUALS_PASSWRODS });
      return false;
    }
  }

  validPassword() {
    const password = this.state.user.password;
    const validStatus = validator.isStrongPassword(password, passwordParams);
    if (validStatus){
      this.setState({ passwordError: '' });
    } else {
      this.setState({ passwordError: messages.INVALID_PASSWORD });
      return false;
    }
  }

  validEmail() {
    const email = this.state.user.email;
    if (validator.isEmail(email)){
      this.setState({ emailError: '' });
    } else {
      this.setState({ emailError: messages.INVALID_EMAIL });
      return false;
    }
  }

  checkExistRequired(fieldName) {
    const errorsArrayName = fieldName + 'Error';
    const fieldValue = this.state.user[fieldName];
    const message = messages.REQUARIED;
    let resMessage = validator.isEmpty(fieldValue) ?
      message : '';
    this.setState({ [errorsArrayName]: resMessage });
    if (resMessage === message) return false;
    else return true;
  }

  handleValidation() {
    let validFomrStatus = true;
    for (const fieldName in this.state.user) {
      // check requiered
      const isInputted = this.checkExistRequired(fieldName);
      validFomrStatus = isInputted;

      if (validFomrStatus) {
      // check by rules
        if (fieldName === 'email')
          validFomrStatus = this.validEmail();
        else if (fieldName === 'password')
          validFomrStatus = this.validPassword();
        else if (fieldName === 'passwordConfirm')
          validFomrStatus = this.validPasswordConfirm();
        else if (fieldName === 'username')
          validFomrStatus = this.validUsername();
      } else validFomrStatus = false;
    }
    return validFomrStatus;
  }

  onSubmit(event) {
    event.preventDefault();
    if(this.handleValidation() !== false) {
      console.log(this.state);
      const newUser = this.compareUser();
      const registrationAction = userService.actions.registration(newUser);
      registrationAction.then(res => {
        this.validUser(res);
      });
    }
    console.log(this.handleValidation());
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
