import { format, parseISO } from 'date-fns';

// Format temperature with unit
export const formatTemp = (temp, unit = 'm') => {
  const symbol = unit === 'm' ? '°C' : unit === 'f' ? '°F' : 'K';
  return `${Math.round(temp)}${symbol}`;
};

// Format wind speed with unit
export const formatWind = (speed, unit = 'm') => {
  const label = unit === 'm' ? 'km/h' : 'mph';
  return `${speed} ${label}`;
};

// Format pressure with unit
export const formatPressure = (pressure, unit = 'm') => {
  const label = unit === 'm' ? 'mb' : 'in';
  return `${pressure} ${label}`;
};

// Format visibility with unit
export const formatVisibility = (visibility, unit = 'm') => {
  const label = unit === 'm' ? 'km' : 'miles';
  return `${visibility} ${label}`;
};

// Format precipitation with unit
export const formatPrecipitation = (precip, unit = 'm') => {
  const label = unit === 'm' ? 'mm' : 'in';
  return `${precip} ${label}`;
};

// Format date
export const formatDate = (dateString, formatStr = 'MMM dd, yyyy') => {
  try {
    const date = parseISO(dateString);
    return format(date, formatStr);
  } catch {
    return dateString;
  }
};

// Format time
export const formatTime = (timeString, formatStr = 'h:mm a') => {
  try {
    const date = parseISO(timeString);
    return format(date, formatStr);
  } catch {
    return timeString;
  }
};

// Format day name
export const formatDay = (dateString) => {
  try {
    const date = parseISO(dateString);
    return format(date, 'EEEE');
  } catch {
    return '';
  }
};

// Format short day name
export const formatShortDay = (dateString) => {
  try {
    const date = parseISO(dateString);
    return format(date, 'EEE');
  } catch {
    return '';
  }
};

// Get wind direction arrow
export const getWindDirection = (degree) => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degree / 22.5) % 16;
  return directions[index];
};

// Get UV index description
export const getUVDescription = (uvIndex) => {
  if (uvIndex <= 2) return { label: 'Low', color: 'text-green-400' };
  if (uvIndex <= 5) return { label: 'Moderate', color: 'text-yellow-400' };
  if (uvIndex <= 7) return { label: 'High', color: 'text-orange-400' };
  if (uvIndex <= 10) return { label: 'Very High', color: 'text-red-400' };
  return { label: 'Extreme', color: 'text-purple-400' };
};

// Get humidity description
export const getHumidityDescription = (humidity) => {
  if (humidity < 30) return { label: 'Dry', color: 'text-yellow-400' };
  if (humidity < 60) return { label: 'Comfortable', color: 'text-green-400' };
  return { label: 'Humid', color: 'text-blue-400' };
};

// Format marine wave height description
export const getMarineCondition = (waveHeight) => {
  if (waveHeight <= 0.5) return 'Calm';
  if (waveHeight <= 1.25) return 'Light';
  if (waveHeight <= 2.5) return 'Moderate';
  if (waveHeight <= 4) return 'Rough';
  if (waveHeight <= 6) return 'Very Rough';
  if (waveHeight <= 9) return 'High';
  if (waveHeight <= 14) return 'Very High';
  return 'Phenomenal';
};

// Format coordinates
export const formatCoordinates = (lat, lon) => {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lonDir = lon >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(2)}° ${latDir}, ${Math.abs(lon).toFixed(2)}° ${lonDir}`;
};

// Format number with commas
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
