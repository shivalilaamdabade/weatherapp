import React from 'react';
import { 
  Droplets, 
  Wind, 
  Eye, 
  Gauge, 
  Sun,
  Navigation,
  Thermometer
} from 'lucide-react';
import GlassCard from '../Layout/GlassCard';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import { formatTemp, formatWind, formatPressure, formatVisibility, getWindDirection, getUVDescription, getHumidityDescription } from '../../utils/formatters';

const CurrentWeather = ({ data, loading, error, onRetry, units }) => {
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
        <p className="text-slate-400">Search for a location to view weather data</p>
      </div>
    );
  }

  const { location, current } = data;
  const uvInfo = getUVDescription(current.uv_index);
  const humidityInfo = getHumidityDescription(current.humidity);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Main Weather Card */}
      <GlassCard className="relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="relative">
          {/* Location Info */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-slate-100">{location.name}</h2>
            <p className="text-slate-400">{location.region}, {location.country}</p>
            <p className="text-sm text-slate-500 mt-1">{location.localtime}</p>
          </div>

          {/* Main Weather Display */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex items-center gap-4">
              {current.weather_icons?.[0] && (
                <img 
                  src={current.weather_icons[0]} 
                  alt={current.weather_descriptions?.[0]}
                  className="w-24 h-24 object-contain"
                />
              )}
              <div>
                <div className="text-6xl font-bold text-gradient">
                  {formatTemp(current.temperature, units)}
                </div>
                <p className="text-lg text-slate-300 capitalize">
                  {current.weather_descriptions?.[0]}
                </p>
              </div>
            </div>

            {/* Feels Like */}
            <div className="flex-1 w-full md:w-auto">
              <div className="glass-light rounded-xl p-4">
                <div className="flex items-center gap-2 text-slate-400 mb-2">
                  <Thermometer className="w-4 h-4" />
                  <span className="text-sm">Feels Like</span>
                </div>
                <p className="text-2xl font-semibold text-slate-200">
                  {formatTemp(current.feelslike, units)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Humidity */}
        <GlassCard className="text-center">
          <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
            <Droplets className="w-5 h-5" />
            <span className="text-sm">Humidity</span>
          </div>
          <p className="text-2xl font-bold text-slate-200">{current.humidity}%</p>
          <p className={`text-xs mt-1 ${humidityInfo.color}`}>{humidityInfo.label}</p>
        </GlassCard>

        {/* Wind */}
        <GlassCard className="text-center">
          <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
            <Wind className="w-5 h-5" />
            <span className="text-sm">Wind</span>
          </div>
          <p className="text-2xl font-bold text-slate-200">{formatWind(current.wind_speed, units)}</p>
          <div className="flex items-center justify-center gap-1 mt-1">
            <Navigation className="w-3 h-3 text-slate-500" style={{ transform: `rotate(${current.wind_degree}deg)` }} />
            <span className="text-xs text-slate-500">{getWindDirection(current.wind_degree)}</span>
          </div>
        </GlassCard>

        {/* Pressure */}
        <GlassCard className="text-center">
          <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
            <Gauge className="w-5 h-5" />
            <span className="text-sm">Pressure</span>
          </div>
          <p className="text-2xl font-bold text-slate-200">{formatPressure(current.pressure, units)}</p>
        </GlassCard>

        {/* Visibility */}
        <GlassCard className="text-center">
          <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
            <Eye className="w-5 h-5" />
            <span className="text-sm">Visibility</span>
          </div>
          <p className="text-2xl font-bold text-slate-200">{formatVisibility(current.visibility, units)}</p>
        </GlassCard>

        {/* UV Index */}
        <GlassCard className="text-center">
          <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
            <Sun className="w-5 h-5" />
            <span className="text-sm">UV Index</span>
          </div>
          <p className="text-2xl font-bold text-slate-200">{current.uv_index}</p>
          <p className={`text-xs mt-1 ${uvInfo.color}`}>{uvInfo.label}</p>
        </GlassCard>

        {/* Cloud Cover */}
        <GlassCard className="text-center">
          <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
            </svg>
            <span className="text-sm">Cloud Cover</span>
          </div>
          <p className="text-2xl font-bold text-slate-200">{current.cloudcover}%</p>
        </GlassCard>

        {/* Precipitation */}
        <GlassCard className="text-center">
          <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span className="text-sm">Precipitation</span>
          </div>
          <p className="text-2xl font-bold text-slate-200">{current.precip} {units === 'm' ? 'mm' : 'in'}</p>
        </GlassCard>

        {/* Observation Time */}
        <GlassCard className="text-center">
          <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">Observed</span>
          </div>
          <p className="text-lg font-bold text-slate-200">{current.observation_time}</p>
        </GlassCard>
      </div>
    </div>
  );
};

export default CurrentWeather;
