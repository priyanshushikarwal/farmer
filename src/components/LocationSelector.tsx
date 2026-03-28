import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../utils/translations';
import { MapPin, Navigation, Target } from 'lucide-react';
import { fetchWeather, reverseGeocode } from '../services/api/weatherService';

const LocationSelector: React.FC = () => {
  const { location, setLocation, setWeather, setLoading, language } = useAppStore();
  const t = translations[language];

  const handleDetectLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const weatherData = await fetchWeather(latitude, longitude);
          const geoData = await reverseGeocode(latitude, longitude);
          
          setLocation({
            lat: latitude,
            lon: longitude,
            city: geoData.city,
            state: geoData.state,
          });
          setWeather(weatherData);
          setLoading(false);
        },
        (error) => {
          console.error(error);
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{t.location}</h3>
        <Target className="text-green-500" size={20} />
      </div>
      
      {location ? (
        <div className="flex items-center gap-3 p-4 bg-green-50/50 rounded-2xl border border-green-100">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-100">
            <Navigation size={24} />
          </div>
          <div>
            <p className="text-sm font-black text-gray-900">{location.city || 'Current Location'}</p>
            <p className="text-xs font-bold text-gray-400">{location.state || 'India'}</p>
          </div>
          <button 
            onClick={handleDetectLocation}
            className="ml-auto text-xs font-black text-green-600 uppercase tracking-widest"
          >
            UPDATE
          </button>
        </div>
      ) : (
        <button
          onClick={handleDetectLocation}
          className="w-full py-5 bg-green-500 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-all shadow-xl shadow-green-100"
        >
          <Navigation size={20} />
          {t.detectLocation}
        </button>
      )}
    </div>
  );
};

export default LocationSelector;
