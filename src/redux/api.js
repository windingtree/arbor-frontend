import { API_URI } from '../utils/constants';

export function* callApi(directory, method = 'GET', options) {
  try {
    let response = yield fetch(`${API_URI}/${directory}`, {
      method,
      ...options
    });

    response = yield response.json();

    if (response.errors) {
      throw response.errors[0];
    }
    return response;
  } catch (error) {
    if (!!error && error.message) {
      throw error;
    } else if (!!error) {
      throw new Error('Backend error');
    }
  }
}

export const createUniqueFileName = name => `${Math.random().toString(36).substr(2, 9)}${name.match(/\.[a-zA-Z0-9]+$/i)[0] || ''}`;

export const fetchJson = async path => {
  try {
    let response = await fetch(
      path,
      {
        method: 'GET'
      }
    );

    response = await response.json();

    if (response.errors) {
      throw response.errors[0];
    }

    return response;
  } catch (error) {
    if (!!error && error.message) {
      throw error;
    } else if (!!error) {
      throw new Error('Backend error');
    }
  }
};

export const api = async (path, method = 'GET', options) => {
  try {
    let response = await fetch(
      `${API_URI}/${path}`,
      {
        method,
        ...options
      }
    );

    if (response.errors) {
      throw response.errors[0];
    }

    const contentType = response.headers.get('content-type');
    let responseData;

    if (contentType.includes('json')) {
      try {
        responseData = await response.json();
      } catch (error) {
        if (response.ok) {
          responseData = 'OK';
        } else {
          throw error;
        }
      }
    } else {
      responseData = await response.text();
    }

    return responseData;
  } catch (error) {
    console.log('API call error:', error);
    if (!!error && error.message) {
      throw error;
    } else if (!!error) {
      throw new Error('Backend error');
    }
  }
}
