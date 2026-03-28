import { Crop, SoilData, WeatherData } from '../../store/useAppStore';

const ALL_CROPS: Crop[] = [
  {
    id: 'rice',
    name: { en: 'Rice (Paddy)', hi: 'चावल (धान)' },
    suitability: 0,
    yield: '3-6 tons/hectare',
    waterNeeds: 'High',
    duration: '120-150 days',
    profit: 'High',
    description: {
      en: 'Rice is the staple food of India, grown primarily in high rainfall areas.',
      hi: 'चावल भारत का मुख्य भोजन है, जो मुख्य रूप से उच्च वर्षा वाले क्षेत्रों में उगाया जाता है।',
    },
    tips: {
      en: ['Requires standing water', 'Best in clayey soil', 'Needs high nitrogen'],
      hi: ['खड़े पानी की आवश्यकता होती है', 'मटियार मिट्टी में सबसे अच्छा', 'उच्च नाइट्रोजन की आवश्यकता'],
    },
    image: 'https://picsum.photos/seed/rice/400/300',
  },
  {
    id: 'wheat',
    name: { en: 'Wheat', hi: 'गेहूं' },
    suitability: 0,
    yield: '2-4 tons/hectare',
    waterNeeds: 'Moderate',
    duration: '110-140 days',
    profit: 'Medium',
    description: {
      en: 'Wheat is a major Rabi crop in India, requiring cool weather during growth.',
      hi: 'गेहूं भारत की एक प्रमुख रबी फसल है, जिसे विकास के दौरान ठंडे मौसम की आवश्यकता होती है।',
    },
    tips: {
      en: ['Requires cool climate', 'Well-drained loamy soil', 'Timely irrigation'],
      hi: ['ठंडी जलवायु की आवश्यकता', 'अच्छी जल निकासी वाली दोमट मिट्टी', 'समय पर सिंचाई'],
    },
    image: 'https://picsum.photos/seed/wheat/400/300',
  },
  {
    id: 'maize',
    name: { en: 'Maize (Corn)', hi: 'मक्का' },
    suitability: 0,
    yield: '2-5 tons/hectare',
    waterNeeds: 'Moderate',
    duration: '90-110 days',
    profit: 'Medium',
    description: {
      en: 'Maize is versatile and can be grown in various soil types.',
      hi: 'मक्का बहुमुखी है और इसे विभिन्न प्रकार की मिट्टी में उगाया जा सकता है।',
    },
    tips: {
      en: ['Good drainage is essential', 'Sensitive to waterlogging', 'Needs balanced NPK'],
      hi: ['अच्छी जल निकासी आवश्यक है', 'जलभराव के प्रति संवेदनशील', 'संतुलित एनपीके की आवश्यकता'],
    },
    image: 'https://picsum.photos/seed/maize/400/300',
  },
  {
    id: 'millet',
    name: { en: 'Bajra (Pearl Millet)', hi: 'बाजरा' },
    suitability: 0,
    yield: '1-2 tons/hectare',
    waterNeeds: 'Low',
    duration: '70-90 days',
    profit: 'Medium',
    description: {
      en: 'Millet is highly drought-resistant and grows well in dry regions.',
      hi: 'बाजरा अत्यधिक सूखा-प्रतिरोधी है और शुष्क क्षेत्रों में अच्छी तरह से बढ़ता है।',
    },
    tips: {
      en: ['Drought tolerant', 'Grows in sandy soils', 'Low input requirement'],
      hi: ['सूखा सहिष्णु', 'रेतीली मिट्टी में उगता है', 'कम लागत की आवश्यकता'],
    },
    image: 'https://picsum.photos/seed/millet/400/300',
  },
  {
    id: 'cotton',
    name: { en: 'Cotton', hi: 'कपास' },
    suitability: 0,
    yield: '1-2 tons/hectare',
    waterNeeds: 'Moderate',
    duration: '160-180 days',
    profit: 'High',
    description: {
      en: 'Cotton is a major cash crop, thriving in black soil.',
      hi: 'कपास एक प्रमुख नकदी फसल है, जो काली मिट्टी में पनपती है।',
    },
    tips: {
      en: ['Best in Black soil', 'Requires frost-free days', 'Needs warm climate'],
      hi: ['काली मिट्टी में सबसे अच्छा', 'पाला मुक्त दिनों की आवश्यकता', 'गर्म जलवायु की आवश्यकता'],
    },
    image: 'https://picsum.photos/seed/cotton/400/300',
  },
];

export const getRecommendations = (weather: WeatherData, soil: SoilData): Crop[] => {
  return ALL_CROPS.map((crop) => {
    let score = 50; // Base score

    // Temperature logic
    if (crop.id === 'wheat') {
      if (weather.temp < 25 && weather.temp > 10) score += 30;
      else score -= 20;
    }
    if (crop.id === 'rice') {
      if (weather.temp > 25) score += 30;
      if (weather.humidity > 70) score += 10;
    }
    if (crop.id === 'millet') {
      if (weather.temp > 30) score += 30;
      if (weather.humidity < 50) score += 10;
    }

    // Soil Logic
    if (crop.id === 'cotton' && soil.type === 'Black') score += 40;
    if (crop.id === 'rice' && soil.type === 'Clayey') score += 20;
    if (soil.ph >= 6 && soil.ph <= 7.5) score += 10;

    // Water logic
    if (crop.waterNeeds === 'High' && weather.humidity > 60) score += 10;
    if (crop.waterNeeds === 'Low' && weather.humidity < 40) score += 20;

    return {
      ...crop,
      suitability: Math.min(Math.max(score, 10), 98), // Clamp between 10 and 98
    };
  }).sort((a, b) => b.suitability - a.suitability);
};
