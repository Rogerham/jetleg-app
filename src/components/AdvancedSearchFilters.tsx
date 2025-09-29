
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Filter, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { SearchFilters } from '@/types/search';
import { useCurrency } from '@/contexts/CurrencyContext';

interface AdvancedSearchFiltersProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onClearFilters: () => void;
}

const AdvancedSearchFilters = ({ filters, onFiltersChange, onClearFilters }: AdvancedSearchFiltersProps) => {
  const { t } = useTranslation();
  const { currency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearSpecificFilter = (key: keyof SearchFilters) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    onFiltersChange(newFilters);
  };

  const getActiveFiltersCount = () => {
    const excludeKeys = ['from', 'to', 'date', 'passengers']; // Basic search parameters
    return Object.keys(filters).filter(key => 
      !excludeKeys.includes(key) && 
      filters[key as keyof SearchFilters] !== undefined && 
      filters[key as keyof SearchFilters] !== ''
    ).length;
  };

  const activeFiltersCount = getActiveFiltersCount();

  // Cleanup: Restore body scroll on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <Collapsible open={isOpen} onOpenChange={(open) => {
        setIsOpen(open);
        // Prevent body scroll when filter dialog is open
        if (open) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      }}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>{t('search.advancedFilters')}</span>
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFiltersCount}
                </Badge>
              )}
            </div>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>

        <CollapsibleContent className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Price Range */}
            <div className="space-y-2">
              <Label>{t('search.priceRange')} ({currency})</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder={t('search.minPrice')}
                  value={filters.minPrice || ''}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
                />
                <Input
                  type="number"
                  placeholder={t('search.maxPrice')}
                  value={filters.maxPrice || ''}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value ? parseFloat(e.target.value) : undefined)}
                />
              </div>
            </div>

            {/* Jet Type */}
            <div className="space-y-2">
              <Label>{t('search.jetType')}</Label>
              <Select 
                value={filters.jetType || 'all'} 
                onValueChange={(value) => handleFilterChange('jetType', value === 'all' ? undefined : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('search.selectJetType')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('search.allTypes')}</SelectItem>
                  <SelectItem value="light">{t('search.lightJet')}</SelectItem>
                  <SelectItem value="midsize">{t('search.midsizeJet')}</SelectItem>
                  <SelectItem value="heavy">{t('search.heavyJet')}</SelectItem>
                  <SelectItem value="super">{t('search.superJet')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Operator */}
            <div className="space-y-2">
              <Label>{t('search.operator')}</Label>
              <Input
                placeholder={t('search.searchOperator')}
                value={filters.operator || ''}
                onChange={(e) => handleFilterChange('operator', e.target.value || undefined)}
              />
            </div>

            {/* Max Duration */}
            <div className="space-y-2">
              <Label>{t('search.maxDuration')} ({t('search.hours')})</Label>
              <Select 
                value={filters.maxDuration || 'any'} 
                onValueChange={(value) => handleFilterChange('maxDuration', value === 'any' ? undefined : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('search.selectMaxDuration')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">{t('search.anyDuration')}</SelectItem>
                  <SelectItem value="1">1 {t('search.hour')}</SelectItem>
                  <SelectItem value="2">2 {t('search.hours')}</SelectItem>
                  <SelectItem value="3">3 {t('search.hours')}</SelectItem>
                  <SelectItem value="5">5 {t('search.hours')}</SelectItem>
                  <SelectItem value="8">8 {t('search.hours')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <div className="space-y-2">
              <Label>{t('search.activeFilters')}</Label>
              <div className="flex flex-wrap gap-2">
                {filters.minPrice !== undefined && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {t('search.minPrice')}: {currency}{filters.minPrice}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-destructive" 
                      onClick={() => clearSpecificFilter('minPrice')}
                    />
                  </Badge>
                )}
                {filters.maxPrice !== undefined && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {t('search.maxPrice')}: {currency}{filters.maxPrice}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-destructive" 
                      onClick={() => clearSpecificFilter('maxPrice')}
                    />
                  </Badge>
                )}
                {filters.jetType && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {t('search.jetType')}: {filters.jetType}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-destructive" 
                      onClick={() => clearSpecificFilter('jetType')}
                    />
                  </Badge>
                )}
                {filters.operator && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {t('search.operator')}: {filters.operator}
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-destructive" 
                      onClick={() => clearSpecificFilter('operator')}
                    />
                  </Badge>
                )}
                {filters.maxDuration && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {t('search.maxDuration')}: {filters.maxDuration}h
                    <X 
                      className="h-3 w-3 cursor-pointer hover:text-destructive" 
                      onClick={() => clearSpecificFilter('maxDuration')}
                    />
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Clear All Filters */}
          {activeFiltersCount > 0 && (
            <div className="flex justify-end">
              <Button variant="outline" size="sm" onClick={onClearFilters}>
                <X className="h-4 w-4 mr-2" />
                {t('search.clearAllFilters')}
              </Button>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default AdvancedSearchFilters;
