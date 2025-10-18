import { Home, Search, DollarSign, User, Plane, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";

const BottomNavigation = () => {
  const location = useLocation();
  const { t } = useTranslation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    {
      path: "/",
      icon: Search,
      label: t("nav.search"),
    },
    {
      path: "/top-deals",
      icon: DollarSign,
      label: t("nav.deals"),
    },
    {
      path: "/favorites",
      icon: Heart,
      label: t("nav.favorites"),
    },
    {
      path: "/profile",
      icon: User,
      label: t("nav.profile"),
    },
  ];

  const navigationContent = (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border z-[99999] supports-[backdrop-filter]:bg-card/60"
      style={{
        paddingBottom: "max(10px, env(safe-area-inset-bottom))",
      }}
    >
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-colors ${
                active ? "text-accent" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 mb-1 ${active ? "text-accent" : ""}`} />
              <span className={`text-xs font-medium truncate ${active ? "text-accent" : ""}`}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );

  return typeof document !== "undefined" ? createPortal(navigationContent, document.body) : null;
};

export default BottomNavigation;
