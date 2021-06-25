import { ACCESS_TOKEN } from '../utils/auth.const';

export function getToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

export function setToken(newToken) {
  localStorage.setItem(ACCESS_TOKEN, newToken);
}

export function cleanToken() {
  localStorage.clear(ACCESS_TOKEN);
}
