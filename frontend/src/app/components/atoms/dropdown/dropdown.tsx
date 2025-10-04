'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export type DropdownSize = 'sm' | 'md' | 'lg';
export type DropdownState = 'default' | 'error' | 'success' | 'warning';

export interface DropdownProps {
  /** Array of options */
  options: DropdownOption[];
  /** Selected value */
  value?: string;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Placeholder text when no option is selected */
  placeholder?: string;
  /** Size of the dropdown */
  size?: DropdownSize;
  /** State of the dropdown (affects border color) */
  state?: DropdownState;
  /** Label text */
  label?: string;
  /** Helper text below the dropdown */
  helperText?: string;
  /** Error message (overrides helperText when state is error) */
  errorMessage?: string;
  /** Whether the dropdown is disabled */
  disabled?: boolean;
  /** Custom className for the container */
  className?: string;
  /** Custom className for the dropdown button */
  buttonClassName?: string;
}

const sizeClasses: Record<DropdownSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-4 text-lg',
};

const stateClasses: Record<DropdownState, string> = {
  default: 'border-gray-300 focus:border-[#499537] focus:ring-2 focus:ring-[#499537]/20',
  error: 'border-[#CA545A] focus:border-[#CA545A] focus:ring-[#CA545A]/20',
  success: 'border-[#677D00] focus:border-[#677D00] focus:ring-[#677D00]/20',
  warning: 'border-[#C5953B] focus:border-[#C5953B] focus:ring-[#C5953B]/20',
};

const labelStateClasses: Record<DropdownState, string> = {
  default: 'text-gray-700',
  error: 'text-[#CA545A]',
  success: 'text-[#677D00]',
  warning: 'text-[#C5953B]',
};

const helperTextStateClasses: Record<DropdownState, string> = {
  default: 'text-gray-500',
  error: 'text-[#CA545A]',
  success: 'text-[#677D00]',
  warning: 'text-[#C5953B]',
};

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  size = 'md',
  state = 'default',
  label,
  helperText,
  errorMessage,
  disabled = false,
  className,
  buttonClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (optionValue: string) => {
    if (!disabled) {
      onChange?.(optionValue);
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        }
        break;
    }
  };

  const buttonClasses = cn(
    // Base styles
    'w-full flex items-center justify-between border rounded-lg transition-all duration-200 outline-none bg-white',
    // Size styles
    sizeClasses[size],
    // State styles
    stateClasses[state],
    // Disabled styles
    disabled && 'bg-gray-50 text-gray-400 cursor-not-allowed',
    // Interactive styles
    !disabled && 'cursor-pointer hover:border-gray-400',
    buttonClassName
  );

  const displayHelperText = state === 'error' && errorMessage ? errorMessage : helperText;

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className={cn('block text-sm font-medium mb-2', labelStateClasses[state])}>
          {label}
        </label>
      )}

      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          className={buttonClasses}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span className={cn('truncate', !selectedOption && 'text-gray-400')}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <svg
            className={cn(
              'ml-2 h-4 w-4 transition-transform duration-200',
              isOpen && 'rotate-180',
              disabled ? 'text-gray-300' : 'text-gray-500'
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                className={cn(
                  'w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-150',
                  'focus:bg-gray-50 focus:outline-none',
                  option.disabled && 'text-gray-400 cursor-not-allowed',
                  value === option.value && 'bg-[#499537]/10 text-[#499537] font-medium'
                )}
                onClick={() => !option.disabled && handleOptionClick(option.value)}
                disabled={option.disabled}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {displayHelperText && (
        <p className={cn('text-xs mt-1', helperTextStateClasses[state])}>
          {displayHelperText}
        </p>
      )}
    </div>
  );
};

export default Dropdown;