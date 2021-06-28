import { ACCESS_TOKEN, CONFIRMED_STATUS, OWNER_KEY } from '../../utils/auth.const';

// user status
export function getConfirmedStatus() {
  return localStorage.getItem(CONFIRMED_STATUS);
}

export function setConfirmedStatus(newStatus) {
  localStorage.setItem(CONFIRMED_STATUS, newStatus);
}

// owner key = user email
export function getOwnerKey() {
  return localStorage.getItem(OWNER_KEY);
}

export function setOwnerKey(newKey) {
  localStorage.setItem(OWNER_KEY, newKey);
}

// save|remove token
export function getToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

export function setToken(newToken) {
  localStorage.setItem(ACCESS_TOKEN, newToken);
}
