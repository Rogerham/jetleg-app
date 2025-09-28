
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Loader2, X, Heart, Bell } from 'lucide-react';
import { toast } from 'sonner';
import { useEnhancedFlightSearch, SearchFilters, SortOptions } from '@/hooks/useEnhancedFlightSearch';
import HeroSection from '@/components/HeroSection';
import DealsSection from '@/components/DealsSection';
import FlightCard from '@/components/FlightCard';
import AdvancedSearchFilters from '@/components/AdvancedSearchFilters';
import SearchResultsSorting from '@/components/SearchResultsSorting';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Index = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Check if we have search parameters
  const hasSearchParams = searchParams.get('from') || searchParams.get('to') || searchParams.get('date');
  
  // Initialize filters from URL params
  const [filters, setFilters] = useState<SearchFilters>(() => ({
    from: searchParams.get('from') || undefined,
    to: searchParams.get('to') || undefined,
    date: searchParams.get('date') || undefined,
    passengers: searchParams.get('passengers') || undefined,
  }));

  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: 'departure_time',
    direction: 'asc'
  });

  // Update filters when URL params change
  useEffect(() => {
    const newFilters: SearchFilters = {
      from: searchParams.get('from') || undefined,
      to: searchParams.get('to') || undefined,
      date: searchParams.get('date') || undefined,
      passengers: searchParams.get('passengers') || undefined,
    };
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, [searchParams]);

  // Only search when we have search parameters
  const { data: flights = [], isLoading, error } = useEnhancedFlightSearch(
    filters, 
    sortOptions, 
    !!hasSearchParams
  );

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    const basicFilters: SearchFilters = {
      from: filters.from,
      to: filters.to,
      date: filters.date,
      passengers: filters.passengers,
    };
    setFilters(basicFilters);
  };

  const handleSortChange = (newSortOptions: SortOptions) => {
    setSortOptions(newSortOptions);
  };

  const handleClearSearch = () => {
    setSearchParams({});
    setFilters({});
  };

  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {hasSearchParams ? (
        // Search Results View
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{t('search.searchResults')}</h1>
              <p className="text-muted-foreground mb-4">
                {filters.from && filters.to 
                  ? t('search.searchingFromTo', { 
                      from: filters.from === 'Alle luchthavens' ? t('search.allAirports') : filters.from,
                      to: filters.to === 'Overal' ? t('search.everywhere') : filters.to
                    })
                  : t('search.searchingAllFlights')
                }
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    // Save search functionality
                    const searchQuery = `${filters.from || 'Alle luchthavens'} → ${filters.to || 'Overal'}`;
                    localStorage.setItem('favoriteSearches', JSON.stringify([
                      ...(JSON.parse(localStorage.getItem('favoriteSearches') || '[]')),
                      {
                        id: Date.now(),
                        from: filters.from,
                        to: filters.to,
                        date: filters.date,
                        passengers: filters.passengers,
                        displayText: searchQuery,
                        notifications: false,
                        createdAt: new Date().toISOString()
                      }
                    ]));
                    toast.success(t('search.searchSaved'));
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <Heart className="h-4 w-4" />
                  {t('search.saveSearch')}
                </button>
                <button
                  onClick={() => {
                    // Enable notifications functionality
                    toast.success(t('search.notificationsEnabled'));
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  <Bell className="h-4 w-4" />
                  {t('search.enableNotifications')}
                </button>
              </div>
            </div>
            <button
              onClick={handleClearSearch}
              className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors ml-4"
            >
              <X className="h-4 w-4" />
              Wissen
            </button>
          </div>

          <AdvancedSearchFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />

          {error ? (
            <Alert variant="destructive" className="my-8">
              <AlertDescription>
                {t('search.errorLoadingResults')}
              </AlertDescription>
            </Alert>
          ) : isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">{t('search.searchingFlights')}</span>
            </div>
          ) : (
            <>
              <SearchResultsSorting
                sortOptions={sortOptions}
                onSortChange={handleSortChange}
                resultsCount={flights.length}
              />

              {flights.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">{t('search.noFlightsFound')}</h3>
                  <p className="text-muted-foreground mb-4">{t('search.tryAdjustingFilters')}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {flights.map((flight) => (
                    <FlightCard key={flight.id} {...flight} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        // Default Home View with Deals
        <DealsSection />
      )}
    </div>
  );
};

export default Index;
