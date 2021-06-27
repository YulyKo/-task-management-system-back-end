import React, { Component } from 'react';
import LogoutButton from '../../components/auth/LogoutButton';
import ModalWindowShell from '../../components/ModalWindowShell';
import NewTaskForm from '../../components/todo/NewTaskFrom';
import Task from '../../components/todo/Task';
import { taskService } from '../../services';
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

  componentDidMount() {
    fetch(TASKS, {
      method: 'GET',
      headers: TASK_HEADERS,
    })
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          app.setDefaultRows(result);
          this.setState({
            isLoaded: true,
          });
          // sort by done here
          (error) => {
            this.setState({
              isLoaded: true,
            });
          };
        })
      .then(() => this.setDefaultMark());
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
  }

  render() {
    let btn_class = this.state.isHidden ? 'blackButton' : 'whiteButton';
    const { isLoaded } = this.state;
    if (!isLoaded) {
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
              <NewTaskForm childCloseModal={this.closeModal.bind(this)}/>
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