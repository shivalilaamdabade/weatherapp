import axios from 'axios';

const API_KEY = '0d25d0de684ab863a6af8384440aa2fb';
const BASE_URL = 'https://api.weatherstack.com';

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
  // Mock data for demo when API is unavailable
  getMockCurrentData: (query) => ({
    location: {
      name: query,
      region: 'Karnataka',
      country: 'India',
      lat: 12.97,
      lon: 77.59,
      timezone_id: 'Asia/Kolkata',
      localtime: new Date().toISOString(),
    },
    current: {
      temperature: 28,
      feelslike: 30,
      humidity: 65,
      pressure: 1012,
      visibility: 10,
      wind_speed: 12,
      wind_degree: 180,
      wind_dir: 'S',
      cloudcover: 40,
      uv_index: 6,
      precip: 0,
      observation_time: new Date().toLocaleTimeString(),
      weather_descriptions: ['Partly cloudy'],
      weather_icons: ['https://cdn.weatherstack.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png'],
    }
  }),

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
      // Return mock data if API fails (for demo purposes)
      console.warn('API failed, using mock data:', error.message);
      const mockData = weatherApi.getMockCurrentData(query);
      setCached(cacheKey, mockData);
      return mockData;
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
