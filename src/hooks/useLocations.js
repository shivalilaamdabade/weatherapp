import { useState, useEffect, useCallback } from 'react';
import { weatherApi } from '../services/weatherApi';

export const useLocations = (query, debounceMs = 300) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchLocations = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.length < 2) {
      setData([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await weatherApi.getLocations(searchQuery);
      setData(response || []);
    } catch (err) {
      setError(err.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      searchLocations(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs, searchLocations]);

  return { data, loading, error };
};

export default useLocations;
