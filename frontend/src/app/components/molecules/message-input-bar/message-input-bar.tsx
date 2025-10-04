'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { TextArea } from '@/app/components/atoms/textarea/textarea';

export interface MessageInputBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onSend?: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  autoFocus?: boolean;
}

const sizeConfig = {
  sm: { minHeight: 'min-h-[60px]', buttonSize: 'p-2', iconSize: 'w-4 h-4' },
  md: { minHeight: 'min-h-[80px]', buttonSize: 'p-3', iconSize: 'w-5 h-5' },
  lg: { minHeight: 'min-h-[100px]', buttonSize: 'p-4', iconSize: 'w-6 h-6' },
};

export const MessageInputBar: React.FC<MessageInputBarProps> = ({
  value,
  onChange,
  onSend,
  placeholder = 'Type your message...',
  disabled = false,
  loading = false,
  maxLength = 500,
  showCharCount = true,
  size = 'md',
  className,
  autoFocus = false,
}) => {
  const [internalValue, setInternalValue] = useState(value || '');
  const currentValue = value !== undefined ? value : internalValue;
  const config = sizeConfig[size];

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const handleSend = () => {
    if (currentValue.trim() && !disabled && !loading) {
      onSend?.(currentValue.trim());
      if (value === undefined) {
        setInternalValue('');
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = currentValue.trim().length > 0 && !disabled && !loading;

  const SendIcon = () => (
    <svg className={config.iconSize} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  );

  const AttachIcon = () => (
    <svg className={config.iconSize} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
    </svg>
  );

  return (
    <div className={cn('bg-white border border-gray-200 rounded-lg', className)}>
      <div className="relative">
        <TextArea
          value={currentValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          showCharCount={false}
          resize="none"
          size={size}
          className={cn(config.minHeight, 'border-0 rounded-lg focus:ring-0 resize-none pr-24')}
          autoFocus={autoFocus}
        />
        
        {/* Action Buttons */}
        <div className="absolute bottom-2 right-2 flex items-center space-x-2">
          {/* Attach Button */}
          <button
            type="button"
            disabled={disabled || loading}
            className={cn(
              'text-gray-400 hover:text-gray-600 transition-colors rounded-lg',
              config.buttonSize,
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            <AttachIcon />
          </button>

          {/* Send Button */}
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            className={cn(
              'rounded-lg transition-all duration-200',
              config.buttonSize,
              canSend
                ? 'bg-[#499537] text-white hover:bg-[#3a7a2e] focus:ring-2 focus:ring-[#499537]/20'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed',
              'focus:outline-none'
            )}
          >
            {loading ? (
              <div className={cn('animate-spin border-2 border-white border-t-transparent rounded-full', config.iconSize)} />
            ) : (
              <SendIcon />
            )}
          </button>
        </div>
      </div>

      {/* Character Count */}
      {showCharCount && (
        <div className="px-3 pb-2 flex justify-end">
          <span className={cn(
            'text-xs',
            currentValue.length > maxLength * 0.9 ? 'text-[#C5953B]' : 'text-gray-500',
            currentValue.length >= maxLength ? 'text-[#CA545A]' : ''
          )}>
            {currentValue.length}/{maxLength}
          </span>
        </div>
      )}
    </div>
  );
};

export default MessageInputBar;