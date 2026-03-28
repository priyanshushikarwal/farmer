import axios from 'axios';
import { WeatherData } from '../../store/useAppStore';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || '886705b4c1182eb1c69f288251f88c64'; // Fallback for demo if not provided

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = response.data;
    return {
      temp: data.main.temp,
      humidity: data.main.humidity,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      rainfall: data.rain ? data.rain['1h'] : 0,
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    // Fallback mock data
    return {
      temp: 28,
      humidity: 65,
      description: 'Partly cloudy',
      icon: '02d',
      rainfall: 0,
    };
  }
};

export const reverseGeocode = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
    );
    return {
      city: response.data.address.city || response.data.address.town || response.data.address.village,
      state: response.data.address.state,
    };
  } catch (error) {
    return { city: 'Unknown', state: 'India' };
  }
};
