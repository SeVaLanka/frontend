'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export type RadioSize = 'sm' | 'md' | 'lg';
export type RadioState = 'default' | 'error' | 'success' | 'warning';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Size of the radio button */
  size?: RadioSize;
  /** State of the radio button (affects border color) */
  state?: RadioState;
  /** Label text */
  label?: string;
  /** Description text below the label */
  description?: string;
  /** Custom container className */
  containerClassName?: string;
  /** Custom label className */
  labelClassName?: string;
}

export interface RadioGroupProps {
  /** Array of radio options */
  options: RadioOption[];
  /** Currently selected value */
  value?: string;
  /** Callback when value changes */
  onChange?: (value: string) => void;
  /** Name for the radio group */
  name: string;
  /** Size of all radio buttons in the group */
  size?: RadioSize;
  /** State of the radio group */
  state?: RadioState;
  /** Label for the radio group */
  label?: string;
  /** Helper text below the radio group */
  helperText?: string;
  /** Error message (overrides helperText when state is error) */
  errorMessage?: string;
  /** Layout direction */
  direction?: 'vertical' | 'horizontal';
  /** Whether the radio group is disabled */
  disabled?: boolean;
  /** Custom container className */
  className?: string;
}

const sizeClasses: Record<RadioSize, string> = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

const labelSizeClasses: Record<RadioSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const stateClasses: Record<RadioState, string> = {
  default: 'border-gray-300 text-[#499537] focus:ring-[#499537]/20',
  error: 'border-[#CA545A] text-[#CA545A] focus:ring-[#CA545A]/20',
  success: 'border-[#677D00] text-[#677D00] focus:ring-[#677D00]/20',
  warning: 'border-[#C5953B] text-[#C5953B] focus:ring-[#C5953B]/20',
};

const labelStateClasses: Record<RadioState, string> = {
  default: 'text-gray-700',
  error: 'text-[#CA545A]',
  success: 'text-[#677D00]',
  warning: 'text-[#C5953B]',
};

const helperTextStateClasses: Record<RadioState, string> = {
  default: 'text-gray-500',
  error: 'text-[#CA545A]',
  success: 'text-[#677D00]',
  warning: 'text-[#C5953B]',
};

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      size = 'md',
      state = 'default',
      label,
      description,
      className,
      containerClassName,
      labelClassName,
      disabled,
      ...props
    },
    ref
  ) => {
    const radioClasses = cn(
      // Base styles
      'rounded-full border-2 transition-all duration-200',
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

    return (
      <div className={cn('flex items-start', containerClassName)}>
        <div className="flex items-center h-5">
          <input
            ref={ref}
            type="radio"
            className={radioClasses}
            disabled={disabled}
            {...props}
          />
        </div>
        
        {(label || description) && (
          <div className="ml-3">
            {label && (
              <label 
                htmlFor={props.id}
                className={cn(
                  'font-medium cursor-pointer block',
                  labelSizeClasses[size],
                  disabled ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700',
                  labelClassName
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p className={cn(
                'text-sm mt-1',
                disabled ? 'text-gray-300' : 'text-gray-500'
              )}>
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Radio.displayName = 'Radio';

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  name,
  size = 'md',
  state = 'default',
  label,
  helperText,
  errorMessage,
  direction = 'vertical',
  disabled = false,
  className,
}) => {
  const handleChange = (optionValue: string) => {
    if (!disabled) {
      onChange?.(optionValue);
    }
  };

  const displayHelperText = state === 'error' && errorMessage ? errorMessage : helperText;

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className={cn('block text-sm font-medium mb-3', labelStateClasses[state])}>
          {label}
        </label>
      )}
      
      <div className={cn(
        'space-y-3',
        direction === 'horizontal' && 'flex space-x-6 space-y-0'
      )}>
        {options.map((option) => (
          <Radio
            key={option.value}
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => handleChange(option.value)}
            size={size}
            state={state}
            label={option.label}
            description={option.description}
            disabled={disabled || option.disabled}
          />
        ))}
      </div>
      
      {displayHelperText && (
        <p className={cn('text-xs mt-2', helperTextStateClasses[state])}>
          {displayHelperText}
        </p>
      )}
    </div>
  );
};

export default Radio;