export const fetchPrice = async (crypto, fiat) => fetch(
  `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${fiat}`,
  {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    headers: {
      accept: 'application/json'
    }
  }
);
