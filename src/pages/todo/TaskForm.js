import React, { Component }  from 'react';
import { Task } from '../../models/task.class';
import { PRIORITIES } from '../../utils/priorities';
import tasks from '../../utils/tasks';
import PropTypes from 'prop-types';

export default class TaskForm extends Component {
  static get propTypes() { 
    return { 
      task: PropTypes.any,
    }; 
  }

  constructor(props) {
    super(props);
    this.state = {
      defaultTask: new Task(),
      priority: 1,
      title: '',
      description: '',
      dueDate: Date.now(),
      errors: [],
    };
    this.handleChangeDueDate = this.handleChangeDueDate.bind(this);
    this.handleChangePriority = this.handleChangePriority.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.task) {
      this.props.task.dueDate = this.formatDate(this.props.task.dueDate);
    }
    this.setState({ defaultTask: this.props.task ? this.props.task : new Task() });
  }

  handleChangeTitle(event) {
    this.setState({ title: event.target.value });
  }

  handleChangeDescription(event) {
    this.setState({ description: event.target.value });
  }

  handleChangePriority(event) {
    this.setState({ priority: event.target.value });
  }

  handleChangeDueDate(event) {
    this.setState({ priority: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.compareTask();
    console.log('submited', tasks);
  }

  formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) 
      month = '0' + month;
    if (day.length < 2) 
      day = '0' + day;

    console.log(date, [year, month, day].join('-'));
    return [year, month, day].join('-');
  }

  compareTask = () => {
    const newTask = new Task();
    newTask.title = this.state.title ? this.state.title : this.state.defaultTask.title;
    newTask.description = this.state.description ? this.state.description : this.state.defaultTask.description;
    newTask.priority = this.state.priority ? this.state.priority : this.state.defaultTask.priority;
    newTask.dueDate = this.state.dueDate ? this.state.dueDate : this.state.defaultTask.dueDate;
    tasks.push(newTask);
  }

  render() {
    return <form onSubmit={this.handleSubmit}>
      <input
        type="text"
        defaultValue={this.state.defaultTask.title}
        onChange={this.handleChangeTitle} />

      <textarea
        defaultValue={this.state.defaultTask.description}
        onChange={this.handleChangeDescription}>
      </textarea>

      <div onChange={this.handleChangePriority}>
        {PRIORITIES.map((data, index) =>
          <input key={index} type="radio" value={data} name="priority"/>
        )}
      </div>
      {
        this.props.task ?
          <input
            type="date"
            defaultValue={this.formatDate(this.props.task.dueDate)}
            onChange={this.handleChangeDueDate} />
          :
          <input
            type="date"
            defaultValue={this.formatDate(Date.now())}
            onChange={this.handleChangeDueDate} />
      }
      <button type="submit">Add</button>
    </form>;
  }
}
