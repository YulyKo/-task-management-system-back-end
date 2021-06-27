import _ from 'lodash';

let app = {
  listener: null,
  rows: [],

  isAllDone: null,

  setDefaultRows: function(tasks) {
    this.rows = tasks;
  },

  addRow: function(newTask) {
    this.rows.push(newTask);
  },

  getRow: function(id) {
    return _.find(this.rows, (task) => {
      if ( task.id === id )
        return task;
    });
  },

  getIsAllDone: function () {
    return this.isAllDone;
  },

  setIsAllDone: function (status) {
    this.isAllDone = status;
  },

  changeMarkAllTask: function (status) {
    this.rows.forEach((task) => {
      task.isDone = status;
    });
    this.isAllDone = status;
  },

  markTask: function(task, status) {
    const index = _.indexOf(this.rows, task);
    this.rows[index].isDone = status;
  },

  updateRow: function(oldTask, newTask) {
    const index = _.indexOf(this.rows, oldTask);
    this.rows[index] = newTask;
  },

  removeTask: function(task) {
    _.remove(this.rows, function(n) {
      return n.id === task.id;
    });
  },
};

export default app;
