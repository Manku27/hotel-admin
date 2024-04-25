import { toast } from 'react-toastify';
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

export async function sendRequest(url, arg, successCallback) {
  const id = toast.loading('Please wait...');
  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(arg),
    });
    toast.update(id, {
      render: 'Successful!',
      type: 'success',
      isLoading: false,
      autoClose: 800,
    });
    if (successCallback) {
      successCallback();
    }
  } catch (error) {
    toast.update(id, {
      render: `Failed.`,
      type: 'error',
      isLoading: false,
      autoClose: 800,
    });
  }
}
