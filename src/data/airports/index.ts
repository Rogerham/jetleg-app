import { Airport } from './types';
import i18n from '@/i18n/config';

// Import all language versions
import * as nl from './nl';
import * as en from './en';
import * as fr from './fr';
import * as de from './de';
import * as es from './es';
import * as it from './it';

const airportsByLanguage = {
  nl: { worldwide: nl.extendedWorldwideAirports, popular: nl.popularAirports },
  en: { worldwide: en.extendedWorldwideAirports, popular: en.popularAirports },
  fr: { worldwide: fr.extendedWorldwideAirports, popular: fr.popularAirports },
  de: { worldwide: de.extendedWorldwideAirports, popular: de.popularAirports },
  es: { worldwide: es.extendedWorldwideAirports, popular: es.popularAirports },
  it: { worldwide: it.extendedWorldwideAirports, popular: it.popularAirports }
};

export const getAirportsForLanguage = () => {
  const currentLang = i18n.language as keyof typeof airportsByLanguage;
  return airportsByLanguage[currentLang] || airportsByLanguage.en;
};

export const extendedWorldwideAirports = () => getAirportsForLanguage().worldwide;
export const popularAirports = () => getAirportsForLanguage().popular;

// Re-export type
export type { Airport } from './types';
