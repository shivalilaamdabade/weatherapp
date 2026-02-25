import React from 'react';
import ForecastCard from '../components/Weather/ForecastCard';
import { useForecast } from '../hooks/useForecast';

const Forecast = ({ location, units, days = 7 }) => {
  const { data, loading, error, refetch } = useForecast(location, days, units);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Weather Forecast</h1>
        <p className="text-slate-400">Extended weather outlook for the coming days</p>
      </div>
      <ForecastCard 
        data={data} 
        loading={loading} 
        error={error} 
        onRetry={refetch}
        units={units}
      />
    </div>
  );
};

export default Forecast;
