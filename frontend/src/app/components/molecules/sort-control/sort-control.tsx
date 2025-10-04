'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Dropdown, DropdownOption } from '@/app/components/atoms/dropdown/dropdown';

export type SortDirection = 'asc' | 'desc';

export interface SortOption extends DropdownOption {
  field: string;
  defaultDirection?: SortDirection;
}

export interface SortControlProps {
  /** Array of sort options */
  options: SortOption[];
  /** Currently selected sort field */
  value?: string;
  /** Current sort direction */
  direction?: SortDirection;
  /** Callback when sort field changes */
  onSortChange?: (field: string, direction: SortDirection) => void;
  /** Label for the sort control */
  label?: string;
  /** Size of the control */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the control is disabled */
  disabled?: boolean;
  /** Custom className */
  className?: string;
  /** Show direction toggle button */
  showDirectionToggle?: boolean;
  /** Custom placeholder */
  placeholder?: string;
}

export const SortControl: React.FC<SortControlProps> = ({
  options,
  value,
  direction = 'asc',
  onSortChange,
  label = 'Sort by',
  size = 'md',
  disabled = false,
  className,
  showDirectionToggle = true,
  placeholder = 'Select sort option',
}) => {
  const handleSortFieldChange = (newValue: string) => {
    if (!disabled) {
      const selectedOption = options.find(opt => opt.value === newValue);
      const newDirection = selectedOption?.defaultDirection || direction;
      onSortChange?.(newValue, newDirection);
    }
  };

  const handleDirectionToggle = () => {
    if (!disabled && value) {
      const newDirection = direction === 'asc' ? 'desc' : 'asc';
      onSortChange?.(value, newDirection);
    }
  };

  const SortAscIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
    </svg>
  );

  const SortDescIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
    </svg>
  );

  const SortIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
    </svg>
  );

  const buttonSizeClasses = {
    sm: 'h-8 px-3',
    md: 'h-10 px-4',
    lg: 'h-12 px-4',
  };

  return (
    <div className={cn('flex items-end gap-2', className)}>
      {/* Sort Dropdown */}
      <div className="flex-1 min-w-0">
        <Dropdown
          label={label}
          options={options}
          value={value}
          onChange={handleSortFieldChange}
          placeholder={placeholder}
          size={size}
          disabled={disabled}
        />
      </div>

      {/* Direction Toggle Button */}
      {showDirectionToggle && (
        <div className="flex-shrink-0">
          <button
            type="button"
            onClick={handleDirectionToggle}
            disabled={disabled || !value}
            className={cn(
              'inline-flex items-center justify-center rounded-lg border transition-all duration-200',
              buttonSizeClasses[size],
              'border-gray-300 bg-white text-gray-700',
              'hover:bg-gray-50 hover:border-gray-400',
              'focus:outline-none focus:ring-2 focus:ring-[#499537]/20 focus:border-[#499537]',
              disabled || !value
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer',
              value && direction === 'asc' && 'bg-[#499537]/10 border-[#499537] text-[#499537]',
              value && direction === 'desc' && 'bg-[#499537]/10 border-[#499537] text-[#499537]'
            )}
            title={`Sort ${direction === 'asc' ? 'descending' : 'ascending'}`}
          >
            {!value ? (
              <SortIcon />
            ) : direction === 'asc' ? (
              <SortAscIcon />
            ) : (
              <SortDescIcon />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default SortControl;