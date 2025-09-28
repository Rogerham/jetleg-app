
import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Loader2 } from 'lucide-react';
import { useFlights, type Flight } from '@/hooks/useFlights';
import { SearchFilters, SortOptions } from '@/types/search';
import FlightCard from '@/components/FlightCard';
import AdvancedSearchFilters from '@/components/AdvancedSearchFilters';
import SearchResultsSorting from '@/components/SearchResultsSorting';
import { Alert, AlertDescription } from '@/components/ui/alert';

const EnhancedSearchResults = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  
  // Initialize filters from URL params and location state
  const [filters, setFilters] = useState<SearchFilters>(() => {
    const initialFilters: SearchFilters = {
      from: searchParams.get('from') || undefined,
      to: searchParams.get('to') || undefined,
      date: searchParams.get('date') || undefined,
      passengers: searchParams.get('passengers') || undefined,
    };

    // Add any additional filters from location state
    const stateFilters = location.state?.searchParams;
    if (stateFilters) {
      return { ...initialFilters, ...stateFilters };
    }

    return initialFilters;
  });

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

    // Preserve advanced filters but update basic search params
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  }, [searchParams]);

  const { data: flights = [], isLoading, error } = useFlights(filters);

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

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>
            {t('search.errorLoadingResults')}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t('search.searchResults')}</h1>
        <p className="text-muted-foreground">
          {filters.from && filters.to 
            ? t('search.searchingFromTo', { 
                from: filters.from === 'Alle luchthavens' ? t('search.allAirports') : filters.from,
                to: filters.to === 'Overal' ? t('search.everywhere') : filters.to
              })
            : t('search.searchingAllFlights')
          }
        </p>
      </div>

      <AdvancedSearchFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
      />

      {isLoading ? (
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
  );
};

export default EnhancedSearchResults;
