const taskService = require('./tasks/index');
const user = require('./user/index');
const storage = require('./storage');

module.exports = {
  taskService: taskService,
  userService: user,
  storage: storage,
};
