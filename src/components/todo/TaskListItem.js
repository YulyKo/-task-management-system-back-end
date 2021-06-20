import React, { Component }  from 'react';
import ModalWindowShell from './ModalWindowShell';
import TaskForm from './TaskForm';
import PropTypes from 'prop-types';
import TaskDetails from './TaskDetails';
import { TASKS } from '../../utils/api_urls';

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
    const task = this.props.task;
    // tasks.forEach((task) => {
    //   if (task.id === id) {
    //     tasks.isDone = true;
    //   }
    // });
    fetch(`${TASKS}/changeover/${task.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ status: !task.isDone })
    })
      .then(res => {
        // add task to local storage(?)
      })
      .catch(error => console.log(error));

    // http post this.props.task.isDone = true
  }

  deleteTask() {
    const id = this.props.task.id;
    // remove from local
    // for (let index = 0; index < tasks.length; index++) {
    //   const task = tasks[index];
    //   if (task.id === id) {
    //     tasks.splice(index, 1);
    //   }
    // }
    this.deleteInAPI(id);
  }

  deleteInAPI(id) {
    fetch(`${TASKS}/${id}`, {
      method: 'DELETE',
    })
      .then(res => {
        // add task to local storage(?)
      })
      .catch(error => console.log(error));
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
