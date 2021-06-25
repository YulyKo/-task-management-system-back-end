import React, { Component }  from 'react';
import ModalWindowShell from '../../components/ModalWindowShell';
import TasksList from '../../components/todo/TasksList';
import TaskForm from '../../components/todo/TaskForm';
import LogoutButton from '../../components/auth/LogoutButton';

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [], // type is Task, look models/task.class.js
      isHidden: false,
      isLoaded: false,
    };
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  render() {
    let btn_class = this.state.isHidden ? 'blackButton' : 'whiteButton';
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
        <TasksList />
      </div>
    );
  }
}
