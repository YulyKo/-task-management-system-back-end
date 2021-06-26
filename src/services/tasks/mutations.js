// for manipulation with tasks
// data: delete, sot, upate, add

// TODO refactor it ---
export let storage = {
  listener: null,
  tasks: [],
};
// ---

export function addTask(newTask) {
  console.log(newTask);
  storage.tasks[storage.tasks.length] = newTask;
}

export function setTasks(tasks) {
  storage.tasks = tasks;
}

export function removeTask(id) {
  let deletedTask;
  storage.tasks.forEach((task) => {
    // find deleted task by id
    if (task.id === id) {
      deletedTask = task;
    }
  });

  // get index by found task
  const index = storage.tasks.indexOf(deletedTask);

  // cut out task from list
  storage.tasks.splice(index, 1);
}

export function updateTask(oldTask, newTask) {
  const index = storage.tasks.indexOf(oldTask);
  storage.tasks[index] = newTask;
}

export function markAllLocal(status) {
  // update idDone in storage
  storage.tasks.forEach((task) => {
    task.isDone = status;
    console.log(task);
  });
  // update changed it input:checkbox
}
