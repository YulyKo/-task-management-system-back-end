import React, { Component } from 'react';
import { taskService } from '../../services';
import { TASKS } from '../../utils/apiUrls.const';
import { TASK_HEADERS } from '../../utils/commonHeaders.const';
import TaskListItem from './TaskListItem';

export default class TasksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isLoaded: false,
      error: '',
    };
  }

  componentDidMount() {
    fetch(TASKS, {
      method: 'GET',
      headers: TASK_HEADERS,
    })
      .then(res => res.json())
      .then(
        (result) => {
          taskService.mutations.setTasks(result);
          console.log();
          this.setState({
            isLoaded: true,
            tasks: taskService.mutations.storage.tasks,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, tasks } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return <ul>
        { tasks.length > 0 ? 
          tasks.map((task, index) => (
            <TaskListItem key={index} task={task} />
          )) :
          <p>No tasks</p>
        }
      </ul>;
    }
  }
}