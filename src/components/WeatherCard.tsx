import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../utils/translations';
import { Cloud, Droplets, Thermometer } from 'lucide-react';

const WeatherCard: React.FC = () => {
  const { weather, language } = useAppStore();
  const t = translations[language];

  if (!weather) return null;

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">{t.weather}</h3>
        <span className="text-xs font-black px-3 py-1 bg-green-50 text-green-600 rounded-full">
          {weather.description}
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center p-4 bg-white border border-gray-50 rounded-2xl shadow-sm">
          <Thermometer className="text-orange-500 mb-2" size={24} />
          <span className="text-2xl font-bold text-gray-900">{Math.round(weather.temp)}°C</span>
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">TEMP</span>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-white border border-gray-50 rounded-2xl shadow-sm">
          <Droplets className="text-blue-500 mb-2" size={24} />
          <span className="text-2xl font-bold text-gray-900">{weather.humidity}%</span>
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">HUMIDITY</span>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-white border border-gray-50 rounded-2xl shadow-sm">
          <Cloud className="text-gray-400 mb-2" size={24} />
          <span className="text-2xl font-bold text-gray-900">{weather.rainfall || 0}mm</span>
          <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mt-1">RAIN</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
