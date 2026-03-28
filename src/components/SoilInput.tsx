import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { translations } from '../utils/translations';
import { FlaskConical, Droplet, Layers } from 'lucide-react';

const SoilInput: React.FC = () => {
  const { soil, setSoil, language } = useAppStore();
  const t = translations[language];

  const soilTypes = [
    { id: 'Alluvial', label: t.alluvial },
    { id: 'Black', label: t.black },
    { id: 'Red', label: t.red },
    { id: 'Laterite', label: t.laterite },
    { id: 'Clayey', label: t.clayey },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">{t.soil}</h3>
      
      <div className="space-y-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-4">
            <Layers size={16} />
            {t.soilType}
          </label>
          <div className="flex flex-wrap gap-3">
            {soilTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSoil({ type: type.id })}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                  soil.type === type.id
                    ? 'bg-green-500 text-white border-green-500 shadow-lg shadow-green-100'
                    : 'bg-white text-gray-500 border-gray-100 hover:border-green-200'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 pt-2">
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-4">
              <FlaskConical size={16} />
              {t.soilPh} ({soil.ph})
            </label>
            <input
              type="range"
              min="4"
              max="9"
              step="0.1"
              value={soil.ph}
              onChange={(e) => setSoil({ ph: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-green-600"
            />
          </div>
          
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-400 mb-4">
              <Droplet size={16} />
              {t.soilMoisture}
            </label>
            <input
              type="number"
              value={soil.moisture}
              onChange={(e) => setSoil({ moisture: parseInt(e.target.value) })}
              className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl text-lg font-black text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilInput;
