import { getAuth } from './auth-service';

const authData = getAuth();
const token = authData ? authData.accessToken : null;

export const getFetcher = async (url) => {
  const res = await fetch(url, {
    method: 'GET',
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      : {
          'Content-Type': 'application/json',
        },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
