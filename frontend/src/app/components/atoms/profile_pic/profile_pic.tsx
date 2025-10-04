'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export type ProfilePicSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ProfilePicProps {
  /** Image source URL */
  src?: string;
  /** Alt text for the image */
  alt: string;
  /** Size variant of the profile picture */
  size?: ProfilePicSize;
  /** User's initials to display as fallback */
  initials?: string;
  /** Custom className for additional styling */
  className?: string;
  /** Whether the profile picture should be clickable */
  onClick?: () => void;
  /** Custom fallback component */
  fallback?: React.ReactNode;
  /** Whether to show online status indicator */
  showStatus?: boolean;
  /** Online status */
  isOnline?: boolean;
}

const sizeClasses: Record<ProfilePicSize, string> = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
  '2xl': 'w-20 h-20 text-2xl',
};

const statusSizeClasses: Record<ProfilePicSize, string> = {
  xs: 'w-1.5 h-1.5 -top-0.5 -right-0.5',
  sm: 'w-2 h-2 -top-0.5 -right-0.5',
  md: 'w-2.5 h-2.5 -top-1 -right-1',
  lg: 'w-3 h-3 -top-1 -right-1',
  xl: 'w-4 h-4 -top-1.5 -right-1.5',
  '2xl': 'w-5 h-5 -top-2 -right-2',
};

export const ProfilePic: React.FC<ProfilePicProps> = ({
  src,
  alt,
  size = 'md',
  initials,
  className,
  onClick,
  fallback,
  showStatus = false,
  isOnline = false,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  // Generate initials from alt text if not provided
  const getInitials = () => {
    if (initials) return initials;
    return alt
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const baseClasses = cn(
    'relative inline-flex items-center justify-center rounded-full bg-gray-100 font-medium text-gray-600 overflow-hidden',
    sizeClasses[size],
    onClick && 'cursor-pointer hover:opacity-80 transition-opacity',
    className
  );

  const renderFallback = () => {
    if (fallback) {
      return fallback;
    }

    return (
      <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
        {getInitials()}
      </div>
    );
  };

  const renderStatusIndicator = () => {
    if (!showStatus) return null;

    return (
      <div
        className={cn(
          'absolute rounded-full border-2 border-white',
          statusSizeClasses[size],
          isOnline ? 'bg-green-500' : 'bg-gray-400'
        )}
      />
    );
  };

  return (
    <div className={baseClasses} onClick={onClick}>
      {src && !imageError ? (
        <>
          {imageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
              <div className="w-1/2 h-1/2 bg-gray-300 rounded"></div>
            </div>
          )}
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            onError={handleImageError}
            onLoad={handleImageLoad}
            sizes={`${sizeClasses[size].split(' ')[0].replace('w-', '')}px`}
          />
        </>
      ) : (
        renderFallback()
      )}
      {renderStatusIndicator()}
    </div>
  );
};

export default ProfilePic;
