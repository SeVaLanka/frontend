'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export type TextboxVariant = 'default' | 'filled' | 'outline';
export type TextboxSize = 'sm' | 'md' | 'lg';
export type TextboxState = 'default' | 'error' | 'success' | 'warning';

export interface TextboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visual variant of the textbox */
  variant?: TextboxVariant;
  /** Size of the textbox */
  size?: TextboxSize;
  /** State of the textbox (affects border color) */
  state?: TextboxState;
  /** Label text */
  label?: string;
  /** Helper text below the input */
  helperText?: string;
  /** Error message (overrides helperText when state is error) */
  errorMessage?: string;
  /** Icon to display on the left */
  leftIcon?: React.ReactNode;
  /** Icon to display on the right */
  rightIcon?: React.ReactNode;
  /** Whether the input is in loading state */
  loading?: boolean;
  /** Custom container className */
  containerClassName?: string;
}

const variantClasses: Record<TextboxVariant, string> = {
  default: 'border border-gray-300 bg-white focus:border-[#499537] focus:ring-2 focus:ring-[#499537]/20',
  filled: 'border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-[#499537]/20',
  outline: 'border-2 border-gray-200 bg-transparent focus:border-[#499537] focus:ring-0',
};

const sizeClasses: Record<TextboxSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-4 text-lg',
};

const stateClasses: Record<TextboxState, string> = {
  default: '',
  error: 'border-[#CA545A] focus:border-[#CA545A] focus:ring-[#CA545A]/20',
  success: 'border-[#677D00] focus:border-[#677D00] focus:ring-[#677D00]/20',
  warning: 'border-[#C5953B] focus:border-[#C5953B] focus:ring-[#C5953B]/20',
};

const labelStateClasses: Record<TextboxState, string> = {
  default: 'text-gray-700',
  error: 'text-[#CA545A]',
  success: 'text-[#677D00]',
  warning: 'text-[#C5953B]',
};

const helperTextStateClasses: Record<TextboxState, string> = {
  default: 'text-gray-500',
  error: 'text-[#CA545A]',
  success: 'text-[#677D00]',
  warning: 'text-[#C5953B]',
};

export const Textbox = forwardRef<HTMLInputElement, TextboxProps>(
  (
    {
      variant = 'default',
      size = 'md',
      state = 'default',
      label,
      helperText,
      errorMessage,
      leftIcon,
      rightIcon,
      loading = false,
      className,
      containerClassName,
      disabled,
      ...props
    },
    ref
  ) => {
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      props.onBlur?.(e);
    };

    const inputClasses = cn(
      // Base styles
      'w-full rounded-lg transition-all duration-200 outline-none',
      'placeholder:text-gray-400',
      // Variant styles
      variantClasses[variant],
      // Size styles
      sizeClasses[size],
      // State styles
      stateClasses[state],
      // Icon padding adjustments
      leftIcon && 'pl-10',
      rightIcon && 'pr-10',
      // Disabled styles
      disabled && 'bg-gray-50 text-gray-400 cursor-not-allowed',
      // Loading styles
      loading && 'pr-10',
      className
    );

    const displayHelperText = state === 'error' && errorMessage ? errorMessage : helperText;

    return (
      <div className={cn('w-full', containerClassName)}>
        {label && (
          <label className={cn('block text-sm font-medium mb-2', labelStateClasses[state])}>
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            className={inputClasses}
            disabled={disabled || loading}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          
          {(rightIcon || loading) && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {loading ? (
                <div className="animate-spin h-4 w-4 border-2 border-gray-300 border-t-[#499537] rounded-full" />
              ) : (
                rightIcon
              )}
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
  }
);

Textbox.displayName = 'Textbox';

export default Textbox;