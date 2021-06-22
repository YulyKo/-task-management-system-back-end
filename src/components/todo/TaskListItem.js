import React, { Component }  from 'react';
import ModalWindowShell from '../ModalWindowShell';
import TaskForm from './TaskForm';
import PropTypes from 'prop-types';
import TaskDetails from './TaskDetails';
import { taskService } from '../../services';

export default class TaskListItem extends Component {
  static get propTypes() {
    return {
      task: PropTypes.any, // type is Task, look models/task.class.js
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      isFormHidden: true,
      isTaskWindowHidden: true,
    };
  }

  toggleEditForm() {
    this.setState({
      isFormHidden: !this.state.isFormHidden
    });
  }

  toggleTaskWindow() {
    this.setState({
      isTaskWindowHidden: !this.state.isTaskWindowHidden
    });
  }

  handleTaskStatus() {
    const taskId = this.props.task.id;
    taskService.changeoverTaskStatus(taskId);
  }

  deleteTask() {
    const id = this.props.task.id;
    taskService.deleteFromAPI(id);
  }


  render() {
    return <div>
      <input type="checkbox" defaultChecked={this.props.task.isDone}
        onChange={this.handleTaskStatus.bind(this)} />
      <button onClick={this.toggleTaskWindow.bind(this)}>
        <p>{this.props.task.title}</p>
      </button>
      {
        !this.state.isTaskWindowHidden &&
        <ModalWindowShell>
          <TaskDetails toggleHidden={this.toggleEditForm.bind(this)} task={this.props.task}/>
        </ModalWindowShell>
      }
      <button onClick={this.toggleEditForm.bind(this)}>Edit - it is link</button>
      {
        !this.state.isFormHidden &&
        <ModalWindowShell>
          <TaskForm toggleHidden={this.toggleEditForm.bind(this)} task={this.props.task}/>
        </ModalWindowShell>
      }
      <button onClick={this.deleteTask.bind(this)}>Delete</button>
    </div>;
  }
}
