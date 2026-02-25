import React from 'react';
import { Waves, Thermometer, Wind, Navigation, Droplets } from 'lucide-react';
import GlassCard from '../Layout/GlassCard';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import { formatTemp, formatWind, getMarineCondition } from '../../utils/formatters';

const MarineWeather = ({ data, loading, error, onRetry, units }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (!data || !data.current) {
    return (
      <div className="glass-card p-12 text-center">
        <Waves className="w-16 h-16 text-slate-600 mx-auto mb-4" />
        <p className="text-slate-400">Search for a coastal location to view marine weather</p>
        <p className="text-sm text-slate-500 mt-2">Try: Miami, Honolulu, Sydney, or Cape Town</p>
      </div>
    );
  }

  const { location, current } = data;
  const marineCondition = getMarineCondition(current.swell_height || 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Location Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">{location.name}</h2>
          <p className="text-slate-400">{location.region}, {location.country}</p>
          <p className="text-sm text-slate-500 mt-1">
            {location.lat}°N, {location.lon}°E
          </p>
        </div>
        <div className="glass-light rounded-xl px-4 py-2">
          <p className="text-sm text-slate-400">Marine Conditions</p>
          <p className="text-lg font-semibold text-cyan-400">{marineCondition}</p>
        </div>
      </div>

      {/* Main Marine Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Water Temperature */}
        <GlassCard className="text-center">
          <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
            <Thermometer className="w-5 h-5" />
            <span className="text-sm">Water Temp</span>
          </div>
          <p className="text-3xl font-bold text-gradient">
            {current.water_temperature ? formatTemp(current.water_temperature, units) : 'N/A'}
          </p>
        </GlassCard>

        {/* Wave Height */}
        <GlassCard className="text-center">
          <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
            <Waves className="w-5 h-5" />
            <span className="text-sm">Wave Height</span>
          </div>
          <p className="text-3xl font-bold text-slate-200">
            {current.swell_height ? `${current.swell_height} ${units === 'm' ? 'm' : 'ft'}` : 'N/A'}
          </p>
        </GlassCard>

        {/* Swell Period */}
        <GlassCard className="text-center">
          <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">Swell Period</span>
          </div>
          <p className="text-3xl font-bold text-slate-200">
            {current.swell_period ? `${current.swell_period}s` : 'N/A'}
          </p>
        </GlassCard>

        {/* Swell Direction */}
        <GlassCard className="text-center">
          <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
            <Navigation className="w-5 h-5" />
            <span className="text-sm">Swell Dir</span>
          </div>
          <p className="text-3xl font-bold text-slate-200">
            {current.swell_dir || 'N/A'}
          </p>
          {current.swell_degree && (
            <Navigation 
              className="w-4 h-4 mx-auto mt-1 text-slate-500" 
              style={{ transform: `rotate(${current.swell_degree}deg)` }} 
            />
          )}
        </GlassCard>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Wind Speed */}
        <GlassCard className="text-center">
          <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
            <Wind className="w-4 h-4" />
            <span className="text-sm">Wind Speed</span>
          </div>
          <p className="text-xl font-bold text-slate-200">
            {formatWind(current.wind_speed, units)}
          </p>
        </GlassCard>

        {/* Wind Direction */}
        <GlassCard className="text-center">
          <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
            <Navigation className="w-4 h-4" />
            <span className="text-sm">Wind Dir</span>
          </div>
          <p className="text-xl font-bold text-slate-200">
            {current.wind_dir || 'N/A'}
          </p>
        </GlassCard>

        {/* Air Temperature */}
        <GlassCard className="text-center">
          <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
            <Thermometer className="w-4 h-4" />
            <span className="text-sm">Air Temp</span>
          </div>
          <p className="text-xl font-bold text-slate-200">
            {formatTemp(current.temperature, units)}
          </p>
        </GlassCard>

        {/* Humidity */}
        <GlassCard className="text-center">
          <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
            <Droplets className="w-4 h-4" />
            <span className="text-sm">Humidity</span>
          </div>
          <p className="text-xl font-bold text-slate-200">
            {current.humidity}%
          </p>
        </GlassCard>
      </div>

      {/* Marine Condition Guide */}
      <GlassCard>
        <h3 className="text-lg font-semibold text-slate-200 mb-4">Marine Condition Scale</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="glass-light rounded-lg p-3">
            <p className="text-green-400 font-medium">Calm</p>
            <p className="text-slate-500">&lt; 0.5m waves</p>
          </div>
          <div className="glass-light rounded-lg p-3">
            <p className="text-cyan-400 font-medium">Light</p>
            <p className="text-slate-500">0.5 - 1.25m</p>
          </div>
          <div className="glass-light rounded-lg p-3">
            <p className="text-blue-400 font-medium">Moderate</p>
            <p className="text-slate-500">1.25 - 2.5m</p>
          </div>
          <div className="glass-light rounded-lg p-3">
            <p className="text-yellow-400 font-medium">Rough</p>
            <p className="text-slate-500">2.5 - 4m</p>
          </div>
          <div className="glass-light rounded-lg p-3">
            <p className="text-orange-400 font-medium">Very Rough</p>
            <p className="text-slate-500">4 - 6m</p>
          </div>
          <div className="glass-light rounded-lg p-3">
            <p className="text-red-400 font-medium">High</p>
            <p className="text-slate-500">6 - 9m</p>
          </div>
          <div className="glass-light rounded-lg p-3">
            <p className="text-purple-400 font-medium">Very High</p>
            <p className="text-slate-500">9 - 14m</p>
          </div>
          <div className="glass-light rounded-lg p-3">
            <p className="text-pink-400 font-medium">Phenomenal</p>
            <p className="text-slate-500">&gt; 14m</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default MarineWeather;
