
import { useTranslation } from 'react-i18next';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SortOptions } from '@/types/search';

interface SearchResultsSortingProps {
  sortOptions: SortOptions;
  onSortChange: (sortOptions: SortOptions) => void;
  resultsCount: number;
}

const SearchResultsSorting = ({ sortOptions, onSortChange, resultsCount }: SearchResultsSortingProps) => {
  const { t } = useTranslation();

  const handleFieldChange = (field: string) => {
    onSortChange({
      ...sortOptions,
      field: field as SortOptions['field']
    });
  };

  const toggleDirection = () => {
    onSortChange({
      ...sortOptions,
      direction: sortOptions.direction === 'asc' ? 'desc' : 'asc'
    });
  };

  const getSortLabel = (field: string) => {
    switch (field) {
      case 'price_per_seat':
        return t('search.price');
      case 'departure_time':
        return t('search.departureTime');
      case 'flight_duration':
        return t('search.duration');
      default:
        return field;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 p-4 bg-card border border-border rounded-lg">
      <div className="text-sm text-muted-foreground">
        {t('search.resultsFound', { count: resultsCount })}
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{t('search.sortBy')}:</span>
        
        <Select value={sortOptions.field} onValueChange={handleFieldChange}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="departure_time">{t('search.departureTime')}</SelectItem>
            <SelectItem value="price_per_seat">{t('search.price')}</SelectItem>
            <SelectItem value="flight_duration">{t('search.duration')}</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          onClick={toggleDirection}
          className="flex items-center gap-1"
        >
          {sortOptions.direction === 'asc' ? (
            <ArrowUp className="h-4 w-4" />
          ) : (
            <ArrowDown className="h-4 w-4" />
          )}
          <span className="sr-only">
            {sortOptions.direction === 'asc' ? t('search.ascending') : t('search.descending')}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default SearchResultsSorting;
