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
    const task = _.find(this.rows, (task) => {
      return task.id.includes(id);
    });
    return task;
  },

  setIsAllDone: function (status) {
    this.isAllDone = status;
  },

  changeMarkAllTask: function (status) {
    this.rows.forEach((task) => {
      task.isDone = status;
    });
  },

  markTask: function(id, status) {
    const task = _.find(this.rows, (task) => {
      return task.id.includes(id);
    });
    task.isDone = status;
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
