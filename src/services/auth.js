import { AUTH } from '../utils/api_urls';
import { COMMON_HEADERS } from '../utils/common_headers';

export function registration(user) {
  return fetch(`${AUTH}/registration`, {
    method: 'POST',
    headers: COMMON_HEADERS,
    body: JSON.stringify(user),
  })
    .then((res) => res.json());
}

export function login(user) {
  console.log('sdfg');
  return fetch(`${AUTH}/login`, {
    method: 'POST',
    headers: COMMON_HEADERS,
    body: JSON.stringify(user),
  })
    .then((res) => res.json());
}
