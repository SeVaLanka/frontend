"use client";

import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'success' | 'error' | 'warning' | 'info' | 'outline' | 'ghost';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    className,
    disabled,
    ...props
  }, ref) => {
    
    const baseClasses = [
      'inline-flex items-center justify-center gap-2',
      'font-medium rounded-lg transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'border border-transparent'
    ];

    const variantClasses = {
      primary: [
        'text-white shadow-sm',
        'hover:opacity-90 active:opacity-80',
        'focus:ring-4 focus:ring-blue-300'
      ],
      secondary: [
        'text-white shadow-sm',
        'hover:opacity-90 active:opacity-80',
        'focus:ring-4 focus:ring-blue-300'
      ],
      tertiary: [
        'text-white shadow-sm',
        'hover:opacity-90 active:opacity-80',
        'focus:ring-4 focus:ring-orange-300'
      ],
      success: [
        'text-white shadow-sm',
        'hover:opacity-90 active:opacity-80',
        'focus:ring-4 focus:ring-green-300'
      ],
      error: [
        'text-white shadow-sm',
        'hover:opacity-90 active:opacity-80',
        'focus:ring-4 focus:ring-red-300'
      ],
      warning: [
        'text-white shadow-sm',
        'hover:opacity-90 active:opacity-80',
        'focus:ring-4 focus:ring-yellow-300'
      ],
      info: [
        'text-white shadow-sm',
        'hover:opacity-90 active:opacity-80',
        'focus:ring-4 focus:ring-blue-300'
      ],
      outline: [
        'bg-transparent border-2 shadow-sm',
        'hover:opacity-80',
        'focus:ring-4 focus:ring-blue-300'
      ],
      ghost: [
        'bg-transparent text-gray-700',
        'hover:bg-gray-100 active:bg-gray-200',
        'focus:ring-4 focus:ring-gray-300'
      ]
    };

    const sizeClasses = {
      xs: 'px-2 py-1 text-xs min-h-[24px]',
      sm: 'px-3 py-1.5 text-sm min-h-[32px]',
      md: 'px-4 py-2 text-base min-h-[40px]',
      lg: 'px-6 py-3 text-lg min-h-[48px]',
      xl: 'px-8 py-4 text-xl min-h-[56px]'
    };

    const isLoading = loading;
    const isDisabled = disabled || loading;

    // Get background color based on variant
    const getBackgroundColor = () => {
      switch (variant) {
        case 'primary': return 'var(--primary)';
        case 'secondary': return 'var(--secondary)';
        case 'tertiary': return 'var(--tertiary)';
        case 'success': return 'var(--success)';
        case 'error': return 'var(--error)';
        case 'warning': return 'var(--warning)';
        case 'info': return 'var(--info)';
        case 'outline': return 'transparent';
        case 'ghost': return 'transparent';
        default: return 'var(--primary)';
      }
    };

    // Get border color for outline variant
    const getBorderColor = () => {
      if (variant === 'outline') {
        return 'var(--primary)';
      }
      return 'transparent';
    };

    // Get text color for outline variant
    const getTextColor = () => {
      if (variant === 'outline') {
        return 'var(--primary)';
      }
      if (variant === 'ghost') {
        return '#374151'; // gray-700
      }
      return '#ffffff';
    };

    return (
      <button
        ref={ref}
        className={clsx(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          isLoading && 'cursor-wait',
          className
        )}
        style={{
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          color: getTextColor(),
        }}
        disabled={isDisabled}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        
        {!isLoading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        
        <span className={clsx(isLoading && 'opacity-0')}>
          {children}
        </span>
        
        {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };