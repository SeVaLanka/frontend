'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressBarProps {
  /** Progress value (0-100) */
  value: number;
  /** Maximum value */
  max?: number;
  /** Size of progress bar */
  size?: 'sm' | 'md' | 'lg';
  /** Color variant */
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'gray';
  /** Whether to show value text */
  showValue?: boolean;
  /** Custom className */
  className?: string;
  /** Label for accessibility */
  label?: string;
}

const sizeConfig = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

const colorConfig = {
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-500',
  red: 'bg-red-500',
  gray: 'bg-gray-500',
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  size = 'md',
  color = 'blue',
  showValue = false,
  className,
  label,
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={cn('w-full', className)}>
      {/* Progress bar */}
      <div
        className={cn(
          'w-full bg-gray-200 rounded-full overflow-hidden',
          sizeConfig[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <div
          className={cn(
            'h-full transition-all duration-300 ease-out rounded-full',
            colorConfig[color]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      {/* Value text */}
      {showValue && (
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;