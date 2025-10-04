'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ProfilePic } from '@/app/components/atoms/profile_pic/profile_pic';

export type UserRole = 'customer' | 'service-provider' | 'admin';

export interface ProfileCardProps {
  /** User's profile image URL */
  imageUrl?: string;
  /** User's full name */
  name: string;
  /** User's role */
  role: UserRole;
  /** User's rating (0-5) */
  rating?: number;
  /** Number of reviews */
  reviewCount?: number;
  /** User's location */
  location?: string;
  /** Whether user is online */
  isOnline?: boolean;
  /** Whether to show status indicator */
  showStatus?: boolean;
  /** Card size */
  size?: 'sm' | 'md' | 'lg';
  /** Card orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Whether the card is clickable */
  onClick?: () => void;
  /** Custom className */
  className?: string;
  /** Additional information to display */
  subtitle?: string;
  /** Whether to show role badge */
  showRoleBadge?: boolean;
}

const roleColors: Record<UserRole, { bg: string; text: string; border: string }> = {
  'customer': {
    bg: 'bg-[#3D98D1]/10',
    text: 'text-[#3D98D1]',
    border: 'border-[#3D98D1]/20',
  },
  'service-provider': {
    bg: 'bg-[#499537]/10',
    text: 'text-[#499537]',
    border: 'border-[#499537]/20',
  },
  'admin': {
    bg: 'bg-[#C2B7DA]/10',
    text: 'text-[#7C3AED]',
    border: 'border-[#C2B7DA]/20',
  },
};

const sizeConfig = {
  sm: {
    profileSize: 'sm' as const,
    nameText: 'text-sm',
    subtitleText: 'text-xs',
    badgeText: 'text-xs',
    spacing: 'space-y-1',
    padding: 'p-3',
  },
  md: {
    profileSize: 'md' as const,
    nameText: 'text-base',
    subtitleText: 'text-sm',
    badgeText: 'text-xs',
    spacing: 'space-y-2',
    padding: 'p-4',
  },
  lg: {
    profileSize: 'lg' as const,
    nameText: 'text-lg',
    subtitleText: 'text-base',
    badgeText: 'text-sm',
    spacing: 'space-y-3',
    padding: 'p-6',
  },
};

export const ProfileCard: React.FC<ProfileCardProps> = ({
  imageUrl,
  name,
  role,
  rating,
  reviewCount,
  location,
  isOnline = false,
  showStatus = true,
  size = 'md',
  orientation = 'horizontal',
  onClick,
  className,
  subtitle,
  showRoleBadge = true,
}) => {
  const config = sizeConfig[size];
  const roleConfig = roleColors[role];

  const formatRole = (role: UserRole) => {
    return role.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const StarRating = ({ rating }: { rating: number }) => {
    const stars = Array.from({ length: 5 }, (_, index) => {
      const filled = index < Math.floor(rating);
      const halfFilled = index === Math.floor(rating) && rating % 1 !== 0;
      
      return (
        <svg
          key={index}
          className={cn(
            'w-4 h-4',
            filled || halfFilled ? 'text-[#C5953B]' : 'text-gray-300'
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
    'bg-white rounded-lg border border-gray-200 transition-all duration-200',
    config.padding,
    onClick && 'cursor-pointer hover:shadow-md hover:border-gray-300',
    orientation === 'horizontal' ? 'flex items-center space-x-4' : `flex flex-col items-center text-center ${config.spacing}`,
    className
  );

  const contentClasses = cn(
    orientation === 'horizontal' ? 'flex-1 min-w-0' : 'w-full',
    orientation === 'vertical' ? config.spacing : 'space-y-1'
  );

  return (
    <div className={cardClasses} onClick={onClick}>
      {/* Profile Picture */}
      <div className={cn(orientation === 'vertical' && 'flex-shrink-0')}>
        <ProfilePic
          src={imageUrl}
          alt={name}
          size={config.profileSize}
          showStatus={showStatus}
          isOnline={isOnline}
        />
      </div>

      {/* Content */}
      <div className={contentClasses}>
        {/* Name and Role Badge */}
        <div className={cn(
          'flex items-center',
          orientation === 'vertical' ? 'justify-center space-x-2' : 'space-x-2'
        )}>
          <h3 className={cn('font-semibold text-gray-900 truncate', config.nameText)}>
            {name}
          </h3>
          {showRoleBadge && (
            <span className={cn(
              'inline-flex items-center px-2 py-1 rounded-full border font-medium',
              config.badgeText,
              roleConfig.bg,
              roleConfig.text,
              roleConfig.border
            )}>
              {formatRole(role)}
            </span>
          )}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <p className={cn('text-gray-600 truncate', config.subtitleText)}>
            {subtitle}
          </p>
        )}

        {/* Rating */}
        {rating !== undefined && (
          <div className={cn(
            'flex items-center',
            orientation === 'vertical' ? 'justify-center space-x-2' : 'space-x-2'
          )}>
            <StarRating rating={rating} />
            <span className={cn('text-gray-600', config.subtitleText)}>
              {rating.toFixed(1)}
              {reviewCount !== undefined && ` (${reviewCount})`}
            </span>
          </div>
        )}

        {/* Location */}
        {location && (
          <div className={cn(
            'flex items-center text-gray-500',
            orientation === 'vertical' ? 'justify-center' : ''
          )}>
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className={config.subtitleText}>{location}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;