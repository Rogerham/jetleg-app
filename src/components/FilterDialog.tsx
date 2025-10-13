import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface FilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: {
    minPrice: number;
    maxPrice: number;
    minPassengers: number;
    maxPassengers: number;
    minDuration: number;
    maxDuration: number;
    aircraft: string;
    timeOfDay: string;
  };
  onApplyFilters: (filters: FilterDialogProps['filters']) => void;
  onClearFilters: () => void;
}

const FilterDialog = ({ 
  open, 
  onOpenChange, 
  filters, 
  onApplyFilters,
  onClearFilters 
}: FilterDialogProps) => {
  // Local state for editing filters
  const [localFilters, setLocalFilters] = useState(filters);

  // Update local state when dialog opens with current filters
  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      setLocalFilters(filters);
    }
    onOpenChange(newOpen);
  };

  const handleLocalFilterChange = (key: string, value: any) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleDurationChange = (values: number[]) => {
    setLocalFilters(prev => ({ 
      ...prev, 
      minDuration: values[0], 
      maxDuration: values[1] 
    }));
  };

  const handleSaveFilters = () => {
    onApplyFilters(localFilters);
    onOpenChange(false);
  };

  const handleClearAll = () => {
    const defaultFilters = {
      minPrice: 0,
      maxPrice: 10000,
      minPassengers: 1,
      maxPassengers: 20,
      minDuration: 0.5,
      maxDuration: 20,
      aircraft: '',
      timeOfDay: 'any'
    };
    setLocalFilters(defaultFilters);
    onClearFilters();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto sm:top-[5%] sm:translate-y-0">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Price Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Prijs (€)</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Minimum</label>
                <input
                  type="number"
                  min="0"
                  max="50000"
                  step="100"
                  value={localFilters.minPrice}
                  onChange={e => handleLocalFilterChange('minPrice', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-accent/20"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Maximum</label>
                <input
                  type="number"
                  min="0"
                  max="50000"
                  step="100"
                  value={localFilters.maxPrice}
                  onChange={e => handleLocalFilterChange('maxPrice', parseInt(e.target.value) || 50000)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-accent/20"
                  placeholder="10000"
                />
              </div>
            </div>
          </div>

          {/* Passengers Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Aantal passagiers</label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Minimum</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  step="1"
                  value={localFilters.minPassengers}
                  onChange={e => handleLocalFilterChange('minPassengers', parseInt(e.target.value) || 1)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-accent/20"
                  placeholder="1"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Maximum</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  step="1"
                  value={localFilters.maxPassengers}
                  onChange={e => handleLocalFilterChange('maxPassengers', parseInt(e.target.value) || 20)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-accent/20"
                  placeholder="20"
                />
              </div>
            </div>
          </div>

          {/* Duration Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">Vliegduur (uren)</label>
            <div className="w-full">
              <Slider
                value={[localFilters.minDuration, localFilters.maxDuration]}
                onValueChange={handleDurationChange}
                min={0}
                max={24}
                step={0.5}
                className="w-full [&>span:first-child]:bg-slate-400"
              />
              <div className="flex justify-between text-sm font-medium text-foreground mt-2">
                <span>{localFilters.minDuration}u</span>
                <span>{localFilters.maxDuration}u</span>
              </div>
            </div>
          </div>

          {/* Time of Day Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Vertrektijd</label>
            <div className="space-y-2">
              {[
                { value: 'any', label: 'Alle tijden' },
                { value: 'morning', label: 'Ochtend (06:00 - 12:00)' },
                { value: 'afternoon', label: 'Middag (12:00 - 18:00)' },
                { value: 'evening', label: 'Avond (18:00 - 24:00)' }
              ].map(option => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="timeOfDay"
                    value={option.value}
                    checked={localFilters.timeOfDay === option.value}
                    onChange={e => handleLocalFilterChange('timeOfDay', e.target.value)}
                    className="accent-accent"
                  />
                  <span className="text-sm text-foreground">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-col gap-2">
          <Button
            variant="outline"
            onClick={handleClearAll}
            className="w-full"
          >
            Wis alle filters
          </Button>
          <Button
            onClick={handleSaveFilters}
            className="w-full"
          >
            Filters opslaan
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
