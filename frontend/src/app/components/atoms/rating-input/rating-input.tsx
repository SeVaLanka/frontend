'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface RatingInputProps {
  /** Current rating value */
  value: number;
  /** Maximum number of stars */
  maxStars?: number;
  /** Size of stars */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the rating is disabled */
  disabled?: boolean;
  /** Callback when rating changes */
  onChange?: (rating: number) => void;
  /** Custom className */
  className?: string;
  /** Error state */
  error?: boolean;
  /** Required field */
  required?: boolean;
}

const sizeConfig = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
};

export const RatingInput: React.FC<RatingInputProps> = ({
  value,
  maxStars = 5,
  size = 'lg',
  disabled = false,
  onChange,
  className,
  error = false,
  required = false,
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (starIndex: number) => {
    if (!disabled && onChange) {
      const newRating = starIndex + 1;
      onChange(newRating === value ? 0 : newRating);
    }
  };

  const handleStarHover = (starIndex: number) => {
    if (!disabled) {
      setHoverRating(starIndex + 1);
    }
  };

  const handleMouseLeave = () => {
    if (!disabled) {
      setHoverRating(0);
    }
  };

  const displayRating = hoverRating || value;

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Array.from({ length: maxStars }).map((_, index) => {
        const isFilled = index < displayRating;
        const isHovered = hoverRating > 0 && index < hoverRating;
        
        return (
          <button
            key={index}
            type="button"
            className={cn(
              'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded',
              sizeConfig[size],
              !disabled && 'cursor-pointer hover:scale-110 active:scale-95',
              disabled && 'cursor-not-allowed opacity-50',
              error && 'text-red-400'
            )}
            onClick={() => handleStarClick(index)}
            onMouseEnter={() => handleStarHover(index)}
            onMouseLeave={handleMouseLeave}
            disabled={disabled}
            aria-label={`Rate ${index + 1} out of ${maxStars} stars`}
          >
            <svg
              className={cn(
                'w-full h-full transition-colors',
                isFilled
                  ? isHovered
                    ? 'text-yellow-500'
                    : 'text-yellow-400'
                  : 'text-gray-300',
                !disabled && 'hover:text-yellow-500'
              )}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        );
      })}
      {required && value === 0 && (
        <span className="text-red-500 text-sm ml-2">*</span>
      )}
    </div>
  );
};

export default RatingInput;