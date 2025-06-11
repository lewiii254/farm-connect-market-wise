
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, Filter, X } from 'lucide-react';

interface Filters {
  category: string;
  level: string;
  price: string;
  search: string;
}

interface CourseFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  activeFiltersCount: number;
}

export const CourseFilters = ({ filters, onFiltersChange, activeFiltersCount }: CourseFiltersProps) => {
  const categories = [
    'All Categories',
    'Crop Production',
    'Livestock',
    'Technology',
    'Business',
    'Marketing',
    'Sustainable Farming'
  ];

  const levels = ['All Levels', 'Beginner', 'Intermediate', 'Advanced'];
  const priceOptions = ['All Courses', 'Free Only', 'Premium Only'];

  const handleFilterChange = (key: keyof Filters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      category: 'All Categories',
      level: 'All Levels',
      price: 'All Courses',
      search: ''
    });
  };

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search courses..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
        </div>

        <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.level} onValueChange={(value) => handleFilterChange('level', value)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {levels.map((level) => (
              <SelectItem key={level} value={level}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filters.price} onValueChange={(value) => handleFilterChange('price', value)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {priceOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <X className="h-4 w-4 mr-1" />
            Clear Filters ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {(filters.search || filters.category !== 'All Categories' || filters.level !== 'All Levels' || filters.price !== 'All Courses') && (
        <div className="flex flex-wrap gap-2">
          {filters.search && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              Search: "{filters.search}"
            </Badge>
          )}
          {filters.category !== 'All Categories' && (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              {filters.category}
            </Badge>
          )}
          {filters.level !== 'All Levels' && (
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              {filters.level}
            </Badge>
          )}
          {filters.price !== 'All Courses' && (
            <Badge variant="secondary" className="bg-orange-100 text-orange-800">
              {filters.price}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};
