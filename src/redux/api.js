import { API_URI } from '../utils/constants';

export function* callApi(directory, method = 'GET', options) {
  try {
    let responsePromise = yield fetch(`${API_URI}/${directory}`, {
      method,
      ...options
    });

    responsePromise = yield responsePromise.json();

    if (responsePromise.errors) {
      throw responsePromise.errors[0];
    }
    return responsePromise;
  } catch (error) {
    if (!!error && error.message) {
      throw error;
    } else if (!!error) {
      throw new Error('Backend error');
    }
  }
}

export const api = async (path, method = 'GET', options) => {
  try {
    let responsePromise = await fetch(
      `${API_URI}/${path}`,
      {
        method,
        ...options
      }
    );

    responsePromise = await responsePromise.json();

    if (responsePromise.errors) {
      throw responsePromise.errors[0];
    }

    return responsePromise;
  } catch (error) {
    if (!!error && error.message) {
      throw error;
    } else if (!!error) {
      throw new Error('Backend error');
    }
  }
}
