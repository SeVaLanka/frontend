'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ReviewCardProps {
  /** Reviewer name */
  reviewerName: string;
  /** Reviewer avatar URL */
  reviewerAvatar?: string;
  /** Review rating (1-5) */
  rating: number;
  /** Review text */
  review: string;
  /** Review date */
  date: string;
  /** Service name */
  serviceName?: string;
  /** Card size */
  size?: 'sm' | 'md' | 'lg';
  /** Custom className */
  className?: string;
}

const sizeConfig = {
  sm: {
    padding: 'p-3',
    avatarSize: 'w-8 h-8',
    textSize: 'text-sm',
    nameSize: 'text-sm',
    reviewSize: 'text-xs',
  },
  md: {
    padding: 'p-4',
    avatarSize: 'w-10 h-10',
    textSize: 'text-base',
    nameSize: 'text-base',
    reviewSize: 'text-sm',
  },
  lg: {
    padding: 'p-6',
    avatarSize: 'w-12 h-12',
    textSize: 'text-lg',
    nameSize: 'text-lg',
    reviewSize: 'text-base',
  },
};

const StarRating = ({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) => {
  const starSize = size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5';
  
  return (
    <div className="flex items-center space-x-0.5">
      {Array.from({ length: 5 }, (_, index) => {
        const filled = index < Math.floor(rating);
        const partial = index === Math.floor(rating) && rating % 1 !== 0;
        
        return (
          <svg
            key={index}
            className={cn(
              starSize,
              filled || partial ? 'text-yellow-400' : 'text-gray-300'
            )}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      })}
    </div>
  );
};

export const ReviewCard: React.FC<ReviewCardProps> = ({
  reviewerName,
  reviewerAvatar,
  rating,
  review,
  date,
  serviceName,
  size = 'md',
  className,
}) => {
  const config = sizeConfig[size];
  
  // Generate initials for avatar fallback
  const initials = reviewerName
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={cn(
      'bg-white rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-md',
      config.padding,
      className
    )}>
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div className={cn(
          'flex-shrink-0 rounded-full bg-[#499537] flex items-center justify-center text-white font-medium',
          config.avatarSize
        )}>
          {reviewerAvatar ? (
            <img
              src={reviewerAvatar}
              alt={reviewerName}
              className={cn('rounded-full object-cover', config.avatarSize)}
            />
          ) : (
            <span className="text-xs">{initials}</span>
          )}
        </div>
        
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className={cn('font-medium text-gray-900 truncate', config.nameSize)}>
              {reviewerName}
            </h4>
            <time className="text-xs text-gray-500 flex-shrink-0 ml-2">
              {date}
            </time>
          </div>
          
          <div className="flex items-center space-x-2 mb-2">
            <StarRating rating={rating} size={size === 'sm' ? 'sm' : 'md'} />
            <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
          </div>
          
          {serviceName && (
            <p className="text-xs text-[#499537] font-medium mb-2">
              {serviceName}
            </p>
          )}
          
          <p className={cn(
            'text-gray-700 leading-relaxed line-clamp-3',
            config.reviewSize
          )}>
            {review}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;