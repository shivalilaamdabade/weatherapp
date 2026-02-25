import React from 'react';
import HistoricalChart from '../components/Weather/HistoricalChart';
import { useHistorical } from '../hooks/useHistorical';

const Historical = ({ location, units }) => {
  const { data, loading, error, fetchHistorical, clearData } = useHistorical(units);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100">Historical Weather</h1>
        <p className="text-slate-400">Access past weather data from 2008 to present</p>
      </div>
      <HistoricalChart 
        data={data}
        loading={loading}
        error={error}
        onSearch={fetchHistorical}
        location={location}
        units={units}
      />
    </div>
  );
};

export default Historical;
