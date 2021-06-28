import { getOwnerKey, setToken } from './storage';
import { AUTH, BASE_URL, TASKS } from '../../utils/apiUrls.const';
import { COMMON_HEADERS, TASK_HEADERS } from '../../utils/commonHeaders.const';
import app from '../tasks/store';

export function registration(user) {
  return fetch(`${AUTH}/registration`, {
    method: 'POST',
    headers: COMMON_HEADERS,
    body: JSON.stringify(user),
  })
    .then((res) => res.json());
}

export function login(user) {
  return fetch(`${AUTH}/login`, {
    method: 'POST',
    headers: COMMON_HEADERS,
    body: JSON.stringify(user),
  })
    .then((res) => res.json());
}

export function confirmUser(code) {
  return fetch(`${BASE_URL}auth/confirm/${code}`, {
    method: 'PUT',
  })
    .then((res) => res.json());
}

// not work
export function refreshToken() {
  const email = getOwnerKey();
  fetch(`${AUTH}/token/${email}`, {
    method: 'GET',
    headers: COMMON_HEADERS,
  })
    .then(res => res.json())
    .then((result) => {
      setToken(result.accessToken);
      return getAllTasksAfterRefreshToken();
    });
  // .then((res) => setToken(res));
}

function getAllTasksAfterRefreshToken() {
  fetch(TASKS, {
    method: 'GET',
    headers: TASK_HEADERS,
  })
    .then(res => {
      res.json();
      if (res.staus === 401) {
        // window.location.pathname = '/login';
      }
    })
    .then(
      (result) => {
        app.setDefaultRows(result);
        return {
          isLoaded: true,
        };
        // sort by done here
      },
    );
}
