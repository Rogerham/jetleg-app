
import { useQuery } from '@tanstack/react-query';
import { useAllFlights } from './useFlights';
import { groupFlightsByDestination } from '@/utils/destinationUtils';
import { DestinationDeal } from '@/types/destinationDeals';

export const useDestinationDeals = () => {
  // Use ALL flights (not deduplicated) to get accurate counts for destination deals
  const { data: flights = [], isLoading: flightsLoading, error: flightsError } = useAllFlights();

  const query = useQuery({
    queryKey: ['destination-deals', flights.length],
    queryFn: async (): Promise<DestinationDeal[]> => {
      if (flights.length === 0) {
        console.log('No flights available for destination deals');
        return [];
      }
      
      console.log(`Processing ${flights.length} flights for destination deals`);
      const destinationDeals = groupFlightsByDestination(flights);
      console.log(`Generated ${destinationDeals.length} destination deals from ${flights.length} flights`);
      
      return destinationDeals;
    },
    enabled: !flightsLoading && flights.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });

  // Return combined loading state - loading if either flights or deals are loading
  return {
    ...query,
    isLoading: flightsLoading || query.isLoading,
    error: flightsError || query.error
  };
};
