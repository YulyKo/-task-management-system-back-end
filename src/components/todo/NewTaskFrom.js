import React, { Component }  from 'react';
import { Task } from '../../models/task.class';
import { PRIORITIES } from '../../utils/priorities.const';
import PropTypes from 'prop-types';
import { userService, taskService } from '../../services';
import app from '../../services/tasks/store';

export default class NewTaskForm extends Component {
  static get propTypes() { 
    return { 
      task: PropTypes.any,
      childCloseModal: PropTypes.func,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      titleError: '',
      descriptionError: '',
      priorityError: '',
      task: {},
      app: app,
    };
  }

  componentDidMount() {
    if (this.props.task) {
      this.props.task.dueDate = this.formatDate(this.props.task.dueDate);
      this.setState({ task: this.props.task });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    // undefined because I dont set true value in this.handleValidation(event)
    if (this.handleValidation(event) === undefined) {
      this.props.task ? this.update() : this.create();
      // close window
      this.props.childCloseModal();
    }
  }

  create() {
    let task = this.state.task;
    // set default data
    task.dueDate = task.dueDate ? task.dueDate : Date.now();
    task.priority = +task.priority;
    task.ownerEmail = userService.storage.getOwnerKey();
    taskService.actions.createTask(task);
    this.state.app.addRow(task);
  }

  update() {
    // set task value
    const task = this.compareTask();
    // update local task
    this.state.app.updateRow(task);
    // update at API
    taskService.actions.updateTask(task);
  }

  setFieldValue(field, e){
    let fields = this.state.task;
    fields[field] = e.target.value;
    this.setState({fields});
  }

  checkExistRequired(fieldName) {
    const errorsArray = fieldName + 'Error';
    if(!this.state.task[fieldName]) {
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
    // generate date by seconds
    const d = new Date(date);
    // get from d month, year and day
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    // set zero to month and day
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-'); // => yyyy-mm-dd
  }

  compareTask = () => {
    const newTask = new Task();
    const fieldsData = this.state.task;
    newTask.id = this.state.task.id;
    newTask.title = fieldsData.title;
    newTask.description = fieldsData.description;
    newTask.priority = fieldsData.priority;
    newTask.dueDate = fieldsData.dueDate;
    newTask.ownerEmail = userService.storage.getOwnerKey();
    return newTask;
  }

  render() {
    return <form id="form" onSubmit={this.onSubmit.bind(this)}>
      <input
        type="text"
        defaultValue={this.state.task.title}
        onChange={this.setFieldValue.bind(this, 'title')} />
      <span className="error">{this.state.titleError}</span>

      <textarea
        defaultValue={this.state.task.description}
        onChange={this.setFieldValue.bind(this, 'description')}>
      </textarea>
      <span className="error">{this.state.descriptionError}</span>

      <div onChange={this.setFieldValue.bind(this, 'priority')}>
        {PRIORITIES.map((data, index) =>
          <input key={index} type="radio" value={data} name="priority"/>
        )}
      </div>
      <span className="error">{this.state.priorityError}</span>

      {
        // I can't set default due date from this.componentDidMount()
        this.props.task ?
          <input
            type="date"
            defaultValue={this.formatDate(this.props.task.dueDate)}
            onChange={this.setFieldValue.bind(this, 'dueDate')} />
          :
          <input
            type="date"
            onChange={this.setFieldValue.bind(this, 'dueDate')} />
      }
      <button type="submit">Add</button>
    </form>;
  }
}
