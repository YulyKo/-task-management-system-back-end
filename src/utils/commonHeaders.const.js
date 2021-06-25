import { OWNER_KEY as OWNER_EMAIL, ACCESS_TOKEN } from './auth.const';

export const COMMON_HEADERS = {'Content-Type': 'application/json'};
export const TASK_HEADERS = {
  'Content-Type': 'application/json',
  'owner': localStorage.getItem(OWNER_EMAIL),
  'Authorization': `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
};
