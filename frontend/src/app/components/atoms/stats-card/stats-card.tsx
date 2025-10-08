'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface StatsCardProps {
  /** Card title */
  title: string;
  /** Main value to display */
  value: string | number;
  /** Optional subtitle or description */
  subtitle?: string;
  /** Change indicator (positive, negative, or neutral) */
  change?: {
    value: string;
    type: 'increase' | 'decrease' | 'neutral';
  };
  /** Icon to display */
  icon?: React.ReactNode;
  /** Loading state */
  loading?: boolean;
  /** Custom className */
  className?: string;
  /** Background color theme */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'info';
}

const variantStyles = {
  default: 'bg-white border-gray-200',
  primary: 'bg-blue-50 border-blue-200',
  success: 'bg-green-50 border-green-200',
  warning: 'bg-yellow-50 border-yellow-200',
  info: 'bg-gray-50 border-gray-200',
};

const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-8 bg-gray-200 rounded w-3/4 mb-1"></div>
    <div className="h-3 bg-gray-200 rounded w-1/3"></div>
  </div>
);

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  change,
  icon,
  loading = false,
  className,
  variant = 'default',
}) => {
  if (loading) {
    return (
      <div className={cn(
        'p-6 rounded-xl border',
        variantStyles[variant],
        className
      )}>
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className={cn(
      'p-6 rounded-xl border transition-all duration-200 hover:shadow-lg',
      variantStyles[variant],
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
          {change && (
            <div className="flex items-center mt-2">
              <span className={cn(
                'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                change.type === 'increase' && 'bg-green-100 text-green-800',
                change.type === 'decrease' && 'bg-red-100 text-red-800',
                change.type === 'neutral' && 'bg-gray-100 text-gray-800'
              )}>
                {change.type === 'increase' && (
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {change.type === 'decrease' && (
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                {change.value}
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="ml-4 flex-shrink-0">
            <div className="w-12 h-12 bg-[#499537]/10 rounded-lg flex items-center justify-center text-[#499537]">
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;