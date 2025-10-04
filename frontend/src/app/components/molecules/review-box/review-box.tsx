'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ProfilePic } from '@/app/components/atoms/profile_pic/profile_pic';

export interface ReviewBoxProps {
  user: {
    name: string;
    profileImage?: string;
  };
  rating: number;
  comment: string;
  date?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showDate?: boolean;
}

const sizeConfig = {
  sm: { padding: 'p-3', profileSize: 'sm' as const, nameSize: 'text-sm', commentSize: 'text-xs' },
  md: { padding: 'p-4', profileSize: 'md' as const, nameSize: 'text-base', commentSize: 'text-sm' },
  lg: { padding: 'p-6', profileSize: 'lg' as const, nameSize: 'text-lg', commentSize: 'text-base' },
};

export const ReviewBox: React.FC<ReviewBoxProps> = ({
  user,
  rating,
  comment,
  date,
  size = 'md',
  className,
  showDate = true,
}) => {
  const config = sizeConfig[size];

  const StarRating = ({ rating }: { rating: number }) => {
    const stars = Array.from({ length: 5 }, (_, index) => (
      <svg
        key={index}
        className={cn('w-4 h-4', index < rating ? 'text-[#C5953B]' : 'text-gray-300')}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
    return <div className="flex items-center">{stars}</div>;
  };

  return (
    <div className={cn(
      'bg-white rounded-lg border border-gray-200',
      config.padding,
      className
    )}>
      <div className="flex space-x-3">
        <ProfilePic
          src={user.profileImage}
          alt={user.name}
          size={config.profileSize}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className={cn('font-medium text-gray-900', config.nameSize)}>
              {user.name}
            </h4>
            {showDate && date && (
              <span className="text-xs text-gray-500">{date}</span>
            )}
          </div>
          <div className="mt-1">
            <StarRating rating={rating} />
          </div>
          <p className={cn('mt-2 text-gray-700', config.commentSize)}>
            {comment}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewBox;