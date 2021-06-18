import { Component } from "react";
import tasks from "../../utils/tasks";
import ModalWindowShell from './ModalWindowShell';
import TaskListItem from './TaskListItem';
import TaskForm from './TaskForm';

export class TasksListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: tasks,
      isHidden: true,
    };
  }

  toggleHidden() {
    this.setState({
      isHidden: !this.state.isHidden
    });
  }

  render() {
    let btn_class = this.state.isHidden ? "blackButton" : "whiteButton";
    return <div>
      <button className={btn_class} onClick={this.toggleHidden.bind(this)} >
        Click to show modal
      </button>
      {
        !this.state.isHidden && 
        <ModalWindowShell>
          <TaskForm onSubmit={this.toggleHidden.bind(this)}/>
        </ModalWindowShell>
      }
      {tasks.map((task, index) => (
        <TaskListItem key={index} id={task.id} title={task.title} />
      ))}
    </div>
  }
}
