import React, { Component }  from 'react';
import User from '../../models/user.class';
import validator from 'validator';
import { passwordParams } from '../../utils/auth.consts';

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

  validPassword() {
    const password = this.state.user.password;
    // TODO replace all messagess to const in utils
    const message = `Password is not correct.
      It must have minimum 8 letters, minimum one uppercase and one lovercase letter`;
    validator.isStrongPassword(password, passwordParams) ?
      this.setState({ passwordError: '' }) :
      this.setState({ passwordError: message });
  }

  validEmail() {
    const email = this.state.user.email;
    const message = 'Email is not correct';
    validator.isEmail(email) ?
      this.setState({ emailError: '' }) :
      this.setState({ emailError: message });
  }

  setFieldValue(field, e){
    let fields = this.state.user;
    fields[field] = e.target.value;
    this.setState({fields});
  }

  checkExistRequired(fieldName) {
    const errorsArrayName = fieldName + 'Error';
    const fieldValue = this.state.user[fieldName];
    const message = 'Cannot be empty';
    let resMessage = validator.isEmpty(fieldValue) ?
      message : '';
    this.setState({ [errorsArrayName]: resMessage });
    if (resMessage === '') {
      return true;
    }
  }

  handleValidation() {
    let isRequaried = true;
    for (const fieldName in this.state.user) {
      isRequaried = this.checkExistRequired(fieldName);
      if (isRequaried) {
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
    return this.state.emailError === '' && this.state.passwordError === '';
  }

  onSubmit(event) {
    event.preventDefault();
    this.handleValidation();
    const user = this.state.user;
    // send user to API
    console.log(user);
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

      <button type="submit">
        Login
      </button>
    </form>;
  }
}
