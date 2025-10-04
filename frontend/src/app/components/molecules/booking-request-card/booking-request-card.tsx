'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ProfilePic } from '@/app/components/atoms/profile_pic/profile_pic';

export type BookingStatus = 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';

export interface BookingRequestCardProps {
  /** Customer information */
  customer: {
    name: string;
    profileImage?: string;
    rating?: number;
    location?: string;
  };
  /** Service details */
  service: {
    title: string;
    category?: string;
    duration?: string;
    price?: number;
    currency?: string;
  };
  /** Booking date and time */
  booking: {
    date: string;
    time?: string;
    notes?: string;
  };
  /** Current booking status */
  status: BookingStatus;
  /** Callback when accept button is clicked */
  onAccept?: () => void;
  /** Callback when reject button is clicked */
  onReject?: () => void;
  /** Callback when view details is clicked */
  onViewDetails?: () => void;
  /** Whether actions are loading */
  loading?: boolean;
  /** Custom className */
  className?: string;
  /** Card size */
  size?: 'sm' | 'md' | 'lg';
  /** Show action buttons based on status */
  showActions?: boolean;
}

const statusConfig: Record<BookingStatus, { bg: string; text: string; label: string }> = {
  pending: {
    bg: 'bg-[#C5953B]/10',
    text: 'text-[#C5953B]',
    label: 'Pending',
  },
  accepted: {
    bg: 'bg-[#499537]/10',
    text: 'text-[#499537]',
    label: 'Accepted',
  },
  rejected: {
    bg: 'bg-[#CA545A]/10',
    text: 'text-[#CA545A]',
    label: 'Rejected',
  },
  completed: {
    bg: 'bg-[#677D00]/10',
    text: 'text-[#677D00]',
    label: 'Completed',
  },
  cancelled: {
    bg: 'bg-gray-100',
    text: 'text-gray-600',
    label: 'Cancelled',
  },
};

const sizeConfig = {
  sm: {
    padding: 'p-4',
    spacing: 'space-y-3',
    profileSize: 'sm' as const,
    titleSize: 'text-sm',
    textSize: 'text-xs',
    buttonSize: 'px-3 py-1.5 text-xs',
  },
  md: {
    padding: 'p-6',
    spacing: 'space-y-4',
    profileSize: 'md' as const,
    titleSize: 'text-base',
    textSize: 'text-sm',
    buttonSize: 'px-4 py-2 text-sm',
  },
  lg: {
    padding: 'p-8',
    spacing: 'space-y-5',
    profileSize: 'lg' as const,
    titleSize: 'text-lg',
    textSize: 'text-base',
    buttonSize: 'px-6 py-3 text-base',
  },
};

export const BookingRequestCard: React.FC<BookingRequestCardProps> = ({
  customer,
  service,
  booking,
  status,
  onAccept,
  onReject,
  onViewDetails,
  loading = false,
  className,
  size = 'md',
  showActions = true,
}) => {
  const config = sizeConfig[size];
  const statusInfo = statusConfig[status];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const StarRating = ({ rating }: { rating: number }) => {
    const stars = Array.from({ length: 5 }, (_, index) => {
      const filled = index < Math.floor(rating);
      return (
        <svg
          key={index}
          className={cn(
            'w-3 h-3',
            filled ? 'text-[#C5953B]' : 'text-gray-300'
          )}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    });
    return <div className="flex items-center">{stars}</div>;
  };

  const CalendarIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  const ClockIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const LocationIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  const shouldShowActionButtons = showActions && status === 'pending' && !loading;

  return (
    <div className={cn(
      'bg-white rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-md',
      config.padding,
      className
    )}>
      <div className={config.spacing}>
        {/* Header with Status */}
        <div className="flex items-center justify-between">
          <h3 className={cn('font-semibold text-gray-900', config.titleSize)}>
            Booking Request
          </h3>
          <span className={cn(
            'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
            statusInfo.bg,
            statusInfo.text
          )}>
            {statusInfo.label}
          </span>
        </div>

        {/* Customer Info */}
        <div className="flex items-center space-x-3">
          <ProfilePic
            src={customer.profileImage}
            alt={customer.name}
            size={config.profileSize}
          />
          <div className="flex-1 min-w-0">
            <p className={cn('font-medium text-gray-900', config.textSize)}>
              {customer.name}
            </p>
            {customer.rating && (
              <div className="flex items-center space-x-1 mt-1">
                <StarRating rating={customer.rating} />
                <span className="text-xs text-gray-500">
                  {customer.rating.toFixed(1)}
                </span>
              </div>
            )}
            {customer.location && (
              <div className="flex items-center text-gray-500 mt-1">
                <LocationIcon />
                <span className={cn('ml-1', config.textSize)}>
                  {customer.location}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Service Details */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h4 className={cn('font-medium text-gray-900', config.textSize)}>
                {service.title}
              </h4>
              {service.category && (
                <p className="text-xs text-[#499537] mt-1">
                  {service.category}
                </p>
              )}
              {service.duration && (
                <div className="flex items-center text-gray-500 mt-1">
                  <ClockIcon />
                  <span className={cn('ml-1', config.textSize)}>
                    {service.duration}
                  </span>
                </div>
              )}
            </div>
            {service.price && (
              <div className="text-right">
                <p className={cn('font-bold text-[#499537]', config.titleSize)}>
                  {service.currency || 'LKR'} {service.price.toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Booking Date/Time */}
        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-600">
              <CalendarIcon />
              <span className={cn('ml-2', config.textSize)}>
                {formatDate(booking.date)}
              </span>
            </div>
            {booking.time && (
              <div className="flex items-center text-gray-600">
                <ClockIcon />
                <span className={cn('ml-2', config.textSize)}>
                  {booking.time}
                </span>
              </div>
            )}
          </div>
          {booking.notes && (
            <div className="mt-2">
              <p className={cn('text-gray-600 italic', config.textSize)}>
                &ldquo;{booking.notes}&rdquo;
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {shouldShowActionButtons && (
          <div className="border-t border-gray-100 pt-4">
            <div className="flex space-x-3">
              <button
                onClick={onAccept}
                disabled={loading}
                className={cn(
                  'flex-1 bg-[#499537] text-white font-medium rounded-lg transition-colors duration-200',
                  'hover:bg-[#3a7a2e] focus:outline-none focus:ring-2 focus:ring-[#499537]/20',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  config.buttonSize
                )}
              >
                Accept
              </button>
              <button
                onClick={onReject}
                disabled={loading}
                className={cn(
                  'flex-1 bg-white text-[#CA545A] border border-[#CA545A] font-medium rounded-lg transition-colors duration-200',
                  'hover:bg-[#CA545A] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#CA545A]/20',
                  'disabled:opacity-50 disabled:cursor-not-allowed',
                  config.buttonSize
                )}
              >
                Reject
              </button>
            </div>
          </div>
        )}

        {/* View Details Button (for non-pending status) */}
        {showActions && status !== 'pending' && onViewDetails && (
          <div className="border-t border-gray-100 pt-4">
            <button
              onClick={onViewDetails}
              disabled={loading}
              className={cn(
                'w-full bg-gray-50 text-gray-700 border border-gray-200 font-medium rounded-lg transition-colors duration-200',
                'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500/20',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                config.buttonSize
              )}
            >
              View Details
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingRequestCard;