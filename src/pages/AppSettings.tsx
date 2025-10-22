import { useState, useEffect } from 'react';
import { Bell, Globe, DollarSign, Moon, Sun, Smartphone, Save } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

interface AppSettingsProps {
  onBack: () => void;
}

const AppSettings = ({ onBack }: AppSettingsProps) => {
  const { currency, setCurrency } = useCurrency();
  const { i18n, t } = useTranslation();
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    marketing: false,
    priceAlerts: true
  });
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // Save settings to localStorage or backend
      localStorage.setItem('notifications', JSON.stringify(notifications));
      toast.success(t('appSettings.toast.saved'));
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error(t('appSettings.toast.error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if dark mode is enabled
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency as 'EUR' | 'USD' | 'GBP');
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Store preference
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  const languages = [
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' }
  ];

  const currencies = [
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'GBP', name: 'British Pound', symbol: '£' }
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Notifications */}
        <div className="card-jetleg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Bell className="h-5 w-5" />
            {t('appSettings.notifications')}
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground">{t('appSettings.pushNotifications')}</h3>
                <p className="text-sm text-muted-foreground">{t('appSettings.pushDesc')}</p>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground">{t('appSettings.emailNotifications')}</h3>
                <p className="text-sm text-muted-foreground">{t('appSettings.emailDesc')}</p>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground">{t('appSettings.priceAlerts')}</h3>
                <p className="text-sm text-muted-foreground">{t('appSettings.priceAlertsDesc')}</p>
              </div>
              <Switch
                checked={notifications.priceAlerts}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, priceAlerts: checked }))}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-foreground">{t('appSettings.marketing')}</h3>
                <p className="text-sm text-muted-foreground">{t('appSettings.marketingDesc')}</p>
              </div>
              <Switch
                checked={notifications.marketing}
                onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, marketing: checked }))}
              />
            </div>
          </div>
        </div>

        {/* Language */}
        <div className="card-jetleg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Globe className="h-5 w-5" />
            {t('appSettings.language')}
          </h2>
          
          <Select value={i18n.language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem key={lang.code} value={lang.code}>
                  <div className="flex items-center gap-2">
                    <span>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Currency */}
        <div className="card-jetleg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            {t('appSettings.currency')}
          </h2>
          
          <Select value={currency} onValueChange={handleCurrencyChange}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((curr) => (
                <SelectItem key={curr.code} value={curr.code}>
                  <div className="flex items-center gap-2">
                    <span>{curr.symbol}</span>
                    <span>{curr.name} ({curr.code})</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Appearance */}
        <div className="card-jetleg p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            {t('appSettings.appearance')}
          </h2>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <div>
                <h3 className="font-medium text-foreground">{t('appSettings.darkMode')}</h3>
                <p className="text-sm text-muted-foreground">{t('appSettings.darkModeDesc')}</p>
              </div>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={toggleDarkMode}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={handleSaveSettings}
            disabled={loading}
            size="lg"
            className="w-full md:w-auto min-w-[200px] flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            {loading ? t('appSettings.saving') : t('appSettings.saveSettings')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppSettings;