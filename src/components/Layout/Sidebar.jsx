import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Cloud, 
  CalendarDays, 
  History, 
  Waves, 
  MapPin, 
  Settings,
  Menu,
  X
} from 'lucide-react';

const Sidebar = ({ isOpen, onToggle }) => {
  const navItems = [
    { path: '/', icon: Cloud, label: 'Current' },
    { path: '/forecast', icon: CalendarDays, label: 'Forecast' },
    { path: '/historical', icon: History, label: 'Historical' },
    { path: '/marine', icon: Waves, label: 'Marine' },
    { path: '/locations', icon: MapPin, label: 'Locations' },
  ];

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={onToggle}
        className="fixed top-4 left-4 z-50 lg:hidden glass p-2 rounded-lg"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-full w-64 glass z-40 transform transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">WeatherStack</h1>
                <p className="text-xs text-slate-400">Professional Weather Data</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }
                `}
                onClick={() => window.innerWidth < 1024 && onToggle()}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-white/10">
            <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-all duration-200">
              <Settings className="w-5 h-5" />
              <span className="font-medium">Settings</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default Sidebar;
