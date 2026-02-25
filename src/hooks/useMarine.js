import { useState, useEffect, useCallback } from 'react';
import { weatherApi } from '../services/weatherApi';

export const useMarine = (location, units = 'm') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMarine = useCallback(async () => {
    if (!location) return;

    setLoading(true);
    setError(null);

    try {
      const response = await weatherApi.getMarine(location, units);
      setData(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [location, units]);

  useEffect(() => {
    fetchMarine();
  }, [fetchMarine]);

  const refetch = useCallback(() => {
    fetchMarine();
  }, [fetchMarine]);

  return { data, loading, error, refetch };
};

export default useMarine;
