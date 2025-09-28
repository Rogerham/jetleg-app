
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Filter, SlidersHorizontal, MapPin, Calendar, Users, Plane, ArrowLeft, X } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import EnhancedSearchWithSuggestions from '@/components/EnhancedSearchWithSuggestions';
import FlightCard from '@/components/FlightCard';
import FlightCardSkeleton from '@/components/FlightCardSkeleton';
import AdvancedSearchFilters from '@/components/AdvancedSearchFilters';
import SearchResultsSorting from '@/components/SearchResultsSorting';
import CustomDurationSlider from '@/components/CustomDurationSlider';
import { useOptimizedFlightSearch } from '@/hooks/useOptimizedFlightSearch';
import { SearchFilters, SortOptions } from '@/types/search';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCurrency } from '@/contexts/CurrencyContext';
import { parseDurationToHours } from '@/utils/durationUtils';

const OptimizedSearchResults = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { formatPrice } = useCurrency();
  
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

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [displayLimit, setDisplayLimit] = useState(20);

  // Use optimized search hook
  const { 
    data: flights, 
    isLoading, 
    error, 
    prefetchRelatedSearches,
    rawFlightsCount,
    filteredCount 
  } = useOptimizedFlightSearch(filters, sortOptions);

  // Progressive loading implementation
  const displayedFlights = flights.slice(0, displayLimit);
  const hasMoreFlights = flights.length > displayLimit;

  const loadMoreFlights = useCallback(() => {
    setDisplayLimit(prev => Math.min(prev + 20, flights.length));
  }, [flights.length]);

  // Prefetch related searches on mount
  useEffect(() => {
    prefetchRelatedSearches();
  }, [prefetchRelatedSearches]);

  // Update filters when URL changes
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      from: searchParams.get('from') || undefined,
      to: searchParams.get('to') || undefined,
      date: searchParams.get('date') || undefined,
      passengers: searchParams.get('passengers') || undefined,
    }));
  }, [searchParams]);

  // Scroll to load more flights
  useEffect(() => {
    const handleScroll = () => {
      if (
        hasMoreFlights &&
        !isLoading &&
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1000
      ) {
        loadMoreFlights();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMoreFlights, isLoading, loadMoreFlights]);

  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
    setDisplayLimit(20); // Reset display limit when filters change
  };

  const handleSortChange = (newSortOptions: SortOptions) => {
    setSortOptions(newSortOptions);
    setDisplayLimit(20); // Reset display limit when sorting changes
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

  const getSearchResultsTitle = () => {
    const fromText = filters.from === 'Alle luchthavens' ? t('search.allAirports') : filters.from;
    const toText = filters.to === 'Overal' ? t('search.everywhere') : filters.to;
    
    if (fromText && toText) {
      return t('search.searchResultsFromTo', { from: fromText, to: toText });
    }
    return t('search.searchResults');
  };

  const getDateDisplayText = () => {
    if (!filters.date) return t('search.allDates');
    
    const flexibleOptions: { [key: string]: string } = {
      'today': t('search.today'),
      'tomorrow': t('search.tomorrow'),
      'weekend': t('search.thisWeekend'),
      'next-week': t('search.nextWeek'),
      'next-month': t('search.nextMonth'),
      'flexible': t('search.flexibleDates'),
      'fully-flexible': t('search.flexibleDates')
    };
    
    return flexibleOptions[filters.date] || filters.date;
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <Plane className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {t('search.errorLoadingResults')}
            </h3>
            <p className="text-muted-foreground mb-4">
              {t('search.tryAgainLater')}
            </p>
            <Button onClick={() => window.location.reload()}>
              {t('common.tryAgain')}
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Enhanced Search Bar */}
      <div className="bg-primary text-white py-6">
        <div className="container mx-auto px-6">
          <EnhancedSearchWithSuggestions 
            className="max-w-none"
            initialValues={{
              from: filters.from || '',
              to: filters.to || '',
              date: filters.date || '',
              passengers: filters.passengers || '1'
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Results Header with Performance Info */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <h1 className="text-title text-foreground mb-2">
              {getSearchResultsTitle()}
            </h1>
            <p className="text-muted-foreground flex items-center gap-4 flex-wrap">
              <span className="hidden lg:flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {getDateDisplayText()}
              </span>
              <span className="hidden lg:flex items-center gap-1">
                <Users className="h-4 w-4" />
                {filters.passengers} {parseInt(filters.passengers || '1') === 1 ? t('search.passenger') : t('search.passengers')}
              </span>
              <Badge variant="secondary" className="font-medium">
                {isLoading ? t('search.searching') : t('search.resultsCount', { count: filteredCount })}
              </Badge>
              {rawFlightsCount !== filteredCount && (
                <Badge variant="outline" className="text-xs">
                  {t('search.filteredFrom', { total: rawFlightsCount })}
                </Badge>
              )}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="block lg:hidden">
              <Button 
                variant="outline" 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                {t('search.filters')}
              </Button>
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        <AdvancedSearchFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          onClearFilters={handleClearFilters}
        />

        {/* Mobile Filter Overlay */}
        {isFilterOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
            <div className="absolute inset-x-0 top-0 max-h-screen overflow-y-auto bg-background">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    {t('search.filters')}
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => setIsFilterOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <AdvancedSearchFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={handleClearFilters}
                />
              </div>
            </div>
          </div>
        )}

        {/* Sorting */}
        <SearchResultsSorting
          sortOptions={sortOptions}
          onSortChange={handleSortChange}
          resultsCount={filteredCount}
        />

        {/* Results */}
        <div className="space-y-6">
          {isLoading && displayedFlights.length === 0 ? (
            // Show skeletons while loading
            <>
              {Array.from({ length: 6 }).map((_, index) => (
                <FlightCardSkeleton key={index} />
              ))}
            </>
          ) : displayedFlights.length === 0 ? (
            <div className="text-center py-12">
              <Plane className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {t('search.noFlightsFound')}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t('search.tryAdjustingFilters')}
              </p>
              <Button onClick={handleClearFilters}>
                {t('search.clearAllFilters')}
              </Button>
            </div>
          ) : (
            <>
              {displayedFlights.map((flight) => (
                <FlightCard key={flight.id} {...flight} />
              ))}
              
              {/* Progressive Loading */}
              {hasMoreFlights && (
                <div className="text-center py-8">
                  <Button onClick={loadMoreFlights} variant="outline">
                    {isLoading ? (
                      <>
                        <Plane className="h-4 w-4 mr-2 animate-pulse" />
                        {t('search.loadingMore')}
                      </>
                    ) : (
                      t('search.loadMore', { remaining: flights.length - displayLimit })
                    )}
                  </Button>
                </div>
              )}
              
              {isLoading && displayedFlights.length > 0 && (
                // Show additional skeletons when loading more
                <>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <FlightCardSkeleton key={`loading-${index}`} />
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OptimizedSearchResults;
