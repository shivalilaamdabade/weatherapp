import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import GlassCard from '../Layout/GlassCard';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import { formatTemp, formatShortDay } from '../../utils/formatters';

const ForecastCard = ({ data, loading, error, onRetry, units }) => {
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

  if (!data || !data.forecast) {
    return (
      <div className="glass-card p-12 text-center">
        <p className="text-slate-400">Search for a location to view forecast</p>
      </div>
    );
  }

  const forecastDays = Object.values(data.forecast);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Location Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-100">{data.location.name}</h2>
          <p className="text-slate-400">{data.location.region}, {data.location.country}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500">{forecastDays.length}-Day Forecast</p>
        </div>
      </div>

      {/* Forecast Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {forecastDays.map((day, index) => (
          <GlassCard key={day.date} className="hover:scale-[1.02] transition-transform">
            <div className="text-center">
              {/* Day */}
              <p className="text-lg font-semibold text-cyan-400 mb-2">
                {index === 0 ? 'Today' : formatShortDay(day.date)}
              </p>
              <p className="text-xs text-slate-500 mb-4">{day.date}</p>

              {/* Weather Icon */}
              {day.weather_icons?.[0] && (
                <img 
                  src={day.weather_icons[0]} 
                  alt={day.weather_descriptions?.[0]}
                  className="w-16 h-16 mx-auto mb-3 object-contain"
                />
              )}

              {/* Description */}
              <p className="text-sm text-slate-300 capitalize mb-4">
                {day.weather_descriptions?.[0]}
              </p>

              {/* Temperature Range */}
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <p className="text-xs text-slate-500">High</p>
                  <p className="text-xl font-bold text-slate-200">
                    {formatTemp(day.maxtemp, units)}
                  </p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                  <p className="text-xs text-slate-500">Low</p>
                  <p className="text-xl font-bold text-slate-400">
                    {formatTemp(day.mintemp, units)}
                  </p>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-slate-500">Avg Humidity</p>
                  <p className="text-slate-300">{day.avghumidity}%</p>
                </div>
                <div>
                  <p className="text-slate-500">UV Index</p>
                  <p className="text-slate-300">{day.uv_index}</p>
                </div>
                <div>
                  <p className="text-slate-500">Sunrise</p>
                  <p className="text-slate-300">{day.sunrise}</p>
                </div>
                <div>
                  <p className="text-slate-500">Sunset</p>
                  <p className="text-slate-300">{day.sunset}</p>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
