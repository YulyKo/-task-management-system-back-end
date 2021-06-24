
import { TASKS } from '../utils/api_urls';
import { COMMON_HEADERS } from '../utils/common_headers';

export function createTask(task, ownerEmail) {
  fetch(TASKS, {
    method: 'POST',
    headers: COMMON_HEADERS(ownerEmail),
    body: JSON.stringify(task),
  })
    .then(res => {
      // add task to local storage(?)
      this.props.toggleHidden();
    })
    .catch(error => console.log(error));
}

export function changeoverTaskStatus(taskId, ownerEmail) {
  fetch(`${TASKS}/changeover/${taskId}`, {
    method: 'PUT',
    headers: COMMON_HEADERS(ownerEmail),
    body: JSON.stringify({ status: !task.isDone })
  })
    .then(res => {
      // add task to local storage(?)
    })
    .catch(error => console.log(error));      
}

export function updateTask(task, ownerEmail) {
  fetch(`${TASKS}/${this.state.task.id}`, {
    method: 'PUT',
    headers: COMMON_HEADERS(ownerEmail),
    body: JSON.stringify(task),
  })
    .then(res => {
      // add task to local storage(?)
      this.props.toggleHidden();
    })
    .catch(error => console.log(error));
}

export function deleteFromAPI(id, ownerEmail) {
  fetch(`${TASKS}/${id}`,
    {
      method: 'DELETE',
      headers: COMMON_HEADERS(ownerEmail),
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
