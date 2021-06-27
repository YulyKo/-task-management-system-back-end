import React, { Component  } from 'react';
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
      isAllDone: false,
      app: app,
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
          this.setState({
            isLoaded: true,
            tasks: taskService.mutations.storage.tasks,
          });
          // sort by done here
        },
      )
      .then(() => this.setDefaultMark())
      .catch((error) => {
        this.setState({
          isLoaded: true,
          error
        });
      });
  }

  //before we render, start listening to the app for changes
  componentWillMount() {
    this.setState.app({ listener: this });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log(this.state.isAllDone, nextState.isAllDone);
    if(this.state.isAllDone === nextState.isAllDone) {
      return true;
    }
    return false;
  }

  setDefaultMark() {
    // set default state true. It means all tasks done
    let tasksStatus = true;
    this.state.tasks.forEach((task) => {
      // if task not done, it'll change tasksStatus.
      // it mean not all tasks done and checkbox will be not checked
      if(task.isDone === false) tasksStatus = false;
    });
    this.setState({ isAllDone: tasksStatus });
  }

  markAll() {
    const { isAllDone } = this.state;
    const newStatus = !isAllDone;
    this.setState({ isAllDone: newStatus });
    taskService.actions.markAll(newStatus);
  }

  render() {
    const { error, isLoaded, tasks, isAllDone } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return <div>
        <input id="checkAllInput" type="checkbox" checked={ isAllDone }
          onChange={ this.markAll.bind(this) }
        />
        <ul>
          { tasks.length > 0 ? 
            tasks.map((task, index) => (
              <TaskListItem
                key={index} task={task}
              />
            )) :
            <p>No tasks</p>
          }
        </ul>
      </div>;
    }
  }
}