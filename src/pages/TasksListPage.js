import React, { Component }  from 'react';
import tasks from '../utils/tasks';
import ModalWindowShell from '../components/todo/ModalWindowShell';
import TaskListItem from '../components/todo/TaskListItem';
import TaskForm from '../components/todo/TaskForm';

export class TasksListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: tasks, // type is Task, look models/task.class.js
      isHidden: true,
    };
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  render() {
    let btn_class = this.state.isHidden ? 'blackButton' : 'whiteButton';
    return <div>
      <button className={btn_class} onClick={this.toggleHidden.bind(this)} >
        Create a task
      </button>
      {
        !this.state.isHidden && 
        <ModalWindowShell>
          {/* ModalWindowShell get child in props */}
          {/* TaskForm emit method toggleHidden from child of modal Window */}
          <TaskForm toggleHidden={this.toggleHidden.bind(this)}/>
        </ModalWindowShell>
      }
      {tasks.map((task, index) => (
        <TaskListItem key={index} task={task} />
      ))}
    </div>;
  }
}
