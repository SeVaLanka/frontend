'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export type NotificationType = 'info' | 'success' | 'warning' | 'error' | 'booking';

export interface NotificationItemProps {
  type: NotificationType;
  message: string;
  timestamp: string;
  read?: boolean;
  onClick?: () => void;
  onMarkAsRead?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const typeConfig: Record<NotificationType, { icon: React.ReactNode; color: string; bg: string }> = {
  info: {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'text-[#627ACE]',
    bg: 'bg-[#627ACE]/10',
  },
  success: {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'text-[#677D00]',
    bg: 'bg-[#677D00]/10',
  },
  warning: {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    ),
    color: 'text-[#C5953B]',
    bg: 'bg-[#C5953B]/10',
  },
  error: {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'text-[#CA545A]',
    bg: 'bg-[#CA545A]/10',
  },
  booking: {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: 'text-[#499537]',
    bg: 'bg-[#499537]/10',
  },
};

const sizeConfig = {
  sm: { padding: 'p-3', textSize: 'text-sm', timestampSize: 'text-xs' },
  md: { padding: 'p-4', textSize: 'text-base', timestampSize: 'text-sm' },
  lg: { padding: 'p-5', textSize: 'text-lg', timestampSize: 'text-base' },
};

export const NotificationItem: React.FC<NotificationItemProps> = ({
  type,
  message,
  timestamp,
  read = false,
  onClick,
  onMarkAsRead,
  className,
  size = 'md',
}) => {
  const config = sizeConfig[size];
  const typeInfo = typeConfig[type];

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className={cn(
      'flex items-start space-x-3 transition-all duration-200 border-b border-gray-100 last:border-b-0',
      config.padding,
      !read && 'bg-blue-50/30',
      onClick && 'cursor-pointer hover:bg-gray-50',
      className
    )} onClick={onClick}>
      {/* Icon */}
      <div className={cn('flex-shrink-0 p-2 rounded-full', typeInfo.bg, typeInfo.color)}>
        {typeInfo.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className={cn('text-gray-900', config.textSize)}>
          {message}
        </p>
        <p className={cn('text-gray-500 mt-1', config.timestampSize)}>
          {formatTimestamp(timestamp)}
        </p>
      </div>

      {/* Unread Indicator */}
      {!read && (
        <div className="flex-shrink-0">
          <div className="w-2 h-2 bg-[#499537] rounded-full"></div>
        </div>
      )}

      {/* Mark as Read Button */}
      {!read && onMarkAsRead && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMarkAsRead();
          }}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default NotificationItem;