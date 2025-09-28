
import { useQuery } from '@tanstack/react-query';
// Backward compatibility - gebruik de nieuwe modulaire architectuur onder de motorkap
import { FlightController } from '../backend/controllers/flight.controller';
import { FlightValidator } from '../backend/validators/flight.validator';

export interface SearchFilters {
  from?: string;
  to?: string;
  date?: string;
  passengers?: string;
  minPrice?: number;
  maxPrice?: number;
  jetType?: string;
  operator?: string;
  maxDuration?: string;
}

export interface SortOptions {
  field: 'price_per_seat' | 'departure_time' | 'flight_duration';
  direction: 'asc' | 'desc';
}

// Migratie: Deze hook gebruikt nu de nieuwe backend architectuur
const flightController = new FlightController();

export const useEnhancedFlightSearch = (
  filters: SearchFilters,
  sortOptions: SortOptions = { field: 'departure_time', direction: 'asc' },
  enabled: boolean = true
) => {
  return useQuery({
    queryKey: ['enhanced-flight-search', filters, sortOptions],
    queryFn: async () => {
      console.log('Using migrated enhanced flight search with new architecture');
      
      // Convert old filter format to new backend models
      const searchParams = {
        from: filters.from,
        to: filters.to,
        date: filters.date,
        passengers: filters.passengers
      };
      
      const flightFilters = {
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
        jetType: filters.jetType,
        operator: filters.operator,
        maxDuration: filters.maxDuration
      };

      // Use new controller architecture
      const result = await flightController.handleFlightSearch(
        searchParams, 
        flightFilters, 
        sortOptions
      );

      if (!result.success) {
        throw new Error(result.error || 'Search failed');
      }

      // Return flights in the expected format for backward compatibility
      return result.data?.flights || [];
    },
    enabled,
    staleTime: 30000, // Cache for 30 seconds
  });
};
