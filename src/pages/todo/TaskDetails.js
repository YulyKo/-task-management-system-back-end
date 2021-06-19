import React, { Component }  from 'react';
import PropTypes from 'prop-types';

export default class TaskDetails extends Component {
  propTypes = {
    task: PropTypes.object,
  }

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
