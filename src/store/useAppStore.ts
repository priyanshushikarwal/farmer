import { create } from 'zustand';

export type Language = 'en' | 'hi';

export interface WeatherData {
  temp: number;
  humidity: number;
  description: string;
  icon: string;
  rainfall?: number;
}

export interface SoilData {
  ph: number;
  type: string;
  moisture: number;
  nitrogen?: number;
  phosphorus?: number;
  potassium?: number;
}

export interface LocationData {
  lat: number;
  lon: number;
  city?: string;
  state?: string;
}

export interface Crop {
  id: string;
  name: { en: string; hi: string };
  suitability: number;
  yield: string;
  waterNeeds: 'Low' | 'Moderate' | 'High';
  duration: string;
  profit: 'Low' | 'Medium' | 'High';
  description: { en: string; hi: string };
  tips: { en: string[]; hi: string[] };
  image: string;
}

interface AppState {
  language: Language;
  location: LocationData | null;
  weather: WeatherData | null;
  soil: SoilData;
  recommendations: Crop[];
  loading: boolean;
  error: string | null;

  setLanguage: (lang: Language) => void;
  setLocation: (loc: LocationData) => void;
  setWeather: (weather: WeatherData) => void;
  setSoil: (soil: Partial<SoilData>) => void;
  setRecommendations: (crops: Crop[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  language: 'en',
  location: null,
  weather: null,
  soil: {
    ph: 6.5,
    type: 'Alluvial',
    moisture: 40,
  },
  recommendations: [],
  loading: false,
  error: null,

  setLanguage: (language) => set({ language }),
  setLocation: (location) => set({ location }),
  setWeather: (weather) => set({ weather }),
  setSoil: (soil) => set((state) => ({ soil: { ...state.soil, ...soil } })),
  setRecommendations: (recommendations) => set({ recommendations }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
