import { useState } from 'react';
import { Plane, User, Heart, Settings, CreditCard, HelpCircle, ArrowLeft, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import MyBookings from './MyBookings';
import EditProfile from './EditProfile';
import AppSettings from './AppSettings';
import PaymentDetails from './PaymentDetails';
import HelpSupport from './HelpSupport';

type TileView = 'main' | 'bookings' | 'edit-profile' | 'settings' | 'payment' | 'help';

const ProfileTiles = () => {
  const { user, signOut } = useAuth();
  const { t } = useTranslation();
  const [activeView, setActiveView] = useState<TileView>('main');
  
  const handleLogout = async () => {
    try {
      await signOut();
      toast.success(t('profile.logoutSuccess'));
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error(t('profile.logoutError'));
    }
  };

  const tiles = [
    {
      id: 'bookings',
      title: t('profile.tiles.bookings'),
      subtitle: t('profile.tiles.bookingsSubtitle'),
      icon: Plane,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'edit-profile',
      title: t('profile.tiles.editProfile'),
      subtitle: t('profile.tiles.editProfileSubtitle'),
      icon: User,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'settings',
      title: t('profile.tiles.settings'),
      subtitle: t('profile.tiles.settingsSubtitle'),
      icon: Settings,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    },
    {
      id: 'payment',
      title: t('profile.tiles.payment'),
      subtitle: t('profile.tiles.paymentSubtitle'),
      icon: CreditCard,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'help',
      title: t('profile.tiles.help'),
      subtitle: t('profile.tiles.helpSubtitle'),
      icon: HelpCircle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'bookings':
        return <MyBookings hideNavigation onBackToProfile={() => setActiveView('main')} />;
      case 'edit-profile':
        return <EditProfile onBack={() => setActiveView('main')} />;
      case 'settings':
        return <AppSettings onBack={() => setActiveView('main')} />;
      case 'payment':
        return <PaymentDetails onBack={() => setActiveView('main')} />;
      case 'help':
        return <HelpSupport onBack={() => setActiveView('main')} />;
      default:
        return (
          <div className="container mx-auto px-6 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">{t('profile.title')}</h1>
                <p className="text-muted-foreground">{t('profile.welcome')}, {user?.user_metadata?.first_name || user?.email}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {tiles.map((tile) => {
                  const IconComponent = tile.icon;
                  return (
                    <button
                      key={tile.id}
                      onClick={() => setActiveView(tile.id as TileView)}
                      className="p-6 bg-background border border-border rounded-xl hover:shadow-md transition-all duration-200 text-left group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${tile.bgColor}`}>
                          <IconComponent className={`h-6 w-6 ${tile.color}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                            {tile.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{tile.subtitle}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Logout Button */}
              <div className="space-y-4">
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  size="lg"
                  className="w-full flex items-center gap-2"
                >
                  <LogOut className="h-5 w-5" />
                  {t('profile.logout')}
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {activeView !== 'main' && activeView !== 'bookings' && (
        <div className="sticky top-0 z-10 bg-background border-b border-border">
          <div className="container mx-auto px-6 py-4">
            <button
              onClick={() => setActiveView('main')}
              className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t('profile.backToProfile')}
            </button>
          </div>
        </div>
      )}
      {renderContent()}
    </div>
  );
};

export default ProfileTiles;