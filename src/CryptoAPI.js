import axios from 'axios';

const baseUrl = 'https://api.coingecko.com/api/v3';

export const fetchCryptos = async () => {
  try {
    const response = await axios.get(`${baseUrl}/coins/markets`, {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching cryptocurrency data:", error);
    return [];
  }
};
