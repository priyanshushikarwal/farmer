import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppStore, Crop } from './store/useAppStore';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import RecommendationsPage from './pages/RecommendationsPage';
import CropDetailsPage from './pages/CropDetailsPage';
import LoadingOverlay from './components/LoadingOverlay';
import LanguageToggle from './components/LanguageToggle';
import { translations } from './utils/translations';
import { Sprout } from 'lucide-react';

type Page = 'landing' | 'dashboard' | 'recommendations' | 'details';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const { loading, language, setLanguage } = useAppStore();
  const t = translations[language];

  // Simple page navigation handler
  const navigateTo = (page: Page) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-[#F9FAF9] font-sans text-gray-900 selection:bg-green-100 selection:text-green-900">
      {/* Global Header/Nav */}
      {currentPage !== 'landing' && (
        <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2" onClick={() => navigateTo('dashboard')}>
            <div className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center text-white">
              <Sprout size={18} />
            </div>
            <span className="font-black text-lg tracking-tight">{t.appName}</span>
          </div>
          <LanguageToggle />
        </nav>
      )}

      {currentPage === 'landing' && (
        <div className="fixed top-6 right-6 z-40">
          <LanguageToggle />
        </div>
      )}

      <main className="relative">
        <AnimatePresence mode="wait">
          {currentPage === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LandingPage onStart={() => navigateTo('dashboard')} />
            </motion.div>
          )}

          {currentPage === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Dashboard onGetRecs={() => navigateTo('recommendations')} />
            </motion.div>
          )}

          {currentPage === 'recommendations' && (
            <motion.div
              key="recommendations"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <RecommendationsPage 
                onBack={() => navigateTo('dashboard')} 
                onSelectCrop={(crop) => {
                  setSelectedCrop(crop);
                  navigateTo('details');
                }}
              />
            </motion.div>
          )}

          {currentPage === 'details' && selectedCrop && (
            <motion.div
              key="details"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
            >
              <CropDetailsPage 
                crop={selectedCrop} 
                onBack={() => navigateTo('recommendations')} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {loading && <LoadingOverlay message={t.loading} />}
      </AnimatePresence>
    </div>
  );
}
