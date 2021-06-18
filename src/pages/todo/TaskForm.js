import { Component } from "react";
import { Task } from "../../models/task.class";
import { PRIORITIES } from "../../utils/priorities";
import tasks from "../../utils/tasks";

export default class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultTask: new Task(),
      priority: 1,
      title: '',
      description: '',
      errors: [],
    };
    this.handleChangePriority = this.handleChangePriority.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    this.setState({ defaultTask: this.props.task ? this.props.task : new Task() });
  }

  handleChangeTitle(event) {
    this.setState({ title: event.target.value });
  }

  handleChangeDescription(event) {
    this.setState({ description: event.target.value });
  }

  handleChangePriority(event) {
    this.setState({ priority: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.addTask();
    console.log('submited', tasks);
  }

  addTask = () => {
    const newTask = new Task();
    newTask.title = this.state.title;
    newTask.description = this.state.description;
    newTask.priority = this.state.priority;
    tasks.push(newTask);
  }

  render() {
    return <form onSubmit={this.handleSubmit}>
      <input
        type="text"
        defaultValue={this.state.defaultTask.title}
        onChange={this.handleChangeTitle} />

      <textarea
        defaultValue={this.state.defaultTask.description}
        onChange={this.handleChangeDescription}>
      </textarea>

      <div onChange={this.handleChangePriority}>
        {PRIORITIES.map((data, index) =>
            <input key={index} type="radio" value={data} name="priority"/>
          )
        }
      </div>
      <button type="submit">Add</button>
    </form>
  }
}
