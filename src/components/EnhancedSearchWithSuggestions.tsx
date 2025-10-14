
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, MapPin, Calendar, Users, Plane, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSearchSuggestions } from '@/hooks/useSearchSuggestions';
import EnhancedDatePicker from '@/components/EnhancedDatePicker';
import PassengerCounter from '@/components/PassengerCounter';
import SearchFormValidation from '@/components/SearchFormValidation';
import { useCurrency } from '@/contexts/CurrencyContext';

interface SearchValues {
  from: string;
  to: string;
  date: string;
  passengers: string;
}

interface SearchWithSuggestionsProps {
  className?: string;
  initialValues?: Partial<SearchValues>;
  onSearch?: (values: SearchValues) => void;
}

interface ValidationError {
  field: string;
  message: string;
}

const EnhancedSearchWithSuggestions = ({ 
  className = "", 
  initialValues,
  onSearch 
}: SearchWithSuggestionsProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currency } = useCurrency();
  
  const [searchValues, setSearchValues] = useState<SearchValues>({
    from: initialValues?.from || '',
    to: initialValues?.to || '',
    date: initialValues?.date || '',
    passengers: initialValues?.passengers || '1'
  });

  const [activeSuggestion, setActiveSuggestion] = useState<{field: string, index: number} | null>(null);
  const [showSuggestions, setShowSuggestions] = useState<{from: boolean, to: boolean}>({
    from: false,
    to: false
  });
  
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);

  // Use the search suggestions hook
  const { data: fromSuggestions = [] } = useSearchSuggestions(searchValues.from, 'from');
  const { data: toSuggestions = [] } = useSearchSuggestions(searchValues.to, 'to');

  const validateForm = (): ValidationError[] => {
    const errors: ValidationError[] = [];

    if (!searchValues.from.trim()) {
      errors.push({
        field: 'from',
        message: t('search.validation.fromRequired', 'Selecteer een vertreklocatie')
      });
    }

    if (!searchValues.to.trim()) {
      errors.push({
        field: 'to',
        message: t('search.validation.toRequired', 'Selecteer een bestemming')
      });
    }

    if (!searchValues.date.trim()) {
      errors.push({
        field: 'date',
        message: t('search.validation.dateRequired', 'Selecteer een vertrekdatum om te kunnen zoeken')
      });
    }

    if (!searchValues.passengers || parseInt(searchValues.passengers) < 1) {
      errors.push({
        field: 'passengers',
        message: t('search.validation.passengersRequired', 'Selecteer het aantal passagiers')
      });
    }

    return errors;
  };

  const handleInputChange = (field: 'from' | 'to', value: string) => {
    setSearchValues(prev => ({ ...prev, [field]: value }));
    
    const suggestions = field === 'from' ? fromSuggestions : toSuggestions;
    setShowSuggestions(prev => ({ ...prev, [field]: value.length >= 2 && suggestions.length > 0 }));
    setActiveSuggestion(null);

    // Clear validation errors for this field
    setValidationErrors(prev => prev.filter(error => error.field !== field));
  };

  const handleSuggestionClick = (field: 'from' | 'to', suggestion: string) => {
    setSearchValues(prev => ({ ...prev, [field]: suggestion }));
    setShowSuggestions(prev => ({ ...prev, [field]: false }));
  };

  const handleKeyDown = (field: 'from' | 'to', e: React.KeyboardEvent) => {
    const currentSuggestions = field === 'from' ? fromSuggestions : toSuggestions;
    if (currentSuggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestion(prev => {
        const newIndex = prev?.field === field ? Math.min(prev.index + 1, currentSuggestions.length - 1) : 0;
        return { field, index: newIndex };
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestion(prev => {
        const newIndex = prev?.field === field ? Math.max(prev.index - 1, 0) : 0;
        return { field, index: newIndex };
      });
    } else if (e.key === 'Enter' && activeSuggestion?.field === field) {
      e.preventDefault();
      handleSuggestionClick(field, currentSuggestions[activeSuggestion.index].value);
    } else if (e.key === 'Escape') {
      setShowSuggestions(prev => ({ ...prev, [field]: false }));
      setActiveSuggestion(null);
    }
  };

  const handleSearch = async () => {
    const errors = validateForm();
    
    if (errors.length > 0) {
      setValidationErrors(errors);
      // Scroll to top to show validation errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSearching(true);
    setValidationErrors([]);

    try {
      if (onSearch) {
        onSearch(searchValues);
      } else {
        // Convert SearchValues to URLSearchParams format
        const searchParams = new URLSearchParams({
          from: searchValues.from,
          to: searchValues.to,
          date: searchValues.date,
          passengers: searchValues.passengers
        });
        navigate(`/?${searchParams.toString()}`);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearValidationErrors = () => {
    setValidationErrors([]);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fromRef.current && !fromRef.current.contains(event.target as Node)) {
        setShowSuggestions(prev => ({ ...prev, from: false }));
      }
      if (toRef.current && !toRef.current.contains(event.target as Node)) {
        setShowSuggestions(prev => ({ ...prev, to: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Helper function to check if a field has validation errors
  const hasFieldError = (fieldName: string) => {
    return validationErrors.some(error => error.field === fieldName);
  };

  return (
    <div className={`w-full ${className}`}>
      <SearchFormValidation 
        errors={validationErrors}
        onDismiss={handleClearValidationErrors}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-6 bg-card rounded-lg border border-border shadow-sm">
        {/* From Field */}
        <div className="relative" ref={fromRef}>
          <label className="block text-sm font-medium text-foreground mb-2">
            <MapPin className="h-4 w-4 inline mr-1" />
            {t('search.from')}
          </label>
          <Input
            type="text"
            placeholder={t('search.fromPlaceholder')}
            value={searchValues.from}
            onChange={(e) => handleInputChange('from', e.target.value)}
            onKeyDown={(e) => handleKeyDown('from', e)}
            onFocus={() => {
              if (fromSuggestions.length > 0 && searchValues.from.length >= 2) {
                setShowSuggestions(prev => ({ ...prev, from: true }));
              }
            }}
            className={hasFieldError('from') ? 'border-destructive ring-1 ring-destructive' : ''}
          />
          
          {/* Show inline error for from field */}
          {hasFieldError('from') && (
            <div className="absolute -bottom-5 left-0 text-xs text-destructive">
              {validationErrors.find(e => e.field === 'from')?.message}
            </div>
          )}
          
          {showSuggestions.from && fromSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-popover border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
              {fromSuggestions.map((suggestion, index) => (
                <button
                  key={`${suggestion.value}-${index}`}
                  type="button"
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${
                    activeSuggestion?.field === 'from' && activeSuggestion?.index === index 
                      ? 'bg-accent text-accent-foreground' 
                      : ''
                  }`}
                  onClick={() => handleSuggestionClick('from', suggestion.value)}
                >
                  <MapPin className="h-3 w-3 inline mr-2 text-muted-foreground" />
                  {suggestion.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* To Field */}
        <div className="relative" ref={toRef}>
          <label className="block text-sm font-medium text-foreground mb-2">
            <MapPin className="h-4 w-4 inline mr-1" />
            {t('search.to')}
          </label>
          <Input
            type="text"
            placeholder={t('search.toPlaceholder')}
            value={searchValues.to}
            onChange={(e) => handleInputChange('to', e.target.value)}
            onKeyDown={(e) => handleKeyDown('to', e)}
            onFocus={() => {
              if (toSuggestions.length > 0 && searchValues.to.length >= 2) {
                setShowSuggestions(prev => ({ ...prev, to: true }));
              }
            }}
            className={hasFieldError('to') ? 'border-destructive ring-1 ring-destructive' : ''}
          />
          
          {/* Show inline error for to field */}
          {hasFieldError('to') && (
            <div className="absolute -bottom-5 left-0 text-xs text-destructive">
              {validationErrors.find(e => e.field === 'to')?.message}
            </div>
          )}
          
          {showSuggestions.to && toSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-popover border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
              {toSuggestions.map((suggestion, index) => (
                <button
                  key={`${suggestion.value}-${index}`}
                  type="button"
                  className={`w-full text-left px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground ${
                    activeSuggestion?.field === 'to' && activeSuggestion?.index === index 
                      ? 'bg-accent text-accent-foreground' 
                      : ''
                  }`}
                  onClick={() => handleSuggestionClick('to', suggestion.value)}
                >
                  <MapPin className="h-3 w-3 inline mr-2 text-muted-foreground" />
                  {suggestion.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Date Field */}
        <div className="relative">
          <label className="block text-sm font-medium text-foreground mb-2">
            <Calendar className="h-4 w-4 inline mr-1" />
            {t('search.date')}
          </label>
          <EnhancedDatePicker
            value={searchValues.date}
            onChange={(value) => {
              setSearchValues(prev => ({ ...prev, date: value }));
              setValidationErrors(prev => prev.filter(error => error.field !== 'date'));
            }}
            hasError={hasFieldError('date')}
          />
        </div>

        {/* Passengers Field */}
        <div className="relative">
          <label className="block text-sm font-medium text-foreground mb-2">
            <Users className="h-4 w-4 inline mr-1" />
            {t('search.passengers')}
          </label>
          <PassengerCounter
            value={parseInt(searchValues.passengers)}
            onChange={(value) => {
              setSearchValues(prev => ({ ...prev, passengers: value.toString() }));
              setValidationErrors(prev => prev.filter(error => error.field !== 'passengers'));
            }}
          />
          
          {/* Show inline error for passengers field */}
          {hasFieldError('passengers') && (
            <div className="absolute -bottom-5 left-0 text-xs text-destructive">
              {validationErrors.find(e => e.field === 'passengers')?.message}
            </div>
          )}
        </div>

        {/* Search Button */}
        <div className="md:col-span-4 flex justify-center mt-6">
          <Button
            onClick={handleSearch}
            disabled={isSearching}
            className="w-full md:w-auto min-w-[200px] bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
          >
            {isSearching ? (
              <>
                <Plane className="h-4 w-4 mr-2 animate-pulse" />
                {t('search.searching')}
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                {t('search.searchFlights')}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedSearchWithSuggestions;
