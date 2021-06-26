
import { addTask, markAllLocal, removeTask, storage } from './mutations';
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
      // add task to local storage
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
      // update task in local storage
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
      // remove task from local storage
      console.log(res);
      removeTask(id);
    })
    .catch(error => console.log(error));
}

export function markAll(status) {
  console.log('action');
  storage.tasks.forEach((task) => {
    changeoverTaskStatus(task.id, status);
    task.isDone = status;
  });
  console.log(storage.tasks);
  let checkBoxesArray = document.querySelectorAll('input[type="checkbox"]');
  // checkBoxesArray = status;
  checkBoxesArray.forEach((input) => {
    console.log(input.value);
  });
  console.log('-- end --');
  // doesn't work
  // fetch(`${TASKS}/changeover-all`, 
  //   {
  //     method: 'PUT',
  //     headers: TASK_HEADERS,
  //     body: {
  //       status: status,
  //     }
  //   })
  //   .then(res => {
  //     // change status 'isDone' at local storage tasks
  //     console.log(res);
  //   })
  //   .catch(error => console.log(error));
}
