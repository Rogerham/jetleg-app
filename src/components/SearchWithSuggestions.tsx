import { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Users, Plane, ArrowLeftRight, X } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { extendedWorldwideAirports, type Airport } from '@/data/extendedAirports';
import PassengerCounter from './PassengerCounter';
import EnhancedDatePicker from './EnhancedDatePicker';
import { toast } from 'sonner';

interface SearchWithSuggestionsProps {
  className?: string;
  initialValues?: {
    from?: string;
    to?: string;
    date?: string;
    passengers?: string;
  };
}

const SearchWithSuggestions = ({
  className = '',
  initialValues
}: SearchWithSuggestionsProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Check if we have active search parameters
  const hasSearchParams = searchParams.get('from') || searchParams.get('to') || searchParams.get('date');
  const [searchData, setSearchData] = useState({
    from: initialValues?.from || '',
    to: initialValues?.to || '',
    date: initialValues?.date || '',
    passengers: initialValues?.passengers || '1'
  });
  const [suggestions, setSuggestions] = useState<{
    from: Airport[];
    to: Airport[];
  }>({
    from: [],
    to: []
  });
  const [activeSuggestion, setActiveSuggestion] = useState<{
    field: 'from' | 'to' | null;
  }>({
    field: null
  });
  const fromInputRef = useRef<HTMLInputElement>(null);
  const toInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setActiveSuggestion({
          field: null
        });
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (initialValues) {
      setSearchData({
        from: initialValues.from || '',
        to: initialValues.to || '',
        date: initialValues.date || '',
        passengers: initialValues.passengers || '1'
      });
    }
  }, [initialValues?.from, initialValues?.to, initialValues?.date, initialValues?.passengers]);

  const handleInputChange = (field: string, value: string) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
    if (field === 'from' || field === 'to') {
      if (value.length > 0 && value !== 'Overal') {
        const filtered = extendedWorldwideAirports.filter(airport => {
          const searchTerms = [
            airport.name.toLowerCase(),
            airport.city.toLowerCase(), 
            airport.code.toLowerCase(),
            airport.country.toLowerCase(),
            ...(airport.aliases || []).map(alias => alias.toLowerCase())
          ];
          return searchTerms.some(term => term.includes(value.toLowerCase()));
        });
        setSuggestions(prev => ({
          ...prev,
          [field]: filtered.slice(0, 8)
        }));
        setActiveSuggestion({
          field: field as 'from' | 'to'
        });
      } else {
        setSuggestions(prev => ({
          ...prev,
          [field]: []
        }));
        if (value !== 'Overal') {
          setActiveSuggestion({
            field: null
          });
        }
      }
    }
  };

  const handlePassengerChange = (value: number) => {
    setSearchData(prev => ({
      ...prev,
      passengers: value.toString()
    }));
  };

  const handleInputFocus = (field: 'from' | 'to') => {
    const value = searchData[field];
    if (value.length > 0 && value !== 'Overal') {
      const filtered = extendedWorldwideAirports.filter(airport => {
        const searchTerms = [
          airport.name.toLowerCase(),
          airport.city.toLowerCase(), 
          airport.code.toLowerCase(),
          airport.country.toLowerCase(),
          ...(airport.aliases || []).map(alias => alias.toLowerCase())
        ];
        return searchTerms.some(term => term.includes(value.toLowerCase()));
      });
      setSuggestions(prev => ({
        ...prev,
        [field]: filtered.slice(0, 8)
      }));
    }
    setActiveSuggestion({
      field
    });
  };

  const handleSuggestionClick = (field: 'from' | 'to', airport: Airport) => {
    const airportText = `${airport.city} (${airport.code})`;
    setSearchData(prev => ({
      ...prev,
      [field]: airportText
    }));
    setActiveSuggestion({
      field: null
    });
    setSuggestions(prev => ({
      ...prev,
      [field]: []
    }));
    if (field === 'from' && toInputRef.current) {
      toInputRef.current.focus();
    }
  };

  const handleEverywhere = () => {
    setSearchData(prev => ({
      ...prev,
      to: 'Overal'
    }));
    setActiveSuggestion({
      field: null
    });
    setSuggestions(prev => ({
      ...prev,
      to: []
    }));
  };

  const handleSwapLocations = () => {
    setSearchData(prev => ({
      ...prev,
      from: prev.to === 'Overal' ? '' : prev.to,
      to: prev.from
    }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchData.from) {
        toast.error("Vul een vertreklocatie in.");
        return;
    }
    if (!searchData.to) {
        toast.error("Vul een bestemming in.");
        return;
    }
    if (!searchData.date) {
        toast.error("Kies een datum.");
        return;
    }
    
    const searchParams = new URLSearchParams({
      from: searchData.from,
      to: searchData.to,
      date: searchData.date,
      passengers: searchData.passengers
    });
    navigate(`/?${searchParams.toString()}`, { replace: true });
  };

  const handleClearSearch = () => {
    setSearchData({
      from: '',
      to: '',
      date: '',
      passengers: '1'
    });
    navigate('/', { replace: true });
  };

  return (
    <div className={`search-form-jetleg max-w-6xl mx-auto animate-fade-in ${className}`} ref={suggestionsRef}>
      <form onSubmit={handleSearch} className="space-y-6">
        {/* Mobile Layout */}
        <div className="lg:hidden space-y-6">
          {/* From and To Fields Row */}
          <div className="space-y-4">
            {/* From Field */}
            <div className="relative">
              <label htmlFor="from" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Van
              </label>
              <input ref={fromInputRef} type="text" id="from" value={searchData.from} onChange={e => handleInputChange('from', e.target.value)} onFocus={() => handleInputFocus('from')} placeholder="vertrek locatie" className="input-jetleg h-14 w-full" />
              
              {activeSuggestion.field === 'from' && suggestions.from.length > 0 && <div className="absolute top-full left-0 right-0 bg-white border border-border rounded-xl mt-1 shadow-lg z-50 max-h-64 overflow-y-auto">
                  {suggestions.from.map(airport => <button key={airport.code} type="button" onClick={() => handleSuggestionClick('from', airport)} className="w-full px-4 py-3 text-left border-b border-border last:border-b-0 transition-colors bg-white hover:bg-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                          <Plane className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{airport.city} ({airport.code})</div>
                          <div className="text-sm text-muted-foreground">{airport.name}, {airport.country}</div>
                        </div>
                      </div>
                    </button>)}
                </div>}
            </div>
            
            {/* Swap Button - Vertical on Mobile */}
            
            
            {/* To Field */}
            <div className="relative">
              <label htmlFor="to" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Naar
              </label>
              <input ref={toInputRef} type="text" id="to" value={searchData.to} onChange={e => handleInputChange('to', e.target.value)} onFocus={() => handleInputFocus('to')} placeholder="bestemming" className="input-jetleg h-14 w-full" />
              
              {activeSuggestion.field === 'to' && <div className="absolute top-full left-0 right-0 bg-white border border-border rounded-xl mt-1 shadow-lg z-50 max-h-64 overflow-y-auto">
                  <button type="button" onClick={handleEverywhere} className="w-full px-4 py-3 text-left hover:bg-muted border-b border-border transition-colors bg-white">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-accent to-[hsl(var(--jetleg-amber-dark))] rounded-lg flex items-center justify-center">
                        <Search className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">Overal</div>
                        <div className="text-sm text-muted-foreground">Vind de beste deals naar elke bestemming</div>
                      </div>
                    </div>
                  </button>
                  
                  {suggestions.to.map(airport => <button key={airport.code} type="button" onClick={() => handleSuggestionClick('to', airport)} className="w-full px-4 py-3 text-left hover:bg-muted border-b border-border last:border-b-0 transition-colors bg-white">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                          <Plane className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{airport.city} ({airport.code})</div>
                          <div className="text-sm text-muted-foreground">{airport.name}, {airport.country}</div>
                        </div>
                      </div>
                    </button>)}
                </div>}
            </div>
          </div>
          
          {/* Date and Passengers Row */}
          <div className="grid grid-cols-3 gap-4">
            {/* Enhanced Date Field */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                <Search className="h-4 w-4" />
                Datum
              </label>
              <EnhancedDatePicker value={searchData.date} onChange={value => handleInputChange('date', value)} className="w-full h-14" />
            </div>
            
            {/* Passengers Field */}
            <div>
              <label htmlFor="passengers-mobile" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Personen
              </label>
              <PassengerCounter value={parseInt(searchData.passengers)} onChange={handlePassengerChange} className="h-14" hideArrows={false} />
            </div>
          </div>
          
          {/* Search and Clear Buttons */}
          <div className="flex gap-3">
            <button type="submit" className="btn-jetleg-primary h-14 px-6 flex items-center justify-center gap-2 whitespace-nowrap flex-1 text-lg">
              <Search className="h-5 w-5" />
              Zoeken
            </button>
            {hasSearchParams && (
              <button type="button" onClick={handleClearSearch} className="btn-jetleg-outline h-14 px-4 flex items-center justify-center gap-2 whitespace-nowrap">
                <X className="h-5 w-5" />
                Wissen
              </button>
            )}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex items-end gap-4 lg:gap-1">
          {/* From Field */}
          <div className="flex-1 min-w-0 relative">
            <label htmlFor="from-desktop" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Van
            </label>
            <input type="text" id="from-desktop" value={searchData.from} onChange={e => handleInputChange('from', e.target.value)} onFocus={() => handleInputFocus('from')} placeholder="vertrek locatie" className="input-jetleg h-12" />
            
            {activeSuggestion.field === 'from' && suggestions.from.length > 0 && <div className="absolute top-full left-0 right-0 bg-white border border-border rounded-xl mt-1 shadow-lg z-50 max-h-64 overflow-y-auto">
                {suggestions.from.map(airport => <button key={airport.code} type="button" onClick={() => handleSuggestionClick('from', airport)} className="w-full px-4 py-3 text-left border-b border-border last:border-b-0 transition-colors bg-white hover:bg-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Plane className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{airport.city} ({airport.code})</div>
                        <div className="text-sm text-muted-foreground">{airport.name}, {airport.country}</div>
                      </div>
                    </div>
                  </button>)}
              </div>}
          </div>
          
          {/* Swap Button - Horizontal on Desktop - Desktop Only with Clean Styling */}
          <div className="hidden lg:flex flex-shrink-0 self-end mb-1">
            <button type="button" onClick={handleSwapLocations} className="w-12 h-12 bg-transparent hover:bg-white/10 rounded-full flex items-center justify-center transition-all duration-200" title="Wissel vertrek en bestemming">
              <ArrowLeftRight className="w-5 h-5 text-white" />
            </button>
          </div>
          
          {/* To Field */}
          <div className="flex-1 min-w-0 relative">
            <label htmlFor="to-desktop" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Naar
            </label>
            <input type="text" id="to-desktop" value={searchData.to} onChange={e => handleInputChange('to', e.target.value)} onFocus={() => handleInputFocus('to')} placeholder="bestemming" className="input-jetleg h-12" />
            
            {activeSuggestion.field === 'to' && <div className="absolute top-full left-0 right-0 bg-white border border-border rounded-xl mt-1 shadow-lg z-50 max-h-64 overflow-y-auto">
                <button type="button" onClick={handleEverywhere} className="w-full px-4 py-3 text-left hover:bg-muted border-b border-border transition-colors bg-white">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-accent to-[hsl(var(--jetleg-amber-dark))] rounded-lg flex items-center justify-center">
                      <Search className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground">Overal</div>
                      <div className="text-sm text-muted-foreground">Vind de beste deals naar elke bestemming</div>
                    </div>
                  </div>
                </button>
                
                {suggestions.to.map(airport => <button key={airport.code} type="button" onClick={() => handleSuggestionClick('to', airport)} className="w-full px-4 py-3 text-left hover:bg-muted border-b border-border last:border-b-0 transition-colors bg-white">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Plane className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{airport.city} ({airport.code})</div>
                        <div className="text-sm text-muted-foreground">{airport.name}, {airport.country}</div>
                      </div>
                    </div>
                  </button>)}
              </div>}
          </div>
          
          {/* Date Field */}
          <div className="flex-shrink-0 w-48">
            <label className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
              <Search className="h-4 w-4" />
              Datum
            </label>
            <EnhancedDatePicker value={searchData.date} onChange={value => handleInputChange('date', value)} className="h-12" />
          </div>
          
          {/* Passengers Field */}
          <div className="flex-shrink-0 w-32">
            <label htmlFor="passengers-desktop" className="block text-sm font-medium text-white mb-2 flex items-center gap-2">
              <Users className="h-4 w-4" />
              Personen
            </label>
            <PassengerCounter value={parseInt(searchData.passengers)} onChange={handlePassengerChange} className="h-12" hideArrows={false} />
          </div>
          
          {/* Search and Clear Buttons */}
          <div className="flex-shrink-0 self-end flex gap-2">
            <button type="submit" className="btn-jetleg-primary h-12 px-6 flex items-center justify-center gap-2 whitespace-nowrap">
              <Search className="h-5 w-5" />
              Zoeken
            </button>
            {hasSearchParams && (
              <button type="button" onClick={handleClearSearch} className="btn-jetleg-outline h-12 px-4 flex items-center justify-center gap-2 whitespace-nowrap">
                <X className="h-5 w-5" />
                Wissen
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchWithSuggestions;