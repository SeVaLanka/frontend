'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface ServiceItemCardProps {
  /** Service title */
  title: string;
  /** Service description */
  description: string;
  /** Service icon (React component or image URL) */
  icon?: React.ReactNode | string;
  /** Service price */
  price?: number;
  /** Price unit (per hour, per day, etc.) */
  priceUnit?: string;
  /** Currency symbol */
  currency?: string;
  /** Service category */
  category?: string;
  /** Whether the service is featured */
  featured?: boolean;
  /** Whether the service is available */
  available?: boolean;
  /** Card size */
  size?: 'sm' | 'md' | 'lg';
  /** Card variant */
  variant?: 'default' | 'compact' | 'detailed';
  /** Whether the card is clickable */
  onClick?: () => void;
  /** Custom className */
  className?: string;
  /** Service rating */
  rating?: number;
  /** Number of bookings */
  bookingCount?: number;
  /** Provider name */
  providerName?: string;
}

const sizeConfig = {
  sm: {
    padding: 'p-4',
    iconSize: 'w-8 h-8',
    titleSize: 'text-sm',
    descriptionSize: 'text-xs',
    priceSize: 'text-lg',
  },
  md: {
    padding: 'p-6',
    iconSize: 'w-12 h-12',
    titleSize: 'text-base',
    descriptionSize: 'text-sm',
    priceSize: 'text-xl',
  },
  lg: {
    padding: 'p-8',
    iconSize: 'w-16 h-16',
    titleSize: 'text-lg',
    descriptionSize: 'text-base',
    priceSize: 'text-2xl',
  },
};

export const ServiceItemCard: React.FC<ServiceItemCardProps> = ({
  title,
  description,
  icon,
  price,
  priceUnit = 'per hour',
  currency = 'LKR',
  category,
  featured = false,
  available = true,
  size = 'md',
  variant = 'default',
  onClick,
  className,
  rating,
  bookingCount,
  providerName,
}) => {
  const config = sizeConfig[size];

  const renderIcon = () => {
    if (!icon) return null;

    if (typeof icon === 'string') {
      return (
        <div className={cn('relative overflow-hidden rounded-lg', config.iconSize)}>
          <Image
            src={icon}
            alt={title}
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>
      );
    }

    return (
      <div className={cn(
        'flex items-center justify-center rounded-lg bg-[#499537]/10 text-[#499537]',
        config.iconSize
      )}>
        {icon}
      </div>
    );
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

  const cardClasses = cn(
    'bg-white rounded-xl border transition-all duration-200 relative overflow-hidden',
    config.padding,
    onClick && 'cursor-pointer hover:shadow-lg hover:border-gray-300',
    featured && 'ring-2 ring-[#499537]/20 border-[#499537]',
    !available && 'opacity-60',
    variant === 'compact' && 'flex items-center space-x-4',
    className
  );

  const contentLayout = variant === 'compact' ? 'flex-1' : 'space-y-3';

  return (
    <div className={cardClasses} onClick={onClick}>
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#499537] text-white">
            Featured
          </span>
        </div>
      )}

      {/* Unavailable Overlay */}
      {!available && (
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#CA545A] text-white">
            Unavailable
          </span>
        </div>
      )}

      {/* Icon */}
      {variant !== 'compact' && (
        <div className="flex justify-center">
          {renderIcon()}
        </div>
      )}

      {variant === 'compact' && renderIcon()}

      {/* Content */}
      <div className={contentLayout}>
        {/* Category */}
        {category && (
          <div className="text-xs text-[#499537] font-medium uppercase tracking-wide">
            {category}
          </div>
        )}

        {/* Title */}
        <h3 className={cn('font-semibold text-gray-900', config.titleSize)}>
          {title}
        </h3>

        {/* Description */}
        <p className={cn('text-gray-600 leading-relaxed', config.descriptionSize)}>
          {description}
        </p>

        {/* Rating and Bookings (for detailed variant) */}
        {variant === 'detailed' && (rating || bookingCount) && (
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            {rating && (
              <div className="flex items-center space-x-1">
                <StarRating rating={rating} />
                <span>{rating.toFixed(1)}</span>
              </div>
            )}
            {bookingCount && (
              <span>{bookingCount} bookings</span>
            )}
          </div>
        )}

        {/* Provider Name (for detailed variant) */}
        {variant === 'detailed' && providerName && (
          <div className="text-sm text-gray-500">
            by <span className="font-medium text-gray-700">{providerName}</span>
          </div>
        )}

        {/* Price */}
        {price && (
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline space-x-1">
              <span className={cn('font-bold text-[#499537]', config.priceSize)}>
                {currency} {price.toLocaleString()}
              </span>
              {priceUnit && (
                <span className="text-sm text-gray-500">
                  {priceUnit}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceItemCard;