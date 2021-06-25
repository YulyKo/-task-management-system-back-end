
import { TASKS } from '../utils/apiUrls.const';
import { TASK_HEADERS } from '../utils/commonHeaders.const';

export function createTask(task) {
  fetch(TASKS, {
    method: 'POST',
    headers: TASK_HEADERS,
    body: JSON.stringify(task),
  })
    .then(res => {
      // add task to local storage(?)
      console.log(res);
      // this.props.toggleHidden();
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
  console.log(task.id);
  fetch(`${TASKS}/${task.id}`, {
    method: 'PUT',
    headers: TASK_HEADERS,
    body: JSON.stringify(task),
  })
    .then(res => {
      // add task to local storage(?)
      console.log(res);
      // this.props.toggleHidden();
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
      console.log(res);
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
