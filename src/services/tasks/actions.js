
import { addTask, removeTask } from './mutations';
import { TASKS } from '../../utils/apiUrls.const';
import { TASK_HEADERS } from '../../utils/commonHeaders.const';

export function createTask(task) {
  fetch(TASKS, {
    method: 'POST',
    headers: TASK_HEADERS,
    body: JSON.stringify(task),
  })
    .then(res => res.json())
    .then(res => {
      // add task to local storage(?)
      console.log(res);
      addTask(res);
      // this.props.toggleHidden();
    })
    .catch(error => console.log(error));
}

export function changeoverTaskStatus(taskId, isDone) {
  fetch(`${TASKS}/changeover/${taskId}`, {
    method: 'PUT',
    headers: TASK_HEADERS,
    body: JSON.stringify({ status: !isDone })
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
    .then(res => res.json())
    .then(res => {
      // add task to local storage
      updateTask(task, res);
      // this.props.toggleHidden(); // TODO use it
    })
    .catch(error => console.log(error));
}

export function deleteFromAPI(id) {
  fetch(`${TASKS}/${id}`,
    {
      method: 'DELETE',
      headers: TASK_HEADERS,
    })
    // .then(res => res.json())
    .then(res => {
      // add task to local storage
      console.log(res);
      removeTask(id);
    })
    .catch(error => console.log(error));
}
