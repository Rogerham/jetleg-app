import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';

// Import translation files
import nlTranslations from './locales/nl.json';
import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';
import deTranslations from './locales/de.json';
import esTranslations from './locales/es.json';
import itTranslations from './locales/it.json';

const resources = {
  nl: { translation: nlTranslations },
  en: { translation: enTranslations },
  fr: { translation: frTranslations },
  de: { translation: deTranslations },
  es: { translation: esTranslations },
  it: { translation: itTranslations }
};

// Get initial language from localStorage or default to 'nl'
const storedLanguage = localStorage.getItem('jetleg-language') || 'nl';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: storedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Load language from database for authenticated users
const loadLanguageFromDatabase = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    const { data } = await supabase
      .from('user_settings')
      .select('language')
      .eq('user_id', user.id)
      .single();
    
    if (data?.language) {
      i18n.changeLanguage(data.language);
      localStorage.setItem('jetleg-language', data.language);
    }
  }
};

loadLanguageFromDatabase();

// Listen for language changes and update localStorage
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('jetleg-language', lng);
});

export default i18n;
