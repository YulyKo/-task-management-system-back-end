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
      changed: false,
    };
  }
  /*
  w()}}>
        add row
      </a>
    </div>;
  }
});

React.renderComponent(
    <View />
    , document.body);

  */

  constructor(props) {
    super(props);
    this.state = {
      isFormHidden: true,
      isTaskWindowHidden: true,
      taskStatus: this.props.task.isDone,
      changed: false,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps.task, this.props.task);
    if (nextProps.task === this.props.task) {
      return true;
    }
    return false;
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
    const { id } = this.props.task;
    const { taskStatus } = this.state;
    taskService.actions.markAll(id, !taskStatus);
    this.setState({ taskStatus: !this.state.taskStatus });
    this.setState({ changed: true });
  }

  hideTask(id) {
    const htmlItem = document.getElementById(id);
    htmlItem.style.display = 'none';
  }

  deleteTask() {
    const id = this.props.task.id;
    taskService.actions.deleteFromAPI(id);

    // hide element on a page
    this.hideTask(id);
  }

  render() {
    const { id, title } = this.props.task;
    const { taskStatus } = this.state;
    return <li id={id}>
      <input type="checkbox" checked={taskStatus}
        onChange={this.handleTaskStatus.bind(this)} />
      <button onClick={this.toggleTaskWindow.bind(this)}>
        <p>{title}</p>
        {
          taskStatus ? <p> done</p> : 'not done'
        }
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
    </li>;
  }
}
