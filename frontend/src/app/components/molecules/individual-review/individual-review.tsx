'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { StarRating } from '../../atoms/star-rating/star-rating';

export interface IndividualReviewProps {
  /** Reviewer's name */
  reviewerName: string;
  /** Reviewer's avatar URL */
  reviewerAvatar?: string;
  /** Rating given */
  rating: number;
  /** Review text */
  reviewText: string;
  /** Date of review */
  date: string;
  /** Service name */
  serviceName?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Custom className */
  className?: string;
}

const sizeConfig = {
  sm: {
    avatar: 'w-8 h-8',
    name: 'text-sm',
    date: 'text-xs',
    review: 'text-sm',
    service: 'text-xs',
  },
  md: {
    avatar: 'w-10 h-10',
    name: 'text-base',
    date: 'text-sm',
    review: 'text-sm',
    service: 'text-sm',
  },
  lg: {
    avatar: 'w-12 h-12',
    name: 'text-lg',
    date: 'text-base',
    review: 'text-base',
    service: 'text-base',
  },
};

export const IndividualReview: React.FC<IndividualReviewProps> = ({
  reviewerName,
  reviewerAvatar,
  rating,
  reviewText,
  date,
  serviceName,
  size = 'md',
  className,
}) => {
  const config = sizeConfig[size];

  // Generate initials from name if no avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className={cn('bg-white border border-gray-200 rounded-lg p-4 space-y-3', className)}>
      {/* Header with avatar, name, date */}
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className={cn('flex-shrink-0 rounded-full overflow-hidden bg-gray-200', config.avatar)}>
          {reviewerAvatar ? (
            <img
              src={reviewerAvatar}
              alt={reviewerName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white font-medium text-xs">
              {getInitials(reviewerName)}
            </div>
          )}
        </div>

        {/* Name and date */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className={cn('font-semibold text-gray-900 truncate', config.name)}>
              {reviewerName}
            </h4>
            <span className={cn('text-gray-500 flex-shrink-0 ml-2', config.date)}>
              {date}
            </span>
          </div>
          
          {/* Service name */}
          {serviceName && (
            <p className={cn('text-gray-600 mt-1', config.service)}>
              Service: {serviceName}
            </p>
          )}
        </div>
      </div>

      {/* Star rating */}
      <div className="flex items-center gap-2">
        <StarRating rating={rating} size="sm" />
        <span className="text-sm text-gray-600">
          ({rating.toFixed(1)})
        </span>
      </div>

      {/* Review text */}
      <p className={cn('text-gray-700 leading-relaxed', config.review)}>
        {reviewText}
      </p>
    </div>
  );
};

export default IndividualReview;