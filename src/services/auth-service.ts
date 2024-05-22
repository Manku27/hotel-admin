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

async function logout() {
  const url = `${import.meta.env.VITE_API}/auth/logout`;
  const authData = getAuth();
  const token = authData ? authData.accessToken : null;
  try {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } finally {
    removeAuth();
    window.location.reload();
  }
}

export { setAuth, getAuth, removeAuth, logout };
