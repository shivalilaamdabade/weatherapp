import { useState, useEffect, useCallback } from 'react';
import { weatherApi } from '../services/weatherApi';

export const useForecast = (location, days = 7, units = 'm') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchForecast = useCallback(async () => {
    if (!location) return;

    setLoading(true);
    setError(null);

    try {
      const response = await weatherApi.getForecast(location, days, units);
      setData(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [location, days, units]);

  useEffect(() => {
    fetchForecast();
  }, [fetchForecast]);

  const refetch = useCallback(() => {
    fetchForecast();
  }, [fetchForecast]);

  return { data, loading, error, refetch };
};

export default useForecast;
