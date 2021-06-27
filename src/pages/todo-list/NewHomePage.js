import React, { Component } from 'react';
import LogoutButton from '../../components/auth/LogoutButton';
import ModalWindowShell from '../../components/ModalWindowShell';
import NewTaskForm from '../../components/todo/NewTaskFrom';
import Task from '../../components/todo/Task';
import { taskService, userService } from '../../services';
import app from '../../services/tasks/store';
import { TASKS } from '../../utils/apiUrls.const';
import { TASK_HEADERS } from '../../utils/commonHeaders.const';

export class NewHomePage extends Component {

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
          // taskService.mutations.setTasks(result);
          this.setState({
            isLoaded: true,
            // tasks: taskService.mutations.storage.tasks,
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
        
        if (error.staus === 401) {
          const state = userService.actions.refreshToken();
          this.setState(state);
        }
      });

    // fetch(TASKS, {
    //   method: 'GET',
    //   headers: TASK_HEADERS,
    // })
    //   .then(res => res.json())
    //   .then(
    //     (result) => {
    //       console.log(result);
    //       app.setDefaultRows(result);
    //       // taskService.mutations.setTasks(result);
    //       this.setState({
    //         isLoaded: true,
    //         // tasks: taskService.mutations.storage.tasks,
    //       });
    //       // sort by done here
    //     },
    //   )
    //   .then(() => this.setDefaultMark())
    //   .catch((error) => {
    //     this.setState({
    //       isLoaded: true,
    //       error
    //     });
    //   });

    // fetch(TASKS, {
    //   method: 'GET',
    //   headers: TASK_HEADERS,
    // })
    //   .then((res) => {
    //     console.log(res);
    //     res.json();
    //     // if (res.staus === 401) {
    //     //   const state = userService.actions.refreshToken();
    //     //   this.setState(state);
    //     // }
    //     // console.log(res);
    //   })
    //   .then((result) => {
    //     console.log(result);
    //     this.setState({
    //       isLoaded: true,
    //     });
    //     app.setDefaultRows(result);
    //     console.log(this.state.app);
    //     // sort by done here
    //     this.setDefaultMark();
    //   },
    //   (error) => {
    //     this.setState({
    //       isLoaded: true,
    //       error
    //     });
    //   });
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