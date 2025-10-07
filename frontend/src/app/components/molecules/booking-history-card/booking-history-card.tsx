'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '../../atoms/button/button';

export interface BookingHistoryCardProps {
  /** Service title */
  title: string;
  /** Service provider name */
  providerName: string;
  /** Service image URL */
  imageUrl: string;
  /** Booking date */
  date: string;
  /** Booking time */
  time: string;
  /** Booking status */
  status: 'completed' | 'pending' | 'cancelled';
  /** Booking price */
  price?: number;
  /** Currency symbol */
  currency?: string;
  /** Whether booking can be reviewed */
  canReview?: boolean;
  /** Whether booking details can be viewed */
  canViewDetails?: boolean;
  /** Whether booking can be rebooked */
  canRebook?: boolean;
  /** Card click handler */
  onClick?: () => void;
  /** Review button click handler */
  onReview?: () => void;
  /** View details button click handler */
  onViewDetails?: () => void;
  /** Rebook button click handler */
  onRebook?: () => void;
  /** Custom className */
  className?: string;
}

const getStatusConfig = (status: BookingHistoryCardProps['status']) => {
  switch (status) {
    case 'completed':
      return {
        color: 'bg-[#677D00] text-white',
        label: 'Completed'
      };
    case 'pending':
      return {
        color: 'bg-[#C5953B] text-white',
        label: 'Pending'
      };
    case 'cancelled':
      return {
        color: 'bg-[#CA545A] text-white',
        label: 'Cancelled'
      };
    default:
      return {
        color: 'bg-gray-500 text-white',
        label: 'Unknown'
      };
  }
};

export const BookingHistoryCard: React.FC<BookingHistoryCardProps> = ({
  title,
  providerName,
  imageUrl,
  date,
  time,
  status,
  price,
  currency = 'LKR',
  canReview = false,
  canViewDetails = true,
  canRebook = false,
  onClick,
  onReview,
  onViewDetails,
  onRebook,
  className,
}) => {
  const statusConfig = getStatusConfig(status);
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    console.log('Image failed to load:', imgSrc);
    setHasError(true);
    setImgSrc('/service-placeholder.svg');
  };

  return (
    <div 
      className={cn(
        'bg-white rounded-xl border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-gray-300',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {/* Service Image */}
      <div className="relative h-48 w-full bg-gray-200">
        {hasError ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm text-gray-500">{title}</span>
            </div>
          </div>
        ) : (
          <Image
            src={imgSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={handleImageError}
            priority={false}
          />
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={cn(
            'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
            statusConfig.color
          )}>
            {statusConfig.label}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-3">
        {/* Service Title */}
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {title}
        </h3>

        {/* Provider Name */}
        <p className="text-sm text-gray-600">
          <span className="text-gray-500">by</span>{' '}
          <span className="font-medium text-gray-700">{providerName}</span>
        </p>

        {/* Date and Time */}
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{date}</span>
          </div>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{time}</span>
          </div>
        </div>

        {/* Price */}
        {price && (
          <div className="text-lg font-bold text-[#499537]">
            {currency} {price.toLocaleString()}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-2">
          {canReview && status === 'completed' && (
            <Button
              size="sm"
              variant="primary"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                onReview?.();
              }}
              className="bg-[#499537] hover:bg-[#499537]/90"
            >
              Write Review
            </Button>
          )}
          
          {canViewDetails && (
            <Button
              size="sm"
              variant="outline"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                onViewDetails?.();
              }}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              View Details
            </Button>
          )}
          
          {canRebook && (
            <Button
              size="sm"
              variant="secondary"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                onRebook?.();
              }}
              className="bg-[#3D98D1] hover:bg-[#3D98D1]/90"
            >
              Re-book
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingHistoryCard;