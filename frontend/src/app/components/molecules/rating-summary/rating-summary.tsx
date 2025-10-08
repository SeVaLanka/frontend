'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { StarRating } from '../../atoms/star-rating/star-rating';

export interface RatingSummaryProps {
  /** Overall rating */
  overallRating: number;
  /** Total number of reviews */
  totalReviews: number;
  /** Rating label (e.g., "Very Good") */
  ratingLabel?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Custom className */
  className?: string;
}

const sizeConfig = {
  sm: {
    rating: 'text-4xl',
    label: 'text-sm',
    reviews: 'text-xs',
    stars: 'md' as const,
  },
  md: {
    rating: 'text-5xl',
    label: 'text-base',
    reviews: 'text-sm',
    stars: 'md' as const,
  },
  lg: {
    rating: 'text-6xl',
    label: 'text-lg',
    reviews: 'text-base',
    stars: 'lg' as const,
  },
};

export const RatingSummary: React.FC<RatingSummaryProps> = ({
  overallRating,
  totalReviews,
  ratingLabel,
  size = 'md',
  className,
}) => {
  const config = sizeConfig[size];

  return (
    <div className={cn('text-center space-y-3', className)}>
      {/* Overall Rating Number */}
      <div className={cn('font-bold text-gray-900', config.rating)}>
        {overallRating.toFixed(1)}
      </div>

      {/* Rating Label */}
      {ratingLabel && (
        <div className={cn('text-gray-600 font-medium', config.label)}>
          {ratingLabel}
        </div>
      )}

      {/* Star Rating */}
      <div className="flex justify-center">
        <StarRating
          rating={overallRating}
          size={config.stars}
          showValue={false}
        />
      </div>

      {/* Total Reviews */}
      <div className={cn('text-gray-500', config.reviews)}>
        {totalReviews.toLocaleString()} Reviews
      </div>
    </div>
  );
};

export default RatingSummary;