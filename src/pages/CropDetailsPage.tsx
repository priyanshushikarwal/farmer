import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore, Crop } from '../store/useAppStore';
import { translations } from '../utils/translations';
import { ChevronLeft, Droplet, Clock, TrendingUp, CheckCircle2, Info } from 'lucide-react';

const CropDetailsPage: React.FC<{ crop: Crop; onBack: () => void }> = ({ crop, onBack }) => {
  const { language } = useAppStore();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-[#F9FAF9]">
      <div className="relative h-72">
        <img src={crop.image} alt={crop.name[language]} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F9FAF9] via-transparent to-black/20" />
        
        <button 
          onClick={onBack}
          className="absolute top-6 left-4 p-3 bg-white/90 backdrop-blur rounded-full shadow-lg text-gray-900"
        >
          <ChevronLeft size={24} />
        </button>
      </div>

      <div className="px-6 -mt-12 relative z-10 space-y-6 pb-12 max-w-lg mx-auto">
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-black text-gray-900">{crop.name[language]}</h1>
            <div className="bg-green-600 text-white px-4 py-1 rounded-full text-sm font-black">
              {crop.suitability}%
            </div>
          </div>
          <p className="text-gray-500 leading-relaxed">{crop.description[language]}</p>
          
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-2">
                <Droplet size={24} />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t.waterNeeds}</span>
              <span className="text-sm font-bold text-gray-900">{crop.waterNeeds}</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-2">
                <Clock size={24} />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t.duration}</span>
              <span className="text-sm font-bold text-gray-900">{crop.duration.split(' ')[0]} Days</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-2">
                <TrendingUp size={24} />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{t.profit}</span>
              <span className="text-sm font-bold text-gray-900">{crop.profit}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
              <CheckCircle2 size={18} />
            </div>
            <h3 className="text-xl font-black text-gray-900">{t.growingTips}</h3>
          </div>
          
          <ul className="space-y-4">
            {crop.tips[language].map((tip, i) => (
              <li key={i} className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-gray-600 text-sm font-medium">{tip}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-green-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-green-200">
          <div className="flex items-center gap-2 mb-4">
            <Info size={20} />
            <h3 className="text-lg font-bold">{t.yield}</h3>
          </div>
          <p className="text-2xl font-black">{crop.yield}</p>
        </div>
      </div>
    </div>
  );
};

export default CropDetailsPage;
