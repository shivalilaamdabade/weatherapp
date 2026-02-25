import React from 'react';
import MarineWeather from '../components/Weather/MarineWeather';
import { useMarine } from '../hooks/useMarine';

const Marine = ({ location, units }) => {
  const { data, loading, error, refetch } = useMarine(location, units);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Marine Weather</h1>
        <p className="text-slate-400">Ocean conditions, wave heights, and water temperatures</p>
      </div>
      <MarineWeather 
        data={data} 
        loading={loading} 
        error={error} 
        onRetry={refetch}
        units={units}
      />
    </div>
  );
};

export default Marine;
