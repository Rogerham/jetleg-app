import { Home, Search, DollarSign, User, Plane, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BottomNavigation = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    {
      path: '/',
      icon: Search,
      label: 'Zoeken',
    },
    {
      path: '/top-deals',
      icon: DollarSign,
      label: 'Deals',
    },
    {
      path: '/favorites',
      icon: Heart,
      label: 'Favorieten',
    },
    {
      path: '/profile',
      icon: User,
      label: 'Profiel',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 pb-safe">
      <div className="flex justify-around items-center h-16 px-2 pb-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-colors ${
                active 
                  ? 'text-accent' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className={`h-5 w-5 mb-1 ${active ? 'text-accent' : ''}`} />
              <span className={`text-xs font-medium truncate ${active ? 'text-accent' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;