'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export type TextAreaVariant = 'default' | 'filled' | 'outline';
export type TextAreaSize = 'sm' | 'md' | 'lg';
export type TextAreaState = 'default' | 'error' | 'success' | 'warning';
export type TextAreaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Visual variant of the textarea */
  variant?: TextAreaVariant;
  /** Size of the textarea */
  size?: TextAreaSize;
  /** State of the textarea (affects border color) */
  state?: TextAreaState;
  /** Label text */
  label?: string;
  /** Helper text below the textarea */
  helperText?: string;
  /** Error message (overrides helperText when state is error) */
  errorMessage?: string;
  /** Resize behavior */
  resize?: TextAreaResize;
  /** Custom container className */
  containerClassName?: string;
  /** Show character count */
  showCharCount?: boolean;
  /** Maximum character limit */
  maxLength?: number;
}

const variantClasses: Record<TextAreaVariant, string> = {
  default: 'border border-gray-300 bg-white focus:border-[#499537] focus:ring-2 focus:ring-[#499537]/20',
  filled: 'border-0 bg-gray-100 focus:bg-white focus:ring-2 focus:ring-[#499537]/20',
  outline: 'border-2 border-gray-200 bg-transparent focus:border-[#499537] focus:ring-0',
};

const sizeClasses: Record<TextAreaSize, string> = {
  sm: 'min-h-[80px] px-3 py-2 text-sm',
  md: 'min-h-[100px] px-4 py-3 text-base',
  lg: 'min-h-[120px] px-4 py-3 text-lg',
};

const stateClasses: Record<TextAreaState, string> = {
  default: '',
  error: 'border-[#CA545A] focus:border-[#CA545A] focus:ring-[#CA545A]/20',
  success: 'border-[#677D00] focus:border-[#677D00] focus:ring-[#677D00]/20',
  warning: 'border-[#C5953B] focus:border-[#C5953B] focus:ring-[#C5953B]/20',
};

const resizeClasses: Record<TextAreaResize, string> = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
};

const labelStateClasses: Record<TextAreaState, string> = {
  default: 'text-gray-700',
  error: 'text-[#CA545A]',
  success: 'text-[#677D00]',
  warning: 'text-[#C5953B]',
};

const helperTextStateClasses: Record<TextAreaState, string> = {
  default: 'text-gray-500',
  error: 'text-[#CA545A]',
  success: 'text-[#677D00]',
  warning: 'text-[#C5953B]',
};

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      variant = 'default',
      size = 'md',
      state = 'default',
      label,
      helperText,
      errorMessage,
      resize = 'vertical',
      className,
      containerClassName,
      disabled,
      showCharCount = false,
      maxLength,
      value,
      ...props
    },
    ref
  ) => {
    const textareaClasses = cn(
      // Base styles
      'w-full rounded-lg transition-all duration-200 outline-none',
      'placeholder:text-gray-400',
      // Variant styles
      variantClasses[variant],
      // Size styles
      sizeClasses[size],
      // State styles
      stateClasses[state],
      // Resize styles
      resizeClasses[resize],
      // Disabled styles
      disabled && 'bg-gray-50 text-gray-400 cursor-not-allowed',
      className
    );

    const displayHelperText = state === 'error' && errorMessage ? errorMessage : helperText;
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
      <div className={cn('w-full', containerClassName)}>
        {label && (
          <label className={cn('block text-sm font-medium mb-2', labelStateClasses[state])}>
            {label}
          </label>
        )}
        
        <textarea
          ref={ref}
          className={textareaClasses}
          disabled={disabled}
          maxLength={maxLength}
          value={value}
          {...props}
        />
        
        <div className="flex justify-between items-center mt-1">
          {displayHelperText && (
            <p className={cn('text-xs', helperTextStateClasses[state])}>
              {displayHelperText}
            </p>
          )}
          
          {showCharCount && maxLength && (
            <p className={cn(
              'text-xs ml-auto',
              currentLength > maxLength * 0.9 ? 'text-[#C5953B]' : 'text-gray-500',
              currentLength >= maxLength ? 'text-[#CA545A]' : ''
            )}>
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

export default TextArea;