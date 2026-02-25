import { useState, useCallback } from 'react';
import { weatherApi } from '../services/weatherApi';
import { format } from 'date-fns';

export const useHistorical = (units = 'm') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistorical = useCallback(async (location, date) => {
    if (!location || !date) return;

    setLoading(true);
    setError(null);

    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const response = await weatherApi.getHistorical(location, formattedDate, units);
      setData(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [units]);

  const clearData = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return { data, loading, error, fetchHistorical, clearData };
};

export default useHistorical;
