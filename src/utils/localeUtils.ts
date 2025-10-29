// Utility functions for detecting OS/browser locale settings

export const detectBrowserLanguage = (): string => {
  const browserLang = navigator.language || navigator.languages?.[0] || 'nl';
  
  // Map browser language codes to our supported languages
  const langMap: Record<string, string> = {
    'nl': 'nl',
    'nl-NL': 'nl',
    'nl-BE': 'nl',
    'en': 'en',
    'en-US': 'en',
    'en-GB': 'en',
    'fr': 'fr',
    'fr-FR': 'fr',
    'fr-BE': 'fr',
    'de': 'de',
    'de-DE': 'de',
    'es': 'es',
    'es-ES': 'es',
    'it': 'it',
    'it-IT': 'it',
  };
  
  // Try exact match first
  if (langMap[browserLang]) {
    return langMap[browserLang];
  }
  
  // Try language code without region
  const langCode = browserLang.split('-')[0];
  if (langMap[langCode]) {
    return langMap[langCode];
  }
  
  // Default to Dutch
  return 'nl';
};

export const detectBrowserCurrency = (): string => {
  try {
    // Try to detect currency from browser locale
    const browserLang = navigator.language || 'nl-NL';
    const formatter = new Intl.NumberFormat(browserLang, { 
      style: 'currency', 
      currency: 'EUR' 
    });
    
    const parts = formatter.formatToParts(0);
    const currencyPart = parts.find(part => part.type === 'currency');
    
    if (currencyPart) {
      const detectedCurrency = currencyPart.value;
      
      // Map common currency symbols/codes to our supported currencies
      const currencyMap: Record<string, string> = {
        '€': 'EUR',
        'EUR': 'EUR',
        '$': 'USD',
        'USD': 'USD',
        '£': 'GBP',
        'GBP': 'GBP',
      };
      
      return currencyMap[detectedCurrency] || 'EUR';
    }
    
    // Fallback based on language/region
    const regionMap: Record<string, string> = {
      'en-US': 'USD',
      'en-GB': 'GBP',
      'en': 'EUR',
      'nl': 'EUR',
      'fr': 'EUR',
      'de': 'EUR',
      'es': 'EUR',
      'it': 'EUR',
    };
    
    return regionMap[browserLang] || regionMap[browserLang.split('-')[0]] || 'EUR';
  } catch (error) {
    // Default to EUR if detection fails
    return 'EUR';
  }
};
