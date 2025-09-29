import { useQuery } from '@tanstack/react-query';
import { extendedWorldwideAirports, type Airport } from '@/data/extendedAirports';

interface SearchSuggestion {
  value: string;
  label: string;
  type: 'airport' | 'city' | 'special' | 'popular';
  frequency?: number;
}

const POPULAR_ROUTES = [
  // Europe routes
  { from: 'London (LGW)', to: 'Paris (CDG)', frequency: 150 },
  { from: 'Amsterdam (AMS)', to: 'Barcelona (BCN)', frequency: 120 },
  { from: 'Frankfurt (FRA)', to: 'Rome (FCO)', frequency: 100 },
  { from: 'Brussels (BRU)', to: 'Milan (MXP)', frequency: 90 },
  { from: 'Zurich (ZUR)', to: 'Nice (NCE)', frequency: 80 },
  
  // Transatlantic routes
  { from: 'London (LHR)', to: 'New York (JFK)', frequency: 200 },
  { from: 'Paris (CDG)', to: 'Los Angeles (LAX)', frequency: 180 },
  { from: 'Amsterdam (AMS)', to: 'Miami (MIA)', frequency: 160 },
  { from: 'Frankfurt (FRA)', to: 'Chicago (ORD)', frequency: 140 },
  { from: 'New York (JFK)', to: 'London (LHR)', frequency: 190 },
  
  // Europe to Middle East
  { from: 'London (LHR)', to: 'Dubai (DXB)', frequency: 170 },
  { from: 'Paris (CDG)', to: 'Abu Dhabi (AUH)', frequency: 130 },
  { from: 'Frankfurt (FRA)', to: 'Dubai (DXB)', frequency: 125 },
  { from: 'Dubai (DXB)', to: 'London (LHR)', frequency: 165 },
  
  // US domestic
  { from: 'New York (JFK)', to: 'Los Angeles (LAX)', frequency: 110 },
  { from: 'Los Angeles (LAX)', to: 'Miami (MIA)', frequency: 95 },
  { from: 'Chicago (ORD)', to: 'San Francisco (SFO)', frequency: 85 },
  
  // Remaining European routes
  { from: 'Vienna (VIE)', to: 'London (LGW)', frequency: 75 },
  { from: 'Munich (MUC)', to: 'Barcelona (BCN)', frequency: 70 }
];

export const useSearchSuggestions = (query: string, field: 'from' | 'to') => {
  return useQuery({
    queryKey: ['search-suggestions', query, field],
    queryFn: async (): Promise<SearchSuggestion[]> => {
      if (query.length < 2) return [];

      const suggestions: SearchSuggestion[] = [];
      const queryLower = query.toLowerCase();

      // Add special options first
      if (field === 'from' && 'alle luchthavens'.includes(queryLower)) {
        suggestions.push({
          value: 'Alle luchthavens',
          label: 'Alle luchthavens',
          type: 'special'
        });
      }
      
      if (field === 'to' && 'overal'.includes(queryLower)) {
        suggestions.push({
          value: 'Overal',
          label: 'Overal - Any destination',
          type: 'special'
        });
      }

      // Add airport matches with enhanced matching
      const airportMatches = extendedWorldwideAirports
        .filter(airport => {
          const searchTerms = [
            airport.name.toLowerCase(),
            airport.city.toLowerCase(), 
            airport.code.toLowerCase(),
            airport.country.toLowerCase(),
            ...(airport.aliases || []).map(alias => alias.toLowerCase())
          ];
          return searchTerms.some(term => term.includes(queryLower));
        })
        .slice(0, 6)
        .map(airport => ({
          value: `${airport.city} (${airport.code})`,
          label: `${airport.city} (${airport.code}) - ${airport.name}, ${airport.country}`,
          type: 'airport' as const
        }));

      suggestions.push(...airportMatches);

      // Add popular route suggestions
      const routeMatches = POPULAR_ROUTES
        .filter(route => {
          const location = field === 'from' ? route.from : route.to;
          return location.toLowerCase().includes(queryLower) && 
                 !suggestions.some(s => s.value === location);
        })
        .slice(0, 3)
        .map(route => ({
          value: field === 'from' ? route.from : route.to,
          label: `${field === 'from' ? route.from : route.to} (Popular route)`,
          type: 'popular' as const,
          frequency: route.frequency
        }));

      suggestions.push(...routeMatches);

      // Sort by relevance
      return suggestions
        .sort((a, b) => {
          // Special options first
          if (a.type === 'special' && b.type !== 'special') return -1;
          if (b.type === 'special' && a.type !== 'special') return 1;
          
          // Then popular routes
          if (a.type === 'popular' && b.type !== 'popular') return -1;
          if (b.type === 'popular' && a.type !== 'popular') return 1;
          
          // Then by frequency if both are popular
          if (a.type === 'popular' && b.type === 'popular') {
            return (b.frequency || 0) - (a.frequency || 0);
          }
          
          // Finally alphabetical
          return a.label.localeCompare(b.label);
        })
        .slice(0, 8);
    },
    enabled: query.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to get trending searches
export const useTrendingSearches = () => {
  return useQuery({
    queryKey: ['trending-searches'],
    queryFn: async () => {
      // In a real app, this would fetch from analytics
      return POPULAR_ROUTES
        .sort((a, b) => b.frequency - a.frequency)
        .slice(0, 6)
        .map(route => ({
          from: route.from,
          to: route.to,
          label: `${route.from} → ${route.to}`,
          frequency: route.frequency
        }));
    },
    staleTime: 30 * 60 * 1000, // 30 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
  });
};