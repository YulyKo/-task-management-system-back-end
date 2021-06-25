import { OWNER_TOKEN_NAME as OWNER_EMAIL, TOKEN_NAME } from './auth.consts';

export const COMMON_HEADERS = {'Content-Type': 'application/json'};
export const TASK_HEADERS = {
  'Content-Type': 'application/json',
  'owner': localStorage.getItem(OWNER_EMAIL),
  'Authorization': `Bearer ${localStorage.getItem(TOKEN_NAME)}`
};
