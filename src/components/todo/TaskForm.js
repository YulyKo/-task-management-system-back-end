import React, { Component }  from 'react';
import { Task } from '../../models/task.class';
import { PRIORITIES } from '../../utils/priorities';
import tasks from '../../utils/tasks';
import PropTypes from 'prop-types';

export default class TaskForm extends Component {
  static get propTypes() { 
    return { 
      task: PropTypes.any,
      toggleHidden: PropTypes.func,
    }; 
  }

  constructor(props) {
    super(props);
    this.state = {
      defaultTask: new Task(),
      titleError: '',
      descriptionError: '',
      priorityError: '',
      newTaskFields: {},
    };
  }

  componentDidMount() {
    if (this.props.task) {
      this.props.task.dueDate = this.formatDate(this.props.task.dueDate);
    }
    this.setState({ defaultTask: this.props.task ? this.props.task : new Task() });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(this.handleValidation(event));
    if (this.handleValidation(event) === undefined) {
      // undefined because I dont set true value in this.handleValidation(event)
      this.checkDueDate();
      // set task value
      const task = this.compareTask();
      // save data local
      tasks.push(task);
      console.log('http call here', tasks); // see local tasks
      this.props.toggleHidden();
    }
  }

  checkDueDate() {
    let dueDateField = this.state.newTaskFields.dueDate;
    dueDateField ? dueDateField =
      Date.parse(dueDateField) :
      dueDateField = Date.now();
  }

  handleChange(field, e){         
    let fields = this.state.newTaskFields;
    fields[field] = e.target.value;        
    this.setState({fields});
  }

  checkExistRequired(fieldName) {
    const errorsArray = fieldName + 'Error';
    if(!this.state.newTaskFields[fieldName]) {
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

  formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  compareTask = () => {
    const newTask = new Task();
    const fieldsData = this.state.newTaskFields;
    newTask.title = fieldsData.title ? fieldsData.title : this.state.defaultTask.title;
    newTask.description = fieldsData.description ? fieldsData.description : this.state.defaultTask.description;
    newTask.priority = fieldsData.priority ? fieldsData.priority : this.state.defaultTask.priority;
    newTask.dueDate = fieldsData.dueDate ? fieldsData.dueDate : this.state.defaultTask.dueDate;
    return newTask;
  }

  render() {
    return <form onSubmit={this.handleSubmit.bind(this)}>
      <input
        type="text"
        defaultValue={this.state.defaultTask.title}
        onChange={this.handleChange.bind(this, 'title')} />
      <span className="error">{this.state.titleError}</span>

      <textarea
        defaultValue={this.state.defaultTask.description}
        onChange={this.handleChange.bind(this, 'description')}>
      </textarea>
      <span className="error">{this.state.descriptionError}</span>

      <div onChange={this.handleChange.bind(this, 'priority')}>
        {PRIORITIES.map((data, index) =>
          <input key={index} type="radio" value={data} name="priority"/>
        )}
      </div>
      <span className="error">{this.state.priorityError}</span>

      {
        this.props.task ?
          <input
            type="date"
            defaultValue={this.formatDate(this.props.task.dueDate)}
            onChange={this.handleChange.bind(this, 'dueDate')} />
          :
          <input
            type="date"
            defaultValue={this.formatDate(Date.now())}
            onChange={this.handleChange.bind(this, 'dueDate')} />
      }
      <button type="submit">Add</button>
    </form>;
  }
}
