'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Textbox } from '@/app/components/atoms/textbox/textbox';

export interface SearchBarProps {
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Current search value */
  value?: string;
  /** Callback when search value changes */
  onChange?: (value: string) => void;
  /** Callback when search is submitted */
  onSearch?: (value: string) => void;
  /** Size of the search bar */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the search bar is disabled */
  disabled?: boolean;
  /** Show loading state */
  loading?: boolean;
  /** Custom className for the container */
  className?: string;
  /** Show clear button when there's text */
  showClearButton?: boolean;
  /** Callback when clear button is clicked */
  onClear?: () => void;
  /** Auto-focus on mount */
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  value,
  onChange,
  onSearch,
  size = 'md',
  disabled = false,
  loading = false,
  className,
  showClearButton = true,
  onClear,
  autoFocus = false,
}) => {
  const [internalValue, setInternalValue] = useState(value || '');
  const currentValue = value !== undefined ? value : internalValue;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!disabled && !loading) {
      onSearch?.(currentValue);
    }
  };

  const handleClear = () => {
    const emptyValue = '';
    if (value === undefined) {
      setInternalValue(emptyValue);
    }
    onChange?.(emptyValue);
    onClear?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e as React.FormEvent);
    }
    if (e.key === 'Escape' && currentValue) {
      handleClear();
    }
  };

  const SearchIcon = () => (
    <svg 
      className="w-5 h-5" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
      />
    </svg>
  );

  const ClearIcon = () => (
    <svg 
      className="w-4 h-4" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M6 18L18 6M6 6l12 12" 
      />
    </svg>
  );

  const rightIcon = (
    <div className="flex items-center space-x-1">
      {showClearButton && currentValue && !loading && (
        <button
          type="button"
          onClick={handleClear}
          className="p-1 text-gray-400 hover:text-gray-600 transition-colors duration-200 rounded-full hover:bg-gray-100"
          disabled={disabled}
        >
          <ClearIcon />
        </button>
      )}
      <button
        type="submit"
        className={cn(
          'p-1 transition-colors duration-200 rounded-full',
          disabled || loading
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-[#499537] hover:text-[#3a7a2e] hover:bg-[#499537]/10'
        )}
        disabled={disabled || loading}
      >
        <SearchIcon />
      </button>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className={cn('w-full', className)}>
      <Textbox
        placeholder={placeholder}
        value={currentValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        size={size}
        disabled={disabled}
        loading={loading}
        rightIcon={rightIcon}
        autoFocus={autoFocus}
        className="pr-16"
      />
    </form>
  );
};

export default SearchBar;