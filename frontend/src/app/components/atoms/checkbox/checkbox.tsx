'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export type CheckboxSize = 'sm' | 'md' | 'lg';
export type CheckboxState = 'default' | 'error' | 'success' | 'warning';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Size of the checkbox */
  size?: CheckboxSize;
  /** State of the checkbox (affects border color) */
  state?: CheckboxState;
  /** Label text */
  label?: string;
  /** Helper text below the checkbox */
  helperText?: string;
  /** Error message (overrides helperText when state is error) */
  errorMessage?: string;
  /** Whether the checkbox is in indeterminate state */
  indeterminate?: boolean;
  /** Custom container className */
  containerClassName?: string;
  /** Custom label className */
  labelClassName?: string;
}

const sizeClasses: Record<CheckboxSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const labelSizeClasses: Record<CheckboxSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const stateClasses: Record<CheckboxState, string> = {
  default: 'border-gray-300 text-[#499537] focus:ring-[#499537]/20',
  error: 'border-[#CA545A] text-[#CA545A] focus:ring-[#CA545A]/20',
  success: 'border-[#677D00] text-[#677D00] focus:ring-[#677D00]/20',
  warning: 'border-[#C5953B] text-[#C5953B] focus:ring-[#C5953B]/20',
};

const helperTextStateClasses: Record<CheckboxState, string> = {
  default: 'text-gray-500',
  error: 'text-[#CA545A]',
  success: 'text-[#677D00]',
  warning: 'text-[#C5953B]',
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      size = 'md',
      state = 'default',
      label,
      helperText,
      errorMessage,
      indeterminate = false,
      className,
      containerClassName,
      labelClassName,
      disabled,
      checked,
      ...props
    },
    ref
  ) => {
    const checkboxClasses = cn(
      // Base styles
      'rounded border-2 transition-all duration-200',
      'focus:ring-2 focus:ring-offset-2 focus:outline-none',
      'checked:bg-current checked:border-current',
      // Size styles
      sizeClasses[size],
      // State styles
      stateClasses[state],
      // Disabled styles
      disabled && 'opacity-50 cursor-not-allowed',
      // Interactive styles
      !disabled && 'cursor-pointer hover:border-gray-400',
      className
    );

    const displayHelperText = state === 'error' && errorMessage ? errorMessage : helperText;

    // Handle indeterminate state
    React.useEffect(() => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.indeterminate = indeterminate;
      }
    }, [indeterminate, ref]);

    return (
      <div className={cn('flex flex-col', containerClassName)}>
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              ref={ref}
              type="checkbox"
              className={checkboxClasses}
              disabled={disabled}
              checked={checked}
              {...props}
            />
          </div>
          
          {label && (
            <div className="ml-3">
              <label 
                htmlFor={props.id}
                className={cn(
                  'font-medium cursor-pointer',
                  labelSizeClasses[size],
                  disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700',
                  labelClassName
                )}
              >
                {label}
              </label>
            </div>
          )}
        </div>
        
        {displayHelperText && (
          <p className={cn('text-xs mt-1 ml-8', helperTextStateClasses[state])}>
            {displayHelperText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;