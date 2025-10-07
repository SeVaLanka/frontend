'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface StarRatingProps {
  /** Rating value (0-5) */
  rating: number;
  /** Maximum number of stars */
  maxStars?: number;
  /** Size of stars */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show rating value */
  showValue?: boolean;
  /** Whether stars are interactive */
  interactive?: boolean;
  /** Callback when rating changes */
  onChange?: (rating: number) => void;
  /** Custom className */
  className?: string;
}

const sizeConfig = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxStars = 5,
  size = 'md',
  showValue = false,
  interactive = false,
  onChange,
  className,
}) => {
  const handleStarClick = (starIndex: number) => {
    if (interactive && onChange) {
      onChange(starIndex + 1);
    }
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {/* Stars */}
      <div className="flex">
        {Array.from({ length: maxStars }).map((_, index) => {
          const isFilled = index < Math.floor(rating);
          const isHalfFilled = index === Math.floor(rating) && rating % 1 !== 0;
          
          return (
            <button
              key={index}
              type="button"
              className={cn(
                'relative transition-colors',
                interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default',
                sizeConfig[size]
              )}
              onClick={() => handleStarClick(index)}
              disabled={!interactive}
            >
              {/* Background star */}
              <svg
                className={cn('absolute inset-0 text-gray-300', sizeConfig[size])}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              
              {/* Filled star */}
              <svg
                className={cn(
                  'relative text-yellow-400 transition-all',
                  sizeConfig[size],
                  isFilled ? 'opacity-100' : 'opacity-0'
                )}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              
              {/* Half-filled star */}
              {isHalfFilled && (
                <svg
                  className={cn('relative text-yellow-400', sizeConfig[size])}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)' }}
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
      
      {/* Rating value */}
      {showValue && (
        <span className="text-sm font-medium text-gray-700">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;