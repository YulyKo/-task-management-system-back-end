import { AUTH, BASE_URL } from '../utils/apiUrls.const';
import { CONFIRMED_STATUS, OWNER_TOKEN_NAME as OWNER_KEY } from '../utils/auth.const';
import { COMMON_HEADERS } from '../utils/commonHeaders.const';

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
  console.log(code);
  return fetch(`${BASE_URL}auth/confirm/${code}`, {
    method: 'PUT',
  })
    .then((res) => res.json());
}

export function getConfirmedStatus() {
  return localStorage.getItem(CONFIRMED_STATUS);
}

export function setConfirmedStatus(newStatus) {
  localStorage.setItem(CONFIRMED_STATUS, newStatus);
}

export function clearConfirmedStatus() {
  localStorage.clear(CONFIRMED_STATUS);
}

export function getOwnerKey() {
  return localStorage.getItem(OWNER_KEY);
}

export function setOwnerKey(newKey) {
  localStorage.setItem(OWNER_KEY, newKey);
}

export function clearOwnerKey() {
  localStorage.clear(OWNER_KEY);
}
