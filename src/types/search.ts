// Search related types and interfaces
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