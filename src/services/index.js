const taskService = require('./task');
const auth = require('./auth');
const token = require('./token');

module.exports = {
  taskService: taskService,
  authService: auth,
  tokenService: token,
};
