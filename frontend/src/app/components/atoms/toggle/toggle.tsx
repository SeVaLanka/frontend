'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export type ToggleSize = 'sm' | 'md' | 'lg';
export type ToggleState = 'default' | 'error' | 'success' | 'warning';

export interface ToggleProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Size of the toggle */
  size?: ToggleSize;
  /** State of the toggle (affects color) */
  state?: ToggleState;
  /** Label text */
  label?: string;
  /** Helper text below the toggle */
  helperText?: string;
  /** Error message (overrides helperText when state is error) */
  errorMessage?: string;
  /** Custom container className */
  containerClassName?: string;
  /** Custom label className */
  labelClassName?: string;
  /** Position of the label */
  labelPosition?: 'left' | 'right';
  /** Custom colors for checked state */
  checkedColor?: string;
  /** Custom colors for unchecked state */
  uncheckedColor?: string;
}

const sizeClasses: Record<ToggleSize, { track: string; thumb: string; translate: string }> = {
  sm: {
    track: 'w-9 h-5',
    thumb: 'w-4 h-4',
    translate: 'translate-x-4',
  },
  md: {
    track: 'w-11 h-6',
    thumb: 'w-5 h-5',
    translate: 'translate-x-5',
  },
  lg: {
    track: 'w-14 h-7',
    thumb: 'w-6 h-6',
    translate: 'translate-x-7',
  },
};

const labelSizeClasses: Record<ToggleSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const stateColors: Record<ToggleState, { checked: string; unchecked: string }> = {
  default: {
    checked: '#499537',
    unchecked: '#D1D5DB',
  },
  error: {
    checked: '#CA545A',
    unchecked: '#FCA5A5',
  },
  success: {
    checked: '#677D00',
    unchecked: '#BBF7D0',
  },
  warning: {
    checked: '#C5953B',
    unchecked: '#FDE68A',
  },
};

const helperTextStateClasses: Record<ToggleState, string> = {
  default: 'text-gray-500',
  error: 'text-[#CA545A]',
  success: 'text-[#677D00]',
  warning: 'text-[#C5953B]',
};

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      size = 'md',
      state = 'default',
      label,
      helperText,
      errorMessage,
      className,
      containerClassName,
      labelClassName,
      labelPosition = 'right',
      checkedColor,
      uncheckedColor,
      disabled,
      checked,
      ...props
    },
    ref
  ) => {
    const { track, thumb, translate } = sizeClasses[size];
    const colors = stateColors[state];
    
    const trackColor = checked 
      ? (checkedColor || colors.checked) 
      : (uncheckedColor || colors.unchecked);

    const trackClasses = cn(
      'relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-[#499537]/20',
      track,
      disabled && 'opacity-50 cursor-not-allowed',
      !disabled && 'cursor-pointer',
      className
    );

    const thumbClasses = cn(
      'inline-block rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out',
      thumb,
      checked ? translate : 'translate-x-0.5'
    );

    const displayHelperText = state === 'error' && errorMessage ? errorMessage : helperText;

    const toggleElement = (
      <div className="relative">
        <div 
          className={trackClasses}
          style={{ backgroundColor: trackColor }}
        >
          <input
            ref={ref}
            type="checkbox"
            className="sr-only"
            disabled={disabled}
            checked={checked}
            {...props}
          />
          <span className={thumbClasses} />
        </div>
      </div>
    );

    const labelElement = label && (
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
    );

    return (
      <div className={cn('flex flex-col', containerClassName)}>
        <div className={cn(
          'flex items-center',
          labelPosition === 'left' ? 'flex-row-reverse justify-end' : 'flex-row',
          label && (labelPosition === 'left' ? 'space-x-reverse space-x-3' : 'space-x-3')
        )}>
          {toggleElement}
          {labelElement}
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

Toggle.displayName = 'Toggle';

export default Toggle;