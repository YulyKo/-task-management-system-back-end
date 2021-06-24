
import { TASKS } from '../utils/api_urls';
import { TASK_HEADERS } from '../utils/common_headers';

export function createTask(task) {
  fetch(TASKS, {
    method: 'POST',
    headers: TASK_HEADERS,
    body: JSON.stringify(task),
  })
    .then(res => {
      // add task to local storage(?)
      this.props.toggleHidden();
    })
    .catch(error => console.log(error));
}

export function changeoverTaskStatus(taskId) {
  fetch(`${TASKS}/changeover/${taskId}`, {
    method: 'PUT',
    headers: TASK_HEADERS,
    body: JSON.stringify({ status: !task.isDone })
  })
    .then(res => {
      // add task to local storage(?)
    })
    .catch(error => console.log(error));      
}

export function updateTask(task) {
  fetch(`${TASKS}/${this.state.task.id}`, {
    method: 'PUT',
    headers: TASK_HEADERS,
    body: JSON.stringify(task),
  })
    .then(res => {
      // add task to local storage(?)
      this.props.toggleHidden();
    })
    .catch(error => console.log(error));
}

export function deleteFromAPI(id) {
  fetch(`${TASKS}/${id}`,
    {
      method: 'DELETE',
      headers: TASK_HEADERS,
    })
    .then(res => {
      // add task to local storage(?)
    })
    .catch(error => console.log(error));
    
  // remove from local
  // for (let index = 0; index < tasks.length; index++) {
  //   const task = tasks[index];
  //   if (task.id === id) {
  //     tasks.splice(index, 1);
  //   }
  // }
}
