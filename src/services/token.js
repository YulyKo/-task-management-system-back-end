import { TOKEN_NAME } from '../utils/auth.consts';

export function getToken() {
  return localStorage.getItem(TOKEN_NAME);
}

export function setToken(newToken) {
  localStorage.setItem(TOKEN_NAME, newToken);
}
