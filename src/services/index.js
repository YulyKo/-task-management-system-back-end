const taskService = require('./task');
const auth = require('./auth');

module.exports = {
  taskService: taskService,
  authService: auth,
};
