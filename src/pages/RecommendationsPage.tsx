import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore, Crop } from '../store/useAppStore';
import { translations } from '../utils/translations';
import { ChevronLeft, Droplet, Clock, TrendingUp, ChevronRight } from 'lucide-react';

const RecommendationsPage: React.FC<{ onBack: () => void; onSelectCrop: (crop: Crop) => void }> = ({ onBack, onSelectCrop }) => {
  const { recommendations, language } = useAppStore();
  const t = translations[language];

  return (
    <div className="pb-12 pt-6 px-4 space-y-6 max-w-lg mx-auto">
      <header className="flex items-center gap-4 mb-2">
        <button onClick={onBack} className="p-2 bg-white rounded-full shadow-sm border border-gray-100">
          <ChevronLeft size={20} />
        </button>
        <h2 className="text-2xl font-black text-gray-900">{t.recommendations}</h2>
      </header>

      <div className="space-y-4">
        {recommendations.map((crop, index) => (
          <motion.div
            key={crop.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelectCrop(crop)}
            className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex gap-4 cursor-pointer hover:border-green-200 transition-colors group"
          >
            <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
              <img src={crop.image} alt={crop.name[language]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
            </div>
            
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">{crop.name[language]}</h3>
                  <div className="flex items-center gap-1 text-green-600">
                    <span className="text-sm font-black">{crop.suitability}%</span>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-2">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                    <Droplet size={10} className="text-blue-400" />
                    {crop.waterNeeds}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                    <Clock size={10} className="text-orange-400" />
                    {crop.duration.split(' ')[0]}d
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                    <TrendingUp size={10} className="text-green-400" />
                    {crop.profit}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden mr-4">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${crop.suitability}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    className="h-full bg-green-500 rounded-full"
                  />
                </div>
                <ChevronRight size={16} className="text-gray-300" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsPage;
