import React, { Component }  from 'react';
import PropTypes from 'prop-types';

export default class TaskDetails extends Component {
  static get propTypes() { 
    return { 
      task: PropTypes.any,
    }; 
  }

  render() {
    return <div>
      {this.props.task.title}
      {this.props.task.desription}
      {this.props.task.priority}
      {this.props.task.dueDate}
      {this.props.task.createdAt}
      {this.props.task.updatedAt}
    </div>;
  }
}
