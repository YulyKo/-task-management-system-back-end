import { Component } from "react";

export default class TaskDetails extends Component {
  render() {
    return <div>
      {this.props.task.title}
      {this.props.task.desription}
      {this.props.task.priority}
      {this.props.task.createdAt}
      {this.props.task.updatedAt}
    </div>
  }
}
