import { useState } from 'react';
import { Plane, User, Heart, Settings, CreditCard, HelpCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import MyBookings from './MyBookings';
import EditProfile from './EditProfile';
import FavoriteFlights from './FavoriteFlights';
import AppSettings from './AppSettings';
import PaymentDetails from './PaymentDetails';
import HelpSupport from './HelpSupport';

type TileView = 'main' | 'bookings' | 'edit-profile' | 'favorites' | 'settings' | 'payment' | 'help';

const ProfileTiles = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<TileView>('main');

  const tiles = [
    {
      id: 'bookings',
      title: 'Mijn boekingen',
      subtitle: 'Bekijk je geboekte vluchten',
      icon: Plane,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      id: 'edit-profile',
      title: 'Profiel wijzigen',
      subtitle: 'Bewerk je persoonlijke gegevens',
      icon: User,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'favorites',
      title: 'Favoriete vluchten',
      subtitle: 'Beheer je opgeslagen zoekopdrachten',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      id: 'settings',
      title: 'App instellingen',
      subtitle: 'Notificaties, taal en valuta',
      icon: Settings,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50'
    },
    {
      id: 'payment',
      title: 'Betaalgegevens',
      subtitle: 'Beheer je opgeslagen betaalmethoden',
      icon: CreditCard,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'help',
      title: 'Help & ondersteuning',
      subtitle: 'Veelgestelde vragen en contact',
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
      case 'favorites':
        return <FavoriteFlights onBack={() => setActiveView('main')} />;
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
                <h1 className="text-3xl font-bold text-foreground mb-2">Mijn Profiel</h1>
                <p className="text-muted-foreground">Welkom, {user?.user_metadata?.first_name || user?.email}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              Terug naar profiel
            </button>
          </div>
        </div>
      )}
      {renderContent()}
    </div>
  );
};

export default ProfileTiles;