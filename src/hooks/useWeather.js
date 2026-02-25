import { useState, useEffect, useCallback } from 'react';
import { weatherApi } from '../services/weatherApi';

export const useWeather = (location, units = 'm') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async () => {
    if (!location) return;

    setLoading(true);
    setError(null);

    try {
      const response = await weatherApi.getCurrent(location, units);
      setData(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [location, units]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  const refetch = useCallback(() => {
    fetchWeather();
  }, [fetchWeather]);

  return { data, loading, error, refetch };
};

export default useWeather;
