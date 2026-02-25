import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, Clock, Star } from 'lucide-react';
import { useLocations } from '../../hooks/useLocations';
import LoadingSpinner from '../Common/LoadingSpinner';

const LocationSearch = ({ onSelect, onClose, recentSearches = [] }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  const { data: locations, loading } = useLocations(query);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSelect = (location) => {
    const locationString = `${location.name}, ${location.country}`;
    onSelect(locationString);
  };

  const popularLocations = [
    { name: 'New York', country: 'United States', region: 'New York' },
    { name: 'London', country: 'United Kingdom', region: 'City of London' },
    { name: 'Tokyo', country: 'Japan', region: 'Tokyo' },
    { name: 'Sydney', country: 'Australia', region: 'New South Wales' },
    { name: 'Paris', country: 'France', region: 'Île-de-France' },
    { name: 'Dubai', country: 'United Arab Emirates', region: 'Dubai' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg glass-card animate-slide-up">
        {/* Search Input */}
        <div className="p-4 border-b border-white/10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for a city, region, or country..."
              className="w-full glass-input pl-12 pr-10 py-4 rounded-xl text-lg"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[400px] overflow-y-auto">
          {loading ? (
            <div className="p-8 flex justify-center">
              <LoadingSpinner />
            </div>
          ) : query.length >= 2 && locations?.length > 0 ? (
            <div className="p-2">
              <p className="px-3 py-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
                Search Results
              </p>
              {locations.map((location, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(location)}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-200">{location.name}</p>
                    <p className="text-sm text-slate-500">
                      {location.region}, {location.country}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : query.length >= 2 ? (
            <div className="p-8 text-center">
              <p className="text-slate-400">No locations found</p>
            </div>
          ) : (
            <div className="p-2">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <>
                  <p className="px-3 py-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Recent Searches
                  </p>
                  {recentSearches.slice(0, 5).map((location, index) => (
                    <button
                      key={`recent-${index}`}
                      onClick={() => onSelect(location)}
                      className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors text-left"
                    >
                      <Clock className="w-5 h-5 text-slate-500" />
                      <span className="text-slate-300">{location}</span>
                    </button>
                  ))}
                </>
              )}

              {/* Popular Locations */}
              <p className="px-3 py-2 text-xs font-medium text-slate-500 uppercase tracking-wider">
                Popular Locations
              </p>
              {popularLocations.map((location, index) => (
                <button
                  key={`popular-${index}`}
                  onClick={() => handleSelect(location)}
                  className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors text-left"
                >
                  <Star className="w-5 h-5 text-slate-500" />
                  <div>
                    <p className="font-medium text-slate-200">{location.name}</p>
                    <p className="text-sm text-slate-500">{location.country}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-white/10 text-center">
          <p className="text-xs text-slate-500">
            Press ESC to close
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationSearch;
