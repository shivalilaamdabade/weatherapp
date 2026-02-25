import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import Dashboard from './pages/Dashboard';
import Forecast from './pages/Forecast';
import Historical from './pages/Historical';
import Marine from './pages/Marine';
import Locations from './pages/Locations';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('Bengaluru');
  const [units, setUnits] = useState('m');
  const [forecastDays, setForecastDays] = useState(7);
  const [savedLocations, setSavedLocations] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('savedLocations');
    const recent = localStorage.getItem('recentSearches');
    if (saved) setSavedLocations(JSON.parse(saved));
    if (recent) setRecentSearches(JSON.parse(recent));
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem('savedLocations', JSON.stringify(savedLocations));
  }, [savedLocations]);

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const handleLocationChange = (location) => {
    setCurrentLocation(location);
    // Add to recent searches
    setRecentSearches(prev => {
      const filtered = prev.filter(item => item !== location);
      return [location, ...filtered].slice(0, 10);
    });
  };

  const handleAddLocation = (location) => {
    if (!savedLocations.includes(location)) {
      setSavedLocations(prev => [...prev, location]);
    }
  };

  const handleRemoveLocation = (location) => {
    setSavedLocations(prev => prev.filter(item => item !== location));
  };

  const handleSelectLocation = (location) => {
    setCurrentLocation(location);
    // Navigate to dashboard
    window.location.href = '/';
  };

  return (
    <Router>
      <div className="min-h-screen flex">
        {/* Sidebar */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onToggle={() => setSidebarOpen(!sidebarOpen)} 
        />

        {/* Main Content */}
        <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
          {/* Header */}
          <Header
            currentLocation={currentLocation}
            onLocationChange={handleLocationChange}
            units={units}
            onUnitsChange={setUnits}
            recentSearches={recentSearches}
          />

          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route 
                path="/" 
                element={
                  <Dashboard 
                    location={currentLocation} 
                    units={units} 
                  />
                } 
              />
              <Route 
                path="/forecast" 
                element={
                  <Forecast 
                    location={currentLocation} 
                    units={units}
                    days={forecastDays}
                  />
                } 
              />
              <Route 
                path="/historical" 
                element={
                  <Historical 
                    location={currentLocation} 
                    units={units} 
                  />
                } 
              />
              <Route 
                path="/marine" 
                element={
                  <Marine 
                    location={currentLocation} 
                    units={units} 
                  />
                } 
              />
              <Route 
                path="/locations" 
                element={
                  <Locations 
                    savedLocations={savedLocations}
                    onAddLocation={handleAddLocation}
                    onRemoveLocation={handleRemoveLocation}
                    onSelectLocation={handleSelectLocation}
                  />
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
