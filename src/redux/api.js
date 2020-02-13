import { API_URI } from '../utils/constants';

export function* callApi(directory, method = 'GET', options) {
  try {
    let responsePromise = yield fetch(`${API_URI}/${directory}`, {
      ...options
      // body: JSON.stringify({
      //   data
      // }),
      // headers: { 'Content-Type': 'application/json', ...headers },
      // method: `${method}`,
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