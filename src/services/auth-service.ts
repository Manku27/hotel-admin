import { Auth } from '../auth/authTypes';

export const AUTH_KEY = 'auth';

function setAuth(authData) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
}

function getAuth(): Auth | null {
  const data = localStorage.getItem(AUTH_KEY);
  return data ? JSON.parse(data) : null;
}

function removeAuth() {
  localStorage.removeItem(AUTH_KEY);
}

export { setAuth, getAuth, removeAuth };
