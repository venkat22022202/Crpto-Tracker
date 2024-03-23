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

export const fetchCryptoHistory = async (id, days = 1, interval = 'hourly') => {
  try {
    const response = await axios.get(`${baseUrl}/coins/${id}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: days,
        interval: interval, // 'hourly' will give you data at least hourly, finer control may require additional logic
      },
    });
    // Parse the response to extract the prices at required intervals here
    return response.data.prices; // This returns a full array of price points, you'll need to process it
  } catch (error) {
    console.error(`Error fetching historical data for ${id}:`, error);
    return [];
  }
};
