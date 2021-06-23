import React, { Component }  from 'react';
import User from '../../models/user.class';
import validator from 'validator';

export default class AuthForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      usernameError: '',
      emailError: '',
      passwordError: '',
      passwordConfirmError: '',
      userExistError: '',
      user: {},
      formType: '',
    };
  }

  componentDidMount() {
    const pathname = window.location.pathname;
    console.log(pathname.substring(1));
    this.setState({ formType: pathname.substring(1)});
  }

  onSubmit(event) {
    event.preventDefault();
    const requiredFieldsNames = ['email', 'password'];
    if (this.state.formType === 'login') {
      this.handleValidation(requiredFieldsNames);
    } else {
      requiredFieldsNames.push('username', 'confirmPassword');
      this.handleValidation(requiredFieldsNames);
      this.validConfirmPassword();
    }
    this.validEmail();
    this.validPassword();
    this.compareUser();
  }

  validPassword() {
    const password = this.state.user.password;
    validator.isStrongPassword(password);
    // default password validator
    /*
      { minLength: 8, minLowercase: 1, minUppercase: 1,
        minNumbers: 1, minSymbols: 1,
        returnScore: false,
        pointsPerUnique: 1, pointsPerRepeat: 0.5,
        pointsForContainingLower: 10, pointsForContainingUpper: 10,
        pointsForContainingNumber: 10, pointsForContainingSymbol: 10 }
    */
  }

  validConfirmPassword() {
    const password = this.state.user.password;
    const confirmPassword = this.state.user.confirmPassword;
    validator.equals(password, confirmPassword) ?
      this.setState({ passwordConfirmError: 'Passwords not equals' }) :
      this.setState({ passwordConfirmError: '' });
  }

  validEmail() {
    const email = this.state.user.email;
    validator.isEmail(email) ?
      this.setState({ emailError: 'Cannot be empty' }) :
      this.setState({ emailError: '' });
  }

  setFieldValue(field, e){
    let fields = this.state.user;
    fields[field] = e.target.value;
    this.setState({fields});
  }

  checkExistRequired(fieldName) {
    const errorsArray = fieldName + 'Error';
    const fieldValue = this.state.user[fieldName];
    if(validator.isEmpty(fieldValue)) {
      this.setState({ [errorsArray]: 'Cannot be empty' });
      return false;
    } else this.setState({ [errorsArray]: '' });
  }

  handleValidation(requiredFieldsNames) {
    let formValidStatus = true;
    requiredFieldsNames.forEach((fieldName) => {
      formValidStatus = this.checkExistRequired(fieldName);
    });
    return formValidStatus;
  }

  compareUser = () => {
    const user = new User();
    const fieldsData = this.state.user;
    console.log(Object.keys(fieldsData));
    // user.username = fieldsData.username;
    // user.description = fieldsData.description;
    // user.priority = fieldsData.priority;
    // user.dueDate = fieldsData.dueDate;
    return user;
  }

  render() {
    return <form id="form" onSubmit={this.onSubmit.bind(this)}>
      {
        // show input for write username only on registration page
        this.state.formType === 'registration' ?
          <div>
            <input
              type="text"
              placeholder="username"
              onChange={this.setFieldValue.bind(this, 'username')} />
            <span className="error">{this.state.usernameError}</span>
          </div>
          :
          <span></span>
      }

      <input
        type="text"
        placeholder="email"
        onChange={this.setFieldValue.bind(this, 'email')} />
      <span className="error">{this.state.emailError}</span>

      <input
        type="password"
        placeholder="email"
        onChange={this.setFieldValue.bind(this, 'password')} />
      <span className="error">{this.state.passordError}</span>

      {
        // show input for write confirmPassword only on registration page
        this.state.formType === 'registration' ?
          <div>
            <input
              type="password"
              placeholder="repeat password"
              onChange={this.setFieldValue.bind(this, 'confirmPassword')} />
            <span>{this.state.confirmPasswordError}</span>
          </div>
          :
          <span></span>
      }
      <button type="submit">
        {
          this.state.formType === 'registration' ?
            'Create account' : 'Login'
        }
      </button>
    </form>;
  }
}
