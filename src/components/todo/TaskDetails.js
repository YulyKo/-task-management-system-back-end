/* eslint-disable no-console */
import React, { Component }  from 'react';
import PropTypes from 'prop-types';

export default class TaskDetails extends Component {
  static get propTypes() {
    return { 
      task: PropTypes.any,
      childCloseModal: PropTypes.func,
    }; 
  }

  formatDate(date) {
    // generate date by seconds
    const d = new Date(date);
    // get from d month, year and day
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    // set zero to month and day
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-'); // => yyyy-mm-dd
  }


  close() {
    this.props.childCloseModal();
  }

  render() {
    const { priority, title, desription, dueDate } = this.props.task;
    const renderDate = this.formatDate(dueDate);
    return <article className={'task-component priority__' + priority}>
      <h1 className="title">
        { title }
      </h1>
      <h2 className="subtitle">
        { desription }
      </h2>
      <p className="text">Priority: { priority }</p>
      <p className="text">Due date:  { renderDate }</p>
      <button onClick={this.close.bind(this)} className="btn btn__close" type="button">Close</button>
    </article>;
  }
}
