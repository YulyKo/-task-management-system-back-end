import { Component } from "react";
import tasks from "../../utils/tasks";
import ModalWindowShell from "./ModalWindowShell";
import TaskForm from "./TaskForm";

export default class TaskListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isHidden: true,
    };
  }
  
  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  deleteTask() {
    const id = this.props.id;
    for (let index = 0; index < tasks.length; index++) {
      const task = tasks[index];
      if (task.id === id) {
        tasks.splice(index, 1);
      }
    }
    console.log(tasks);
  }

  render() {
    return <div>
      <input type="checkbox"/>
      <p>{this.props.title}</p>
      <button onClick={this.toggleHidden.bind(this)}>Edit - it is link</button>
      {
        !this.state.isHidden && 
        <ModalWindowShell>
          <TaskForm task={this.props.task}/>
        </ModalWindowShell>
      }
      <button onClick={this.deleteTask.bind(this)}>Delete</button>
    </div>
  }
}
