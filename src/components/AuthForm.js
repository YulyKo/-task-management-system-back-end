import React, { Component }  from 'react';

export default class AuthForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      titleError: '',
      descriptionError: '',
      priorityError: '',
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
    // undefined because I don't set true value in this.handleValidation(event)
    if (this.handleValidation(event) === undefined) {
      this.state.formType !== 'login' ? this.update() : this.create();
    }
  }

  setFieldValue(field, e){
    let fields = this.state.user;
    fields[field] = e.target.value;
    this.setState({fields});
  }

  checkExistRequired(fieldName) {
    const errorsArray = fieldName + 'Error';
    if(!this.state.user[fieldName]) {
      this.setState({ [errorsArray]: 'Cannot be empty' });
      return false;
    } else this.setState({ [errorsArray]: '' });
  }

  handleValidation() {
    let formValidStatus = true;
    const requiredFieldsNames = ['title', 'description', 'priority'];
    requiredFieldsNames.forEach((fieldName) => {
      formValidStatus = this.checkExistRequired(fieldName);
    });
    return formValidStatus;
  }

  compareTask = () => {
    const newTask = new Task();
    const fieldsData = this.state.user;
    newTask.title = fieldsData.title;
    newTask.description = fieldsData.description;
    newTask.priority = fieldsData.priority;
    newTask.dueDate = fieldsData.dueDate;
    return newTask;
  }

  render() {
    return <form id="form" onSubmit={this.onSubmit.bind(this)}>
      {
        // show input for write username
        this.state.formType === 'registration' ?
          <div>
            <input
              type="text"
              placeholder="username"
              onChange={this.setFieldValue.bind(this, 'username')} 
              required/>
            <span className="error">{this.state.usernameError}</span>
          </div>
          :
          <span></span>
      }

      <input
        type="text"
        placeholder="email"
        onChange={this.setFieldValue.bind(this, 'email')}
        required/>
      <span className="error">{this.state.emailError}</span>

      <input
        type="password"
        placeholder="email"
        onChange={this.setFieldValue.bind(this, 'password')}
        required/>
      <span className="error">{this.state.passordError}</span>

      {
        // show input for write confirm password
        this.state.formType === 'registration' ?
          <div>
            <input
              type="password"
              placeholder="repeat password"
              onChange={this.setFieldValue.bind(this, 'confirmPassword')}
              required/>
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
