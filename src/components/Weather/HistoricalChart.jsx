import React, { useState } from 'react';
import { Calendar, Search } from 'lucide-react';
import GlassCard from '../Layout/GlassCard';
import LoadingSpinner from '../Common/LoadingSpinner';
import ErrorMessage from '../Common/ErrorMessage';
import { formatTemp, formatWind, formatDate } from '../../utils/formatters';

const HistoricalChart = ({ 
  data, 
  loading, 
  error, 
  onSearch, 
  location,
  units 
}) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleSearch = () => {
    if (selectedDate && location) {
      onSearch(location, new Date(selectedDate));
    }
  };

  // Get historical data for the selected date
  const historicalData = data?.historical ? Object.values(data.historical)[0] : null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Search Section */}
      <GlassCard>
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm text-slate-400 mb-2">Select Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="w-full glass-input pl-10 pr-4 py-3 rounded-xl"
              />
            </div>
          </div>
          <button
            onClick={handleSearch}
            disabled={!selectedDate || !location || loading}
            className="glass-button px-6 py-3 rounded-xl font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <LoadingSpinner size="sm" />
            ) : (
              <>
                <Search className="w-5 h-5" />
                Get Historical Data
              </>
            )}
          </button>
        </div>
      </GlassCard>

      {/* Results */}
      {error && <ErrorMessage message={error} />}

      {historicalData && !loading && (
        <div className="space-y-4">
          {/* Date Header */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-100">
                {data.location?.name}
              </h2>
              <p className="text-slate-400">
                Historical Weather for {Object.keys(data.historical)[0]}
              </p>
            </div>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <GlassCard className="text-center">
              <p className="text-sm text-slate-400 mb-1">Average Temp</p>
              <p className="text-3xl font-bold text-gradient">
                {formatTemp(historicalData.avgtemp, units)}
              </p>
            </GlassCard>

            <GlassCard className="text-center">
              <p className="text-sm text-slate-400 mb-1">Max Temp</p>
              <p className="text-3xl font-bold text-slate-200">
                {formatTemp(historicalData.maxtemp, units)}
              </p>
            </GlassCard>

            <GlassCard className="text-center">
              <p className="text-sm text-slate-400 mb-1">Min Temp</p>
              <p className="text-3xl font-bold text-slate-400">
                {formatTemp(historicalData.mintemp, units)}
              </p>
            </GlassCard>

            <GlassCard className="text-center">
              <p className="text-sm text-slate-400 mb-1">Avg Humidity</p>
              <p className="text-3xl font-bold text-slate-200">
                {historicalData.avghumidity}%
              </p>
            </GlassCard>
          </div>

          {/* Hourly Data */}
          {historicalData.hourly && (
            <GlassCard>
              <h3 className="text-lg font-semibold text-slate-200 mb-4">Hourly Breakdown</h3>
              <div className="overflow-x-auto">
                <div className="flex gap-4 min-w-max pb-2">
                  {historicalData.hourly.map((hour, index) => (
                    <div 
                      key={index}
                      className="glass-light rounded-xl p-4 text-center min-w-[100px]"
                    >
                      <p className="text-sm text-cyan-400 font-medium mb-2">
                        {hour.time?.slice(0, 5) || `${index * 3}:00`}
                      </p>
                      {hour.weather_icons?.[0] && (
                        <img 
                          src={hour.weather_icons[0]} 
                          alt=""
                          className="w-10 h-10 mx-auto mb-2 object-contain"
                        />
                      )}
                      <p className="text-lg font-bold text-slate-200">
                        {formatTemp(hour.temperature, units)}
                      </p>
                      <div className="mt-2 text-xs text-slate-500 space-y-1">
                        <p>Wind: {formatWind(hour.wind_speed, units)}</p>
                        <p>Humidity: {hour.humidity}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          )}

          {/* Additional Details */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <GlassCard className="text-center">
              <p className="text-sm text-slate-400 mb-1">UV Index</p>
              <p className="text-xl font-bold text-slate-200">{historicalData.uv_index}</p>
            </GlassCard>

            <GlassCard className="text-center">
              <p className="text-sm text-slate-400 mb-1">Sunrise</p>
              <p className="text-xl font-bold text-slate-200">{historicalData.sunrise}</p>
            </GlassCard>

            <GlassCard className="text-center">
              <p className="text-sm text-slate-400 mb-1">Sunset</p>
              <p className="text-xl font-bold text-slate-200">{historicalData.sunset}</p>
            </GlassCard>

            <GlassCard className="text-center">
              <p className="text-sm text-slate-400 mb-1">Moonrise</p>
              <p className="text-xl font-bold text-slate-200">{historicalData.moonrise}</p>
            </GlassCard>

            <GlassCard className="text-center">
              <p className="text-sm text-slate-400 mb-1">Moonset</p>
              <p className="text-xl font-bold text-slate-200">{historicalData.moonset}</p>
            </GlassCard>

            <GlassCard className="text-center">
              <p className="text-sm text-slate-400 mb-1">Moon Phase</p>
              <p className="text-xl font-bold text-slate-200">{historicalData.moon_phase}</p>
            </GlassCard>
          </div>
        </div>
      )}

      {!historicalData && !loading && !error && (
        <div className="glass-card p-12 text-center">
          <Calendar className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400">Select a date to view historical weather data</p>
          <p className="text-sm text-slate-500 mt-2">Data available from 2008 to present</p>
        </div>
      )}
    </div>
  );
};

export default HistoricalChart;
