import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../utils/translations';
import { Languages } from 'lucide-react';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useAppStore();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-sm font-medium border border-white/20"
    >
      <Languages size={16} />
      <span>{language === 'en' ? translations.hi.hindi : translations.en.english}</span>
    </button>
  );
};

export default LanguageToggle;
