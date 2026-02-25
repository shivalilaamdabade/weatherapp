import React from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import GlassCard from '../Layout/GlassCard';

const FilterPanel = ({ 
  isOpen, 
  onClose, 
  units, 
  onUnitsChange,
  forecastDays,
  onForecastDaysChange 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-sm glass-card animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-cyan-400" />
            <h3 className="font-semibold text-slate-200">Filters</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Units */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Temperature Units
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => onUnitsChange('m')}
                className={`py-2 px-4 rounded-lg font-medium transition-all ${
                  units === 'm'
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'glass-light text-slate-400 hover:text-slate-200'
                }`}
              >
                Celsius
              </button>
              <button
                onClick={() => onUnitsChange('f')}
                className={`py-2 px-4 rounded-lg font-medium transition-all ${
                  units === 'f'
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'glass-light text-slate-400 hover:text-slate-200'
                }`}
              >
                Fahrenheit
              </button>
              <button
                onClick={() => onUnitsChange('s')}
                className={`py-2 px-4 rounded-lg font-medium transition-all ${
                  units === 's'
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                    : 'glass-light text-slate-400 hover:text-slate-200'
                }`}
              >
                Kelvin
              </button>
            </div>
          </div>

          {/* Forecast Days */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Forecast Days
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="14"
                value={forecastDays}
                onChange={(e) => onForecastDaysChange(parseInt(e.target.value))}
                className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <span className="w-12 text-center font-medium text-cyan-400">
                {forecastDays}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Select 1-14 days for forecast data
            </p>
          </div>

          {/* Info */}
          <div className="glass-light rounded-lg p-4">
            <h4 className="text-sm font-medium text-slate-300 mb-2">Unit Information</h4>
            <ul className="text-xs text-slate-400 space-y-1">
              <li>• Metric (°C, km/h, mm)</li>
              <li>• Fahrenheit (°F, mph, in)</li>
              <li>• Scientific (K, km/h, mm)</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full glass-button py-3 rounded-xl font-medium"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
