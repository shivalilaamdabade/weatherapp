import React from 'react';
import CurrentWeather from '../components/Weather/CurrentWeather';
import { useWeather } from '../hooks/useWeather';

const Dashboard = ({ location, units }) => {
  const { data, loading, error, refetch } = useWeather(location, units);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Current Weather</h1>
        <p className="text-slate-400">Real-time weather conditions and metrics</p>
      </div>
      <CurrentWeather 
        data={data} 
        loading={loading} 
        error={error} 
        onRetry={refetch}
        units={units}
      />
    </div>
  );
};

export default Dashboard;
