
import { TASKS } from '../../utils/apiUrls.const';
import { TASK_HEADERS } from '../../utils/commonHeaders.const';
import app from './store';
import userService from '../user/index';

export function checkErrorStatus(errorStatus) {
  if(errorStatus === 401) {
    userService.actions.refreshToken();
  }
}

export function createTask(task) {
  fetch(TASKS, {
    method: 'POST',
    headers: TASK_HEADERS,
    body: JSON.stringify(task),
  })
    .then(res => res.json())
    .then(res => {
      // add task to local storage
      app.addRow(res);
    })
    .catch(error => {
      checkErrorStatus(error.status);
    });
}

export function changeoverTaskStatus(taskId, isDone) {
  fetch(`${TASKS}/changeover/${taskId}`, {
    method: 'PUT',
    headers: TASK_HEADERS,
    body: JSON.stringify({ status: isDone })
  })
    .then(res => res.json())
    .catch(error => {
      checkErrorStatus(error.status);
      changeoverTaskStatus(taskId, isDone);
    });
}

export function updateTask(task) {
  fetch(`${TASKS}/${task.id}`, {
    method: 'PUT',
    headers: TASK_HEADERS,
    body: JSON.stringify(task),
  })
    .then(res => res.json())
    .then(res => {
      // update task in local storage
      app.updateRow(res);
    })
    .catch(error => {
      checkErrorStatus(error.status);
      updateTask(task);
    });
}

export function deleteFromAPI(id) {
  fetch(`${TASKS}/${id}`,
    {
      method: 'DELETE',
      headers: TASK_HEADERS,
    })
    .catch(error => {
      checkErrorStatus(error.status);
      deleteFromAPI(id);
    });
}

export function markAll(status) {
  app.rows.forEach((task) => {
    changeoverTaskStatus(task.id, status);
  });
  // let checkBoxesArray = document.querySelectorAll('input[type="checkbox"]');
  // checkBoxesArray.forEach((input) => {
  //   input.checked = status;
  // });
  // const checkAllInput = document.getElementById('checkAllInput');
  // checkAllInput.checked = status;
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
  //   })
}
