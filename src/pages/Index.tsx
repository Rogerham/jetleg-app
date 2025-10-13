
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SlidersHorizontal, MapPin, Clock, Users, Plane, Star, ArrowLeft, Calendar } from 'lucide-react';

// Component Imports
import SearchWithSuggestions from '@/components/SearchWithSuggestions';
import ActiveFilters from '@/components/ActiveFilters';
import HeroSection from '@/components/HeroSection';
import DealsSection from '@/components/DealsSection';
import SaveSearchButton from '@/components/SaveSearchButton';
import FilterDialog from '@/components/FilterDialog';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

// Hook & Context Imports
import { useFlights, type Flight } from '@/hooks/useFlights';
import { parseDurationToHours } from '@/utils/durationUtils';
import { useCurrency } from '@/contexts/CurrencyContext';


const Index = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [sortBy, setSortBy] = useState('price');
  const { formatPrice } = useCurrency();
  
  // Check if we have search parameters
  const hasSearchParams = searchParams.get('from') || searchParams.get('to') || searchParams.get('date');
  
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 10000,
    minPassengers: 1,
    maxPassengers: 20,
    minDuration: 0.5,
    maxDuration: 20,
    aircraft: '',
    timeOfDay: 'any'
  });
  
  const searchData = {
    from: searchParams.get('from') || '',
    to: searchParams.get('to') || '',
    date: searchParams.get('date') || '',
    passengers: searchParams.get('passengers') || '1',
    filters
  };

  const { data: flights = [], isLoading, error } = useFlights(searchData);

  useEffect(() => {
    let filtered = [...flights];

    // Apply filters
    filtered = filtered.filter(flight => {
      if (flight.price_per_seat < filters.minPrice || flight.price_per_seat > filters.maxPrice) return false;
      if (flight.available_seats < filters.minPassengers) return false;
      
      const jetCapacity = flight.jets?.seating_capacity || 8;
      if (jetCapacity > filters.maxPassengers) return false;

      const flightDurationHours = parseDurationToHours(flight.flight_duration);
      if (flightDurationHours < filters.minDuration || flightDurationHours > filters.maxDuration) return false;

      if (filters.aircraft) {
        const aircraftName = flight.jets ? `${flight.jets.brand} ${flight.jets.model}` : 'Private Jet';
        if (!aircraftName.toLowerCase().includes(filters.aircraft.toLowerCase())) return false;
      }

      if (filters.timeOfDay !== 'any') {
        const hour = new Date(flight.departure_time).getHours();
        if (filters.timeOfDay === 'morning' && (hour < 6 || hour >= 12)) return false;
        if (filters.timeOfDay === 'afternoon' && (hour < 12 || hour >= 18)) return false;
        if (filters.timeOfDay === 'evening' && (hour < 18 || hour >= 24)) return false;
      }
      return true;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price_per_seat - b.price_per_seat;
        case 'duration':
          return parseDurationToHours(a.flight_duration) - parseDurationToHours(b.flight_duration);
        case 'departure':
          return new Date(a.departure_time).getTime() - new Date(b.departure_time).getTime();
        default:
          return 0;
      }
    });
    setFilteredFlights(filtered);
  }, [flights, filters, sortBy]);

  const handleApplyFilters = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleRemoveFilter = (key: string) => {
    const defaultFilters = {
      minPrice: 0, maxPrice: 10000, minPassengers: 1, maxPassengers: 20,
      minDuration: 0.5, maxDuration: 20, aircraft: '', timeOfDay: 'any'
    };
    setFilters(prev => ({ ...prev, [key]: defaultFilters[key as keyof typeof defaultFilters] }));
  };

  const handleClearAllFilters = () => {
    setFilters({
      minPrice: 0, maxPrice: 10000, minPassengers: 1, maxPassengers: 20,
      minDuration: 0.5, maxDuration: 20, aircraft: '', timeOfDay: 'any'
    });
  };

  const handleClearSearch = () => {
    setSearchParams({});
  };

  const formatTime = (dateString: string) => new Date(dateString).toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
  const extractAirportCode = (airport: string) => (airport.match(/\(([^)]+)\)/) || [])[1] || airport.slice(-3);
  
  const getSearchResultsTitle = () => {
    const fromText = searchData.from || 'Alle luchthavens';
    const toText = searchData.to === 'Overal' ? 'alle bestemmingen' : searchData.to || 'alle bestemmingen';
    return (
      <>
        Vluchten van <span className="text-accent">{fromText}</span> naar <span className="text-accent">{toText}</span>
      </>
    );
  };
  
  const getDateDisplayText = () => {
    if (!searchData.date) return 'Alle data';
    const flexibleOptions: { [key: string]: string } = {
      'weekend': 'Dit weekend', 'next-week': 'Volgende week', 'next-month': 'Volgende maand',
      'fully-flexible': 'Flexibele data'
    };
    return flexibleOptions[searchData.date] || new Date(searchData.date).toLocaleDateString('nl-NL');
  };

  const getImageUrl = (flight: Flight) => flight.jets?.image_url || '/src/assets/jet-interior.jpg';

  if (isLoading) return (
    <div className="min-h-screen">
      <HeroSection />
      <div className="bg-background flex flex-col items-center justify-center text-center p-4 py-16">
        <Plane className="h-16 w-16 text-accent mx-auto mb-4 animate-pulse" />
        <h3 className="text-xl font-semibold text-foreground mb-2">Vluchten zoeken...</h3>
        <p className="text-muted-foreground">We zoeken de beste beschikbare vluchten voor je.</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen">
      <HeroSection />
      <div className="bg-background flex flex-col items-center justify-center text-center p-4 py-16">
        <Plane className="h-16 w-16 text-destructive mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-foreground mb-2">Er is een fout opgetreden</h3>
        <p className="text-muted-foreground mb-4">We konden geen vluchten laden. Probeer het opnieuw.</p>
        <button onClick={() => window.location.reload()} className="btn-jetleg-primary">Opnieuw proberen</button>
      </div>
    </div>
  );

  return (
    <TooltipProvider>
      <div className="min-h-screen">
        <HeroSection />
        
        {hasSearchParams ? (
          // Search Results View - gebaseerd op SearchResults.tsx
          <>

            <div className="container mx-auto px-6 py-8">
              <div className="flex flex-col gap-4 mb-8">
                <h1 className="text-title text-foreground">
                  {getSearchResultsTitle()}
                </h1>

                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="hidden lg:inline-flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {getDateDisplayText()}
                    </span>
                    <span className="hidden lg:inline-flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {searchData.passengers} {parseInt(searchData.passengers) === 1 ? 'passagier' : 'passagiers'}
                    </span>
                    <span className="font-medium text-muted-foreground">
                      {filteredFlights.length} beschikbare vluchten
                    </span>
                    <div className="flex items-center gap-1">
                      <SaveSearchButton 
                        searchCriteria={{
                          from: searchData.from,
                          to: searchData.to,
                          date: searchData.date,
                          passengers: searchData.passengers,
                          filters
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full lg:w-auto gap-4">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsFilterDialogOpen(true)} 
                      className="flex items-center gap-2"
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                      Filters
                    </Button>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground whitespace-nowrap">Sorteer:</span>
                      <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-3 py-2 border border-border rounded-lg bg-card text-foreground focus:ring-2 focus:ring-accent/20">
                        <option value="price">Prijs (oplopend)</option>
                        <option value="duration">Vliegduur</option>
                        <option value="departure">Vertrektijd</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <ActiveFilters filters={filters} onRemoveFilter={handleRemoveFilter} onClearAll={handleClearAllFilters} />

              <FilterDialog
                open={isFilterDialogOpen}
                onOpenChange={setIsFilterDialogOpen}
                filters={filters}
                onApplyFilters={handleApplyFilters}
                onClearFilters={handleClearAllFilters}
              />

              <div className="grid grid-cols-1 gap-8">
                <div>
                  {filteredFlights.length === 0 ? (
                    <div className="text-center py-12">
                      <Plane className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-foreground mb-2">Geen vluchten gevonden</h3>
                      <p className="text-muted-foreground mb-4">Probeer je zoekcriteria aan te passen of kies andere filters.</p>
                      <button onClick={handleClearAllFilters} className="btn-jetleg-primary">Reset filters</button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {filteredFlights.map(flight => (
                        <div 
                          key={flight.id} 
                          className="card-jetleg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
                          onClick={() => navigate(`/flight-details/${flight.id}`, { 
                            state: { 
                              flight, 
                              searchData: {
                                from: searchData.from,
                                to: searchData.to,
                                date: searchData.date,
                                passengers: searchData.passengers
                              }
                            } 
                          })}
                        >
                          <div className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                              <div className="lg:col-span-2">
                                <div className="flex items-center gap-4 mb-3">
                                  <div className="text-center">
                                    <div className="text-xl font-bold text-foreground">{formatTime(flight.departure_time)}</div>
                                    <div className="text-sm text-muted-foreground">{extractAirportCode(flight.departure_airport)}</div>
                                  </div>
                                  <div className="flex-1 relative">
                                    <div className="border-t border-dashed border-border"></div>
                                    <div className="absolute top-[-8px] left-1/2 transform -translate-x-1/2 bg-background px-2"><Plane className="h-4 w-4 text-accent" /></div>
                                    <div className="text-center text-xs text-muted-foreground mt-1">{flight.flight_duration}</div>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-xl font-bold text-foreground">{formatTime(flight.arrival_time)}</div>
                                    <div className="text-sm text-muted-foreground">{extractAirportCode(flight.arrival_airport)}</div>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <div className="font-medium text-foreground mb-1">{flight.departure_airport.split('(')[0].trim()} → {flight.arrival_airport.split('(')[0].trim()}</div>
                                <div className="text-xs text-muted-foreground">{new Date(flight.departure_time).toLocaleDateString('nl-NL', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}</div>
                                <div className="text-xs text-muted-foreground mt-1">{flight.available_seats} beschikbare plaatsen</div>
                                <div className="text-xs text-muted-foreground">Door {flight.operator}</div>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-2xl font-bold text-foreground">{formatPrice(flight.price_per_seat)}</div>
                                  <div className="text-xs text-muted-foreground">per persoon</div>
                                </div>
                                <button 
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(`/flight-details/${flight.id}`, {
                                      state: {
                                        flight,
                                        searchData: {
                                          from: searchData.from,
                                          to: searchData.to,
                                          date: searchData.date,
                                          passengers: searchData.passengers
                                        }
                                      }
                                    });
                                  }}
                                  className="btn-jetleg-primary ml-4"
                                >
                                  Meer details
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          // Default Home View with Deals
          <DealsSection />
        )}
      </div>
    </TooltipProvider>
  );
};

export default Index;
