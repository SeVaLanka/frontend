'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ProgressBar } from '../../atoms/progress-bar/progress-bar';

export interface RatingDistributionItem {
  stars: number;
  count: number;
  percentage: number;
}

export interface RatingDistributionProps {
  /** Distribution data for each star rating */
  distribution: RatingDistributionItem[];
  /** Total number of reviews */
  totalReviews: number;
  /** Custom className */
  className?: string;
}

export const RatingDistribution: React.FC<RatingDistributionProps> = ({
  distribution,
  totalReviews,
  className,
}) => {
  // Sort distribution by stars (5 to 1)
  const sortedDistribution = [...distribution].sort((a, b) => b.stars - a.stars);

  return (
    <div className={cn('space-y-3', className)}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Rating Distribution
      </h3>
      
      {sortedDistribution.map((item) => (
        <div key={item.stars} className="flex items-center gap-3">
          {/* Star label */}
          <div className="flex items-center gap-1 w-16">
            <span className="text-sm font-medium text-gray-700">
              {item.stars}
            </span>
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>

          {/* Progress bar */}
          <div className="flex-1">
            <ProgressBar
              value={item.percentage}
              max={100}
              size="md"
              color="blue"
            />
          </div>

          {/* Count */}
          <div className="w-12 text-right">
            <span className="text-sm text-gray-600">
              {item.count}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RatingDistribution;