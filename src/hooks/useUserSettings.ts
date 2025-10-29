import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { detectBrowserLanguage, detectBrowserCurrency } from '@/utils/localeUtils';

interface UserSettings {
  dark_mode: boolean;
  language: string;
  currency: string;
  notifications: {
    push: boolean;
    email: boolean;
    priceAlerts: boolean;
    marketing: boolean;
  };
}

// Use OS/browser defaults
const DEFAULT_SETTINGS: UserSettings = {
  dark_mode: false,
  language: detectBrowserLanguage(),
  currency: detectBrowserCurrency(),
  notifications: {
    push: true,
    email: true,
    priceAlerts: true,
    marketing: false,
  },
};

export const useUserSettings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch settings from database
  const { data: settings, isLoading } = useQuery({
    queryKey: ['userSettings', user?.id],
    queryFn: async () => {
      if (!user) {
        // Fallback to localStorage for non-authenticated users, with OS defaults
        const localSettings = {
          dark_mode: localStorage.getItem('jetleg-dark-mode') === 'true',
          language: localStorage.getItem('jetleg-language') || detectBrowserLanguage(),
          currency: localStorage.getItem('jetleg-currency') || detectBrowserCurrency(),
          notifications: DEFAULT_SETTINGS.notifications,
        };
        return localSettings;
      }

      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      // If no settings exist, create them with OS defaults
      if (!data) {
        const localSettings = {
          dark_mode: localStorage.getItem('jetleg-dark-mode') === 'true',
          language: localStorage.getItem('jetleg-language') || detectBrowserLanguage(),
          currency: localStorage.getItem('jetleg-currency') || detectBrowserCurrency(),
          notifications: DEFAULT_SETTINGS.notifications,
        };

        const { data: newData, error: insertError } = await supabase
          .from('user_settings')
          .insert({
            user_id: user.id,
            ...localSettings,
          })
          .select()
          .single();

        if (insertError) throw insertError;
        return {
          dark_mode: newData.dark_mode,
          language: newData.language,
          currency: newData.currency,
          notifications: newData.notifications as UserSettings['notifications'],
        };
      }

      return {
        dark_mode: data.dark_mode,
        language: data.language,
        currency: data.currency,
        notifications: data.notifications as UserSettings['notifications'],
      };
    },
    enabled: true,
  });

  // Update settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: async (newSettings: Partial<UserSettings>) => {
      if (!user) {
        // Update localStorage for non-authenticated users
        if (newSettings.dark_mode !== undefined) {
          localStorage.setItem('jetleg-dark-mode', String(newSettings.dark_mode));
        }
        if (newSettings.language) {
          localStorage.setItem('jetleg-language', newSettings.language);
        }
        if (newSettings.currency) {
          localStorage.setItem('jetleg-currency', newSettings.currency);
        }
        return newSettings;
      }

      const { error } = await supabase
        .from('user_settings')
        .update(newSettings)
        .eq('user_id', user.id);

      if (error) throw error;

      // Also update localStorage as backup
      if (newSettings.dark_mode !== undefined) {
        localStorage.setItem('jetleg-dark-mode', String(newSettings.dark_mode));
      }
      if (newSettings.language) {
        localStorage.setItem('jetleg-language', newSettings.language);
      }
      if (newSettings.currency) {
        localStorage.setItem('jetleg-currency', newSettings.currency);
      }

      return newSettings;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userSettings', user?.id] });
    },
  });

  return {
    settings: settings || DEFAULT_SETTINGS,
    isLoading,
    updateSettings: updateSettingsMutation.mutate,
    isUpdating: updateSettingsMutation.isPending,
  };
};
