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
    };
  }

  setAccessToken(res) {
    userService.storage.setToken(res.accessToken);
    userService.storage.setConfirmedStatus(res.confirmed);
    userService.storage.setOwnerKey(res.email);
  }

  validUser(res) {
    console.log(res, res.message);
    if (res.message) {
      this.setState({ userExistError: messages.USER_NOT_EXIST });
      this.setState({ access: false });
    }
    this.setAccessToken(res);
    this.setState({ access: true });
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
    const fieldValue = this.state.user[fieldName];
    let resMessage = validator.isEmpty(fieldValue) ?
      messages.REQUARIED : '';
    this.setState({ [errorsArrayName]: resMessage });
    if (resMessage === '') return true;
  }

  handleValidation() {
    let validFomrStatus = true;
    for (const fieldName in this.state.user) {
      const isInputted = this.checkExistRequired(fieldName);
      validFomrStatus = isInputted;

      if (validFomrStatus) {
      // check by rules
        if (fieldName === 'email')
          validFomrStatus = this.validEmail();
        else if (fieldName === 'password')
          validFomrStatus = this.validPassword();
      }
    }
    return validFomrStatus;
  }

  onSubmit(event) {
    event.preventDefault();
    this.handleValidation();
    if (this.state.emailError === '' && this.state.passwordError === '') {
      const user = this.state.user;
      const loginAction = userService.actions.login(user);
      loginAction.then(res => this.validUser(res));
    }
  }

  render() {
    const owner = userService.storage.getOwnerKey();
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
      {
        owner ? 
          <Redirect to={ HOME_PAGE } /> : ''
      }
    </form>;
  }
}
