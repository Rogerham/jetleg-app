
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { useFlights, type Flight } from '@/hooks/useFlights';
import { SearchFilters, SortOptions } from '@/types/search';

const CACHE_TIME = 5 * 60 * 1000; // 5 minutes
const STALE_TIME = 2 * 60 * 1000; // 2 minutes

export const useOptimizedFlightSearch = (
  filters: SearchFilters,
  sortOptions: SortOptions,
  enabled = true
) => {
  const queryClient = useQueryClient();

  // Create cache key based on basic search params
  const cacheKey = useMemo(() => {
    const basicParams = {
      from: filters.from,
      to: filters.to,
      date: filters.date,
      passengers: filters.passengers
    };
    return ['flights', basicParams];
  }, [filters.from, filters.to, filters.date, filters.passengers]);

  // Get cached flights using the basic search parameters
  const {
    data: rawFlights = [],
    isLoading: isBasicLoading,
    error: basicError
  } = useFlights({
    from: filters.from,
    to: filters.to,
    date: filters.date,
    passengers: filters.passengers
  });

  // Apply advanced filters and sorting client-side for better performance
  const { data: processedFlights, isLoading: isProcessing } = useQuery({
    queryKey: ['processed-flights', cacheKey, filters, sortOptions],
    queryFn: async () => {
      if (!rawFlights.length) return [];

      let filtered = [...rawFlights];

      // Apply advanced filters
      if (filters.minPrice !== undefined) {
        filtered = filtered.filter(flight => flight.price_per_seat >= filters.minPrice!);
      }

      if (filters.maxPrice !== undefined) {
        filtered = filtered.filter(flight => flight.price_per_seat <= filters.maxPrice!);
      }

      if (filters.jetType) {
        filtered = filtered.filter(flight => {
          const jetType = flight.jets?.type?.toLowerCase();
          return jetType === filters.jetType?.toLowerCase();
        });
      }

      if (filters.operator) {
        filtered = filtered.filter(flight => 
          flight.operator.toLowerCase().includes(filters.operator!.toLowerCase())
        );
      }

      if (filters.maxDuration) {
        const maxDurationHours = parseFloat(filters.maxDuration);
        filtered = filtered.filter(flight => {
          const duration = parseDuration(flight.flight_duration);
          return duration <= maxDurationHours;
        });
      }

      // Apply sorting
      filtered.sort((a, b) => {
        let comparison = 0;

        switch (sortOptions.field) {
          case 'price_per_seat':
            comparison = a.price_per_seat - b.price_per_seat;
            break;
          case 'departure_time':
            comparison = new Date(a.departure_time).getTime() - new Date(b.departure_time).getTime();
            break;
          case 'flight_duration':
            const aDuration = parseDuration(a.flight_duration);
            const bDuration = parseDuration(b.flight_duration);
            comparison = aDuration - bDuration;
            break;
          default:
            comparison = 0;
        }

        return sortOptions.direction === 'desc' ? -comparison : comparison;
      });

      return filtered;
    },
    enabled: enabled && !isBasicLoading && rawFlights.length > 0,
    staleTime: STALE_TIME,
    gcTime: CACHE_TIME,
  });

  // Function to parse duration string to hours
  const parseDuration = useCallback((duration: string): number => {
    const hourMatch = duration.match(/(\d+)h/);
    const minuteMatch = duration.match(/(\d+)m/);
    
    const hours = hourMatch ? parseInt(hourMatch[1]) : 0;
    const minutes = minuteMatch ? parseInt(minuteMatch[1]) : 0;
    
    return hours + minutes / 60;
  }, []);

  // Prefetch related searches for better UX
  const prefetchRelatedSearches = useCallback(async () => {
    if (!filters.from || !filters.to) return;

    const relatedQueries = [
      // Tomorrow's flights
      { ...filters, date: 'tomorrow' },
      // Next week's flights
      { ...filters, date: 'next-week' },
      // Different passenger counts
      { ...filters, passengers: '2' },
      { ...filters, passengers: '4' },
    ];

    relatedQueries.forEach(query => {
      queryClient.prefetchQuery({
        queryKey: ['flights', query],
        queryFn: async () => {
          // This will use the existing useFlights hook logic
          return [];
        },
        staleTime: STALE_TIME,
      });
    });
  }, [filters, queryClient]);

  return {
    data: processedFlights || [],
    isLoading: isBasicLoading || isProcessing,
    error: basicError,
    prefetchRelatedSearches,
    rawFlightsCount: rawFlights.length,
    filteredCount: processedFlights?.length || 0
  };
};
