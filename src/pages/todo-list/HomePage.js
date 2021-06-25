import React, { Component }  from 'react';
import ModalWindowShell from '../../components/ModalWindowShell';
import TaskListItem from '../../components/todo/TaskListItem';
import TaskForm from '../../components/todo/TaskForm';
import {useLocation} from 'react-router-dom';
import { TASKS } from '../../utils/apiUrls.const';
import { TASK_HEADERS } from '../../utils/commonHeaders.const';
import { OWNER_TOKEN_NAME } from '../../utils/auth.const';
import { LogoutButton } from '../../components/auth/LogoutButton';

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [], // type is Task, look models/task.class.js
      isHidden: false,
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
          console.log(result);
          this.setState({
            isLoaded: true,
            tasks: result,
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

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  render() {
    let btn_class = this.state.isHidden ? 'blackButton' : 'whiteButton';

    const { error, isLoaded, tasks } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <button className={btn_class} onClick={this.toggleHidden.bind(this)} >
          Create a task
          </button>
          <LogoutButton />
          {
            this.state.isHidden && 
            <ModalWindowShell>
              {/* ModalWindowShell get child in props */}
              {/* TaskForm emit method toggleHidden from child of modal Window */}
              <TaskForm toggleHidden={this.toggleHidden.bind(this)}/>
            </ModalWindowShell>
          }
          { tasks }
          {/* {tasks.map((task, index) => (
            <TaskListItem key={index} task={task} />
          ))} */}
        </div>
      );
    }
  }
}
