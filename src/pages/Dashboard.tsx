import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../utils/translations';
import WeatherCard from '../components/WeatherCard';
import LocationSelector from '../components/LocationSelector';
import SoilInput from '../components/SoilInput';
import { getRecommendations } from '../services/api/recommendationService';
import { Sparkles } from 'lucide-react';

const Dashboard: React.FC<{ onGetRecs: () => void }> = ({ onGetRecs }) => {
  const { weather, soil, setRecommendations, setLoading, language } = useAppStore();
  const t = translations[language];

  const handleGetRecommendations = () => {
    if (!weather) return;
    setLoading(true);
    setTimeout(() => {
      const recs = getRecommendations(weather, soil);
      setRecommendations(recs);
      setLoading(false);
      onGetRecs();
    }, 1500);
  };

  return (
    <div className="pb-24 pt-8 px-4 space-y-8 max-w-lg mx-auto">
      <header className="flex flex-col items-center text-center mb-4">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-black text-gray-900"
        >
          {t.dashboard}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm font-bold text-gray-400 uppercase tracking-widest"
        >
          {t.tagline}
        </motion.p>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <LocationSelector />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <WeatherCard />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <SoilInput />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="fixed bottom-6 left-4 right-4 max-w-lg mx-auto z-20"
      >
        <button
          disabled={!weather}
          onClick={handleGetRecommendations}
          className={`w-full py-5 rounded-3xl font-bold text-lg shadow-xl transition-all flex items-center justify-center gap-2 ${
            weather 
              ? 'bg-green-600 text-white shadow-green-200 hover:bg-green-700' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Sparkles size={20} />
          {t.getRecs}
        </button>
      </motion.div>
    </div>
  );
};

export default Dashboard;
