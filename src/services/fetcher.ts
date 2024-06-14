import { toast } from 'react-toastify';
import { getAuth, logout } from './auth-service';

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
    toast('Oops! Contact us about this', {
      type: 'error',
      isLoading: false,
      autoClose: 800,
    });

    if (res.status === 401) {
      // Perform refetch token operation
      logout();
    }
    throw new Error('Oops! Contact us about this.');
  }

  return res.json();
};

export async function sendRequest(url, arg, successCallback, verb?: string) {
  const apiVerb = verb ?? 'POST';
  const id = toast.loading('Please wait...');
  try {
    await fetch(url, {
      method: apiVerb,
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
    console.error(error);
    toast.update(id, {
      render: `Failed.`,
      type: 'error',
      isLoading: false,
      autoClose: 800,
    });
  }
}

export async function sendBookingRequest(url, arg, successCallback) {
  const id = toast.loading('Please wait...');
  try {
    await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: arg,
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

export const getAndDisplayFiles = async (url) => {
  try {
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
      throw new Error();
    }

    const data = await res.blob();
    const file = window.URL.createObjectURL(data);
    window.open(file, '_blank');
  } catch {
    toast('Oops! Contact us about this', {
      type: 'error',
      isLoading: false,
      autoClose: 800,
    });
  }
};
