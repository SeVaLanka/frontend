'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Dropdown, DropdownOption } from '@/app/components/atoms/dropdown/dropdown';

export interface FilterItem {
  id: string;
  label: string;
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
}

export interface FilterGroupProps {
  /** Array of filter items */
  filters: FilterItem[];
  /** Callback when any filter value changes */
  onChange?: (filterId: string, value: string) => void;
  /** Layout direction */
  direction?: 'horizontal' | 'vertical';
  /** Custom className for the container */
  className?: string;
  /** Whether all filters are disabled */
  disabled?: boolean;
  /** Show clear all filters button */
  showClearAll?: boolean;
  /** Callback when clear all is clicked */
  onClearAll?: () => void;
  /** Custom spacing between filters */
  spacing?: 'sm' | 'md' | 'lg';
}

const spacingClasses = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
};

export const FilterGroup: React.FC<FilterGroupProps> = ({
  filters,
  onChange,
  direction = 'horizontal',
  className,
  disabled = false,
  showClearAll = true,
  onClearAll,
  spacing = 'md',
}) => {
  const handleFilterChange = (filterId: string, value: string) => {
    if (!disabled) {
      onChange?.(filterId, value);
    }
  };

  const handleClearAll = () => {
    if (!disabled) {
      onClearAll?.();
    }
  };

  const hasActiveFilters = filters.some(filter => filter.value && filter.value !== '');

  const ClearIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );

  const containerClasses = cn(
    'flex',
    direction === 'horizontal' ? 'flex-row flex-wrap items-end' : 'flex-col',
    spacingClasses[spacing],
    className
  );

  return (
    <div className={containerClasses}>
      {/* Filter Dropdowns */}
      <div className={cn(
        'flex',
        direction === 'horizontal' ? 'flex-row flex-wrap' : 'flex-col',
        spacingClasses[spacing],
        'flex-1'
      )}>
        {filters.map((filter) => (
          <div
            key={filter.id}
            className={cn(
              direction === 'horizontal' ? 'min-w-0 flex-1' : 'w-full',
              'min-w-[150px]'
            )}
          >
            <Dropdown
              label={filter.label}
              options={filter.options}
              value={filter.value}
              onChange={(value) => handleFilterChange(filter.id, value)}
              placeholder={filter.placeholder || `Select ${filter.label.toLowerCase()}`}
              disabled={disabled}
              size="md"
            />
          </div>
        ))}
      </div>

      {/* Clear All Button */}
      {showClearAll && hasActiveFilters && (
        <div className={cn(
          direction === 'horizontal' ? 'flex-shrink-0' : 'w-full',
          direction === 'vertical' && 'mt-2'
        )}>
          <button
            type="button"
            onClick={handleClearAll}
            disabled={disabled}
            className={cn(
              'inline-flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200',
              'border border-gray-300 bg-white hover:bg-gray-50',
              'text-gray-700 hover:text-gray-900',
              'focus:outline-none focus:ring-2 focus:ring-[#499537]/20 focus:border-[#499537]',
              disabled && 'opacity-50 cursor-not-allowed',
              direction === 'vertical' && 'w-full justify-center'
            )}
          >
            <ClearIcon />
            <span className="ml-2">Clear All</span>
          </button>
        </div>
      )}

      {/* Active Filter Count */}
      {hasActiveFilters && (
        <div className={cn(
          'text-sm text-gray-500',
          direction === 'vertical' && 'mt-2'
        )}>
          {filters.filter(f => f.value && f.value !== '').length} filter{filters.filter(f => f.value && f.value !== '').length !== 1 ? 's' : ''} applied
        </div>
      )}
    </div>
  );
};

export default FilterGroup;