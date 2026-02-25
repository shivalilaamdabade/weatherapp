import React, { useState, useEffect } from 'react';
import { MapPin, Trash2, Star, Plus } from 'lucide-react';
import GlassCard from '../components/Layout/GlassCard';
import LocationSearch from '../components/Search/LocationSearch';

const Locations = ({ savedLocations, onAddLocation, onRemoveLocation, onSelectLocation }) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Saved Locations</h1>
          <p className="text-slate-400">Manage your favorite weather locations</p>
        </div>
        <button
          onClick={() => setShowSearch(true)}
          className="glass-button px-4 py-2 rounded-xl flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Location
        </button>
      </div>

      {savedLocations.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <MapPin className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <p className="text-slate-400 mb-2">No saved locations yet</p>
          <p className="text-sm text-slate-500">Add locations to quickly access their weather data</p>
          <button
            onClick={() => setShowSearch(true)}
            className="glass-button px-6 py-3 rounded-xl mt-6"
          >
            Add Your First Location
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedLocations.map((location, index) => (
            <GlassCard key={index} className="group">
              <div className="flex items-start justify-between">
                <button
                  onClick={() => onSelectLocation(location)}
                  className="flex-1 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-200 group-hover:text-cyan-400 transition-colors">
                        {location}
                      </h3>
                      <p className="text-sm text-slate-500">Tap to view weather</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => onRemoveLocation(location)}
                  className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </GlassCard>
          ))}
        </div>
      )}

      {showSearch && (
        <LocationSearch
          onSelect={(location) => {
            onAddLocation(location);
            setShowSearch(false);
          }}
          onClose={() => setShowSearch(false)}
        />
      )}
    </div>
  );
};

export default Locations;
