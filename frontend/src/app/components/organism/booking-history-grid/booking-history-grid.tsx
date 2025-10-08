'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { BookingHistoryCard, BookingHistoryCardProps } from '../../molecules/booking-history-card/booking-history-card';

export interface BookingHistoryGridProps {
  /** Array of booking history items */
  bookings: BookingHistoryCardProps[];
  /** Grid columns configuration */
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  /** Loading state */
  loading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Empty state description */
  emptyDescription?: string;
  /** Custom className */
  className?: string;
  /** Gap between cards */
  gap?: 'sm' | 'md' | 'lg';
}

const getGridClasses = (columns: BookingHistoryGridProps['columns']) => {
  const mobile = columns?.mobile || 1;
  const tablet = columns?.tablet || 2;
  const desktop = columns?.desktop || 3;

  // Use explicit classes to ensure they're included in the build
  const mobileClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  const tabletClasses = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  };

  const desktopClasses = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
  };

  return cn(
    mobileClasses[mobile as keyof typeof mobileClasses] || 'grid-cols-1',
    tabletClasses[tablet as keyof typeof tabletClasses] || 'md:grid-cols-2',
    desktopClasses[desktop as keyof typeof desktopClasses] || 'lg:grid-cols-3'
  );
};

const getGapClass = (gap: BookingHistoryGridProps['gap']) => {
  switch (gap) {
    case 'sm':
      return 'gap-4';
    case 'md':
      return 'gap-6';
    case 'lg':
      return 'gap-8';
    default:
      return 'gap-6';
  }
};

const LoadingSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
    <div className="h-48 bg-gray-200" />
    <div className="p-4 space-y-3">
      <div className="h-6 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="flex space-x-4">
        <div className="h-4 bg-gray-200 rounded w-20" />
        <div className="h-4 bg-gray-200 rounded w-16" />
      </div>
      <div className="h-6 bg-gray-200 rounded w-24" />
      <div className="flex space-x-2">
        <div className="h-8 bg-gray-200 rounded w-20" />
        <div className="h-8 bg-gray-200 rounded w-24" />
      </div>
    </div>
  </div>
);

const EmptyState = ({ 
  message = "No bookings found", 
  description = "You haven't made any bookings yet. Start exploring our services!" 
}: { 
  message?: string; 
  description?: string; 
}) => (
  <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
    <div className="w-24 h-24 mx-auto mb-4 text-gray-300">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1} 
          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
        />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-gray-900 mb-2">{message}</h3>
    <p className="text-gray-500 max-w-md">{description}</p>
  </div>
);

export const BookingHistoryGrid: React.FC<BookingHistoryGridProps> = ({
  bookings,
  columns = { mobile: 1, tablet: 2, desktop: 3 },
  loading = false,
  emptyMessage,
  emptyDescription,
  className,
  gap = 'md',
}) => {
  const gridClasses = getGridClasses(columns);
  const gapClass = getGapClass(gap);

  if (loading) {
    return (
      <div className={cn('grid', gridClasses, gapClass, className)}>
        {Array.from({ length: 6 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <div className={cn('grid', gridClasses, className)}>
        <EmptyState message={emptyMessage} description={emptyDescription} />
      </div>
    );
  }

  return (
    <div className={cn('grid', gridClasses, gapClass, className)}>
      {bookings.map((booking, index) => (
        <BookingHistoryCard
          key={index}
          {...booking}
        />
      ))}
    </div>
  );
};

export default BookingHistoryGrid;