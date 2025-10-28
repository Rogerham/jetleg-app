import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CurrencyContextType {
  currency: string;
  setCurrency: (currency: string) => void;
  convertPrice: (price: number) => number;
  formatPrice: (price: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Exchange rates (in a real app, these would come from an API)
const exchangeRates: { [key: string]: number } = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.85,
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState(() => {
    return localStorage.getItem('jetleg-currency') || 'EUR';
  });

  useEffect(() => {
    // Load currency from database for authenticated users
    const loadCurrency = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('user_settings')
          .select('currency')
          .eq('user_id', user.id)
          .single();
        
        if (data?.currency) {
          setCurrencyState(data.currency);
        }
      }
    };
    
    loadCurrency();
  }, []);

  useEffect(() => {
    localStorage.setItem('jetleg-currency', currency);
  }, [currency]);

  const setCurrency = (newCurrency: string) => {
    setCurrencyState(newCurrency);
  };

  const convertPrice = (price: number): number => {
    const rate = exchangeRates[currency] || 1;
    return Math.round(price * rate);
  };

  const formatPrice = (price: number): string => {
    const convertedPrice = convertPrice(price);
    const symbols: { [key: string]: string } = {
      EUR: '€',
      USD: '$',
      GBP: '£',
    };
    return `${symbols[currency] || '€'}${convertedPrice.toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
