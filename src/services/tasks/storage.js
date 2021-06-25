export function setTasks(tasks) {
  sessionStorage.setItem(tasks);
} 

export function getTasks(tasks) {
  sessionStorage.setItem(tasks);
}

// save|remove token
export function getToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

export function setToken(newToken) {
  localStorage.setItem(ACCESS_TOKEN, newToken);
}
