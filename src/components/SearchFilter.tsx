import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, X } from 'lucide-react';
import { regions, families, statusLabels } from '@/data/plants';
import { Plant } from '@/data/plants';

interface SearchFilterProps {
  onSearchChange: (query: string) => void;
  onFiltersChange: (filters: FilterState) => void;
  searchQuery: string;
  filters: FilterState;
}

export interface FilterState {
  regions: string[];
  families: string[];
  statuses: Plant['status'][];
}

export const SearchFilter = ({ 
  onSearchChange, 
  onFiltersChange, 
  searchQuery, 
  filters 
}: SearchFilterProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const addFilter = (type: keyof FilterState, value: string) => {
    const newFilters = {
      ...filters,
      [type]: [...filters[type], value]
    };
    onFiltersChange(newFilters);
  };

  const removeFilter = (type: keyof FilterState, value: string) => {
    const newFilters = {
      ...filters,
      [type]: filters[type].filter(item => item !== value)
    };
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({
      regions: [],
      families: [],
      statuses: []
    });
  };

  const hasActiveFilters = filters.regions.length > 0 || 
                         filters.families.length > 0 || 
                         filters.statuses.length > 0;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Поиск растений по названию..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary/50"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="border-primary/20 hover:bg-primary/5"
        >
          <Filter className="w-4 h-4 mr-2" />
          Фильтры
        </Button>
        
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="w-4 h-4 mr-1" />
            Очистить все
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.regions.map(region => (
            <Badge key={region} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              {region}
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => removeFilter('regions', region)}
              />
            </Badge>
          ))}
          {filters.families.map(family => (
            <Badge key={family} variant="secondary" className="bg-accent/50 text-accent-foreground">
              {family}
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => removeFilter('families', family)}
              />
            </Badge>
          ))}
          {filters.statuses.map(status => (
            <Badge key={status} variant="secondary" className="bg-muted text-muted-foreground">
              {statusLabels[status]}
              <X 
                className="w-3 h-3 ml-1 cursor-pointer" 
                onClick={() => removeFilter('statuses', status)}
              />
            </Badge>
          ))}
        </div>
      )}

      {/* Filter Panel */}
      {showFilters && (
        <Card className="bg-card/80 backdrop-blur-sm border-border/50">
          <CardContent className="p-4 space-y-4">
            {/* Regions */}
            <div>
              <h4 className="font-medium text-sm text-foreground mb-2">Регионы</h4>
              <div className="flex flex-wrap gap-2">
                {regions.map(region => (
                  <Button
                    key={region}
                    variant={filters.regions.includes(region) ? "default" : "outline"}
                    size="sm"
                    onClick={() => 
                      filters.regions.includes(region) 
                        ? removeFilter('regions', region)
                        : addFilter('regions', region)
                    }
                    className="text-xs"
                  >
                    {region}
                  </Button>
                ))}
              </div>
            </div>

            {/* Families */}
            <div>
              <h4 className="font-medium text-sm text-foreground mb-2">Семейства</h4>
              <div className="flex flex-wrap gap-2">
                {families.map(family => (
                  <Button
                    key={family}
                    variant={filters.families.includes(family) ? "default" : "outline"}
                    size="sm"
                    onClick={() => 
                      filters.families.includes(family) 
                        ? removeFilter('families', family)
                        : addFilter('families', family)
                    }
                    className="text-xs"
                  >
                    {family}
                  </Button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <h4 className="font-medium text-sm text-foreground mb-2">Статус</h4>
              <div className="flex flex-wrap gap-2">
                {Object.entries(statusLabels).map(([status, label]) => (
                  <Button
                    key={status}
                    variant={filters.statuses.includes(status as Plant['status']) ? "default" : "outline"}
                    size="sm"
                    onClick={() => 
                      filters.statuses.includes(status as Plant['status'])
                        ? removeFilter('statuses', status)
                        : addFilter('statuses', status)
                    }
                    className="text-xs"
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};