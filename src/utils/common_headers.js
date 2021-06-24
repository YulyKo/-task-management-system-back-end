export const COMMON_HEADERS = {'Content-Type': 'application/json'};
export const TASK_HEADERS = (ownerEmail) => {
  return {
    'Content-Type': 'application/json',
    'owner': ownerEmail
  };
};
