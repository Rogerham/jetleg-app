
import { Suspense, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { navItems } from "./nav-items";
import BottomNavigation from "./components/BottomNavigation";
import ScrollToTop from "./components/ScrollToTop";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import { AuthProvider } from "./contexts/AuthContext";

import BookingFlow from "./pages/BookingFlow";
import "./i18n/config";

const queryClient = new QueryClient();

const App = () => {
  const [toastOffset, setToastOffset] = useState(64);

  useEffect(() => {
    const updateToastOffset = () => {
      const navHeight = getComputedStyle(document.documentElement)
        .getPropertyValue("--bottom-nav-height");
      if (navHeight) {
        const height = parseInt(navHeight);
        if (!isNaN(height) && height > 0) {
          setToastOffset(height);
        }
      }
    };

    // Custom event listener for navigation height changes
    window.addEventListener("bottom-nav-height-changed", updateToastOffset);

    // Initial update with a small delay to ensure BottomNavigation has mounted
    const timeoutId = setTimeout(updateToastOffset, 100);

    return () => {
      window.removeEventListener("bottom-nav-height-changed", updateToastOffset);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CurrencyProvider>
        <TooltipProvider>
          <Toaster 
            position="bottom-center" 
            offset={toastOffset}
            toastOptions={{
              classNames: {
                toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg [&]:z-[9998]",
                description: "group-[.toast]:text-muted-foreground",
                actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
              },
            }}
          />
          <BrowserRouter>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col">
              <main className="flex-1 pb-16">
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    {navItems.map(({ to, page }) => (
                      <Route key={to} path={to} element={page} />
                    ))}
                    
                    {/* Consolidated booking routes - all point to BookingFlow */}
                    <Route path="/booking/:id" element={<BookingFlow />} />
                    <Route path="/booking/:flightId" element={<BookingFlow />} />
                    <Route path="/booking-flow/:flightId" element={<BookingFlow />} />
                  </Routes>
                </Suspense>
              </main>
            </div>
            <BottomNavigation />
          </BrowserRouter>
        </TooltipProvider>
      </CurrencyProvider>
    </AuthProvider>
  </QueryClientProvider>
  );
};

export default App;
