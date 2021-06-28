import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ModalWindowShell from '../ModalWindowShell';
import TaskDetails from './TaskDetails';
import TaskForm from './TaskFrom';
import app from '../../services/tasks/store';
import { taskService } from '../../services';

export default class Task extends Component {

  static get propTypes() {
    return {
      title: PropTypes.string,
      focused: PropTypes.bool,
      focus: PropTypes.any,
      key: PropTypes.any,
      task: PropTypes.object,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      isFormHidden: true,
      isTaskWindowHidden: true,
      app: app,
      isMarked: false,
    };
  }

  toggleEditForm() {
    this.setState({
      isFormHidden: !this.state.isFormHidden,
    });
  }

  toggleTaskWindow() {
    this.setState({
      isTaskWindowHidden: !this.state.isTaskWindowHidden
    });
  }

  handleTaskStatus() {
    this.setState({
      isMarked: !this.state.isMarked
    });
    const { task } = this.props;
    const { isDone, id } = this.props.task;
    this.state.app.markTask(task, !isDone);
    this.props.task.isDone = !isDone;
    taskService.actions.changeoverTaskStatus(id, !isDone);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      // for mark/unmark task local
      (nextState.isMarked === true) ||
      // for show/hide window with task details
      (nextState.isTaskWindowHidden !== this.state.isTaskWindowHidden) ||
      // for show/hide form for edit task
      (nextState.isFormHidden !== this.state.isFormHidden)
    ) {
      this.setState({ isMarked: false });
      return true;
    } else return true;
  }

  hideTask(id) {
    const htmlItem = document.getElementById(id);
    htmlItem.style.display = 'none';
  }

  deleteTask() {
    const id = this.props.task.id;
    taskService.actions.deleteFromAPI(id);
    this.state.app.removeTask(this.props.task);
    // hide element on a page
    this.hideTask(id);
  }

  render() {
    const { title, task } = this.props;
    return <li id={task.id} className="card">
      <input type="checkbox" className="input__checkbox" checked={task.isDone} onChange={this.handleTaskStatus.bind(this)} />
      <button className="btn__show-task-details" onClick={this.toggleTaskWindow.bind(this)}>
        <p className="task-name">{ title }</p>
      </button>
      {
        !this.state.isTaskWindowHidden &&
        <ModalWindowShell>
          <TaskDetails task={task} childCloseModal={this.toggleTaskWindow.bind(this)} />
        </ModalWindowShell>
      }
      <button  className="btn btn__edit" onClick={this.toggleEditForm.bind(this)}>Edit</button>
      {
        !this.state.isFormHidden &&
        <ModalWindowShell>
          <TaskForm childCloseModal={this.toggleEditForm.bind(this)} task={this.props.task}/>
        </ModalWindowShell>
      }
      <button className="btn btn__delete" onClick={this.deleteTask.bind(this)}>Delete</button>
    </li>;
  }
}