import React, { Component } from 'react';
import LogoutButton from '../../components/auth/LogoutButton';
import ModalWindowShell from '../../components/ModalWindowShell';
import TaskForm from '../../components/todo/TaskFrom';
import Task from '../../components/todo/Task';
import { taskService, userService } from '../../services';
import app from '../../services/tasks/store';
import { TASKS } from '../../utils/apiUrls.const';
import { TASK_HEADERS } from '../../utils/commonHeaders.const';

export class HomePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      app: app,
      isHidden: false,
      isMarkAll: false,
    };
  }

  closeModal() {
    this.setState({
      isHidden: !this.state.isHidden
    });
    this.forceUpdate();
  }

  markAll() {
    console.log('all mark?');
    const newStatus = !this.state.app.isAllDone;
    this.state.app.changeMarkAllTask(newStatus);
    taskService.actions.markAll(newStatus);
    this.setState({ isMarkAll: true });
  }

  setTasksList() {
    return _.map(app.rows, function (row) {
      let focus = function() {
        app.setFocusedId(row.id);
      };
      // console.log(row);
      return <Task key={row.id} task={row} title={row.title}
        focused={row.id == app.focusedId}
        focus={focus} />;
    });
  }

  getAllTasks() {
    return fetch(TASKS, {
      method: 'GET',
      headers: TASK_HEADERS,
    })
      .then(res => res.json())
      .then(
        (result) => {
          app.setDefaultRows(result);
          console.log(result);
          this.setState({
            isLoaded: true,
          });
          // call method for sort by done here
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          };
        }
      )
      .then(() => this.setDefaultMark());
  }

  componentDidMount() {
    this.getAllTasks();
  }

  setDefaultMark() {
    // set default state true. It means all tasks done
    let tasksStatus = true;
    this.state.app.rows.forEach((task) => {
      // if task not done, it'll change tasksStatus.
      // it mean not all tasks done and checkbox will be not checked
      if(task.isDone === false) tasksStatus = false;
    });
    this.state.app.setIsAllDone(tasksStatus);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const listLis = document.querySelectorAll('li');
    if ( listLis ||
      ( listLis.length !== app.rows.length ) ||
      ( nextState.isMarkAll !== this.state.isMarkAll )
    ) {
      return true;
    } else return false;
    // let promise = new Prowo0
  }

  render() {
    let btn_class = this.state.isHidden ? 'blackButton' : 'whiteButton';
    const { error, isLoaded, tasks, isAllDone } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return <main>
        <h1>New totdo list with app stage</h1>
        <LogoutButton />
        <button className={btn_class} onClick={this.closeModal.bind(this)} >
          Create a task
        </button>
        {
          this.state.isHidden && 
            <ModalWindowShell>
              {/* ModalWindowShell get child in props */}
              {/* TaskForm emit method toggleHidden from child of modal Window */}
              <TaskForm childCloseModal={this.closeModal.bind(this)}/>
            </ModalWindowShell>
        }
        <input id="checkAllInput" type="checkbox" checked={ this.state.app.isAllDone } onChange={this.markAll.bind(this)}
        />
        <ul>
          {this.setTasksList()}
        </ul>
      </main>;
    }
  }
}