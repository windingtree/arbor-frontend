import {
    api
} from '../../redux/api';

// estimate gas for transaction by server side
export const estimateGas = async (recipient, method, args) => api(
    'stripe/estimation',
    'POST',
    {
      body: JSON.stringify({
        method,
        args,
        recipient
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
);

export const createPaymentIntent = async estimationId => api(
    `stripe/intent/${estimationId}`,
    'POST'
);

export const getPaymentIntentStatus = async paymentIntentId => api(
  `stripe/status/${paymentIntentId}`,
  'GET'
);
