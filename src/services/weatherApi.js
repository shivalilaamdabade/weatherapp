import axios from 'axios';

const API_KEY = '0d25d0de684ab863a6af8384440aa2fb';
const BASE_URL = 'http://api.weatherstack.com';

// Create axios instance
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Cache mechanism
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const getCached = (key) => {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  cache.delete(key);
  return null;
};

const setCached = (key, data) => {
  cache.set(key, { data, timestamp: Date.now() });
};

// API Methods
export const weatherApi = {
  // Get current weather
  getCurrent: async (query, units = 'm') => {
    const cacheKey = `current_${query}_${units}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    try {
      const response = await apiClient.get('/current', {
        params: {
          access_key: API_KEY,
          query,
          units,
        },
      });
      
      if (response.data.error) {
        throw new Error(response.data.error.info);
      }
      
      setCached(cacheKey, response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch current weather');
    }
  },

  // Get forecast
  getForecast: async (query, days = 7, units = 'm') => {
    const cacheKey = `forecast_${query}_${days}_${units}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    try {
      const response = await apiClient.get('/forecast', {
        params: {
          access_key: API_KEY,
          query,
          forecast_days: days,
          units,
        },
      });
      
      if (response.data.error) {
        throw new Error(response.data.error.info);
      }
      
      setCached(cacheKey, response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch forecast');
    }
  },

  // Get historical weather
  getHistorical: async (query, date, units = 'm') => {
    const cacheKey = `historical_${query}_${date}_${units}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    try {
      const response = await apiClient.get('/historical', {
        params: {
          access_key: API_KEY,
          query,
          historical_date: date,
          units,
        },
      });
      
      if (response.data.error) {
        throw new Error(response.data.error.info);
      }
      
      setCached(cacheKey, response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch historical weather');
    }
  },

  // Get marine weather
  getMarine: async (query, units = 'm') => {
    const cacheKey = `marine_${query}_${units}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    try {
      const response = await apiClient.get('/marine', {
        params: {
          access_key: API_KEY,
          query,
          units,
        },
      });
      
      if (response.data.error) {
        throw new Error(response.data.error.info);
      }
      
      setCached(cacheKey, response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch marine weather');
    }
  },

  // Location autocomplete
  getLocations: async (query) => {
    if (!query || query.length < 2) return [];

    const cacheKey = `locations_${query}`;
    const cached = getCached(cacheKey);
    if (cached) return cached;

    try {
      const response = await apiClient.get('/autocomplete', {
        params: {
          access_key: API_KEY,
          query,
        },
      });
      
      if (response.data.error) {
        throw new Error(response.data.error.info);
      }
      
      setCached(cacheKey, response.data);
      return response.data;
    } catch (error) {
      // Return empty array on error for autocomplete
      return [];
    }
  },
};

export default weatherApi;
