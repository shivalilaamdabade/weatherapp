import React, { useState, useEffect } from 'react';
import { Search, MapPin, Thermometer } from 'lucide-react';
import LocationSearch from '../Search/LocationSearch';

const Header = ({ 
  currentLocation, 
  onLocationChange, 
  units, 
  onUnitsChange,
  recentSearches 
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <header className="glass sticky top-0 z-20 px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Search Section */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <button
              onClick={() => setShowSearch(true)}
              className="w-full flex items-center gap-3 glass-input px-4 py-3 rounded-xl text-left"
            >
              <Search className="w-5 h-5 text-slate-400" />
              <span className="text-slate-400">
                {currentLocation || 'Search for a location...'}
              </span>
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Units Toggle */}
          <div className="glass-light rounded-lg p-1 flex items-center">
            <button
              onClick={() => onUnitsChange('m')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                units === 'm' 
                  ? 'bg-cyan-500/20 text-cyan-400' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              °C
            </button>
            <button
              onClick={() => onUnitsChange('f')}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                units === 'f' 
                  ? 'bg-cyan-500/20 text-cyan-400' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              °F
            </button>
          </div>

          {/* Date/Time */}
          <div className="hidden md:block text-right">
            <p className="text-lg font-semibold text-slate-200">{formatTime(currentTime)}</p>
            <p className="text-xs text-slate-400">{formatDate(currentTime)}</p>
          </div>
        </div>
      </div>

      {/* Location Search Modal */}
      {showSearch && (
        <LocationSearch 
          onSelect={(location) => {
            onLocationChange(location);
            setShowSearch(false);
          }}
          onClose={() => setShowSearch(false)}
          recentSearches={recentSearches}
        />
      )}
    </header>
  );
};

export default Header;
