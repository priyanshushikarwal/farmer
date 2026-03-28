import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../utils/translations';
import { Sprout } from 'lucide-react';

const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const { language } = useAppStore();
  const t = translations[language];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[#F9FAF9] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-earth-100 rounded-full blur-3xl opacity-30" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center z-10"
      >
        <div className="w-20 h-20 bg-green-600 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-200 rotate-12">
          <Sprout size={40} className="text-white -rotate-12" />
        </div>
        
        <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
          {t.heroTitle}
        </h1>
        
        <p className="text-lg text-gray-500 mb-12 max-w-md mx-auto leading-relaxed">
          {t.heroSub}
        </p>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className="w-full max-w-xs py-5 bg-green-600 text-white rounded-3xl font-bold text-lg shadow-xl shadow-green-200 hover:bg-green-700 transition-all"
        >
          {t.checkCrops}
        </motion.button>
        
        <p className="mt-8 text-xs font-bold text-gray-400 uppercase tracking-widest">
          {t.tagline}
        </p>
      </motion.div>
    </div>
  );
};

export default LandingPage;
