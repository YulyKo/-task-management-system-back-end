import React, { Component }  from 'react';
import validator from 'validator';
import { HOME_PAGE } from '../../navigation/paths.const';
import { userService } from '../../services';
import { passwordParams, messages } from '../../utils/auth.const';
import { Redirect } from 'react-router-dom';

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
      access: false,
    };
  }

  setAccess() {
    setTimeout(() => {
      this.setState({ access: true });
    }, 1000);
  }

  setAccessToken(res) {
    userService.storage.setToken(res.accessToken);
    userService.storage.setConfirmedStatus(res.confirmed);
    userService.storage.setOwnerKey(res.email);
  }

  validUser(res) {
    if (res.message) {
      this.setState({ userExistError: res.message });
      this.setState({ access: false });
    } else {
      this.setAccessToken(res);
      this.setAccess();
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
    if (validator.isEmail(email)) {
      this.setState({ emailError: '' });
    } else {
      this.setState({ emailError: messages.INVALID_EMAIL });
      return false;
    }
  }

  setFieldValue(field, e){
    let fields = this.state.user;
    fields[field] = e.target.value;
    this.setState({fields});
  }

  checkExistRequired(fieldName) {
    const errorsArrayName = fieldName + 'Error';
    const message = messages.REQUARIED;
    const fieldValue = this.state.user[fieldName];
    let resMessage = validator.isEmpty(fieldValue) ?
      message : '';
    this.setState({ [errorsArrayName]: resMessage });
    if (resMessage === message) return false;
    else return true;
  }

  handleValidation() {
    let validFomrStatus = true;
    for (const fieldName in this.state.user) {
      const isInputted = this.checkExistRequired(fieldName);
      validFomrStatus = isInputted;

      if (validFomrStatus === true) {
      // check by rules
        if (fieldName === 'email' && this.validEmail() === false) {
          validFomrStatus = false;
        } else if (fieldName === 'password' && this.validPassword() === false) {
          validFomrStatus = false;
        }
      } else validFomrStatus = false;
    }
    return validFomrStatus;
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.handleValidation() !== false) {
      const user = this.state.user;
      const loginAction = userService.actions.login(user);
      loginAction.then((result) => this.validUser(result));
    }
  }

  render() {
    const { access, passwordError, emailError, userExistError } = this.state;
    return <form className="form" id="form" onSubmit={this.onSubmit.bind(this)}>
      <input className="input__text"
        type="text"
        placeholder="email"
        onChange={this.setFieldValue.bind(this, 'email')} />
      <span className="error-message">{emailError}</span>

      <input className="input__text"
        type="password"
        placeholder="password"
        onChange={this.setFieldValue.bind(this, 'password')} />
      <span className="error-message">{passwordError}</span>

      <span className="error-message">{userExistError}</span>

      <button className="btn btn__submit" type="submit">
        Login
      </button>
      {
        access ? 
          <Redirect to={ HOME_PAGE } /> : ''
      }
    </form>;
  }
}
