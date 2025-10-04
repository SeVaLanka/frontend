'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface EarningsSummaryCardProps {
  amount: number;
  currency?: string;
  period: string;
  change?: number;
  changeType?: 'increase' | 'decrease';
  icon?: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

const sizeConfig = {
  sm: { padding: 'p-4', amountSize: 'text-xl', titleSize: 'text-sm' },
  md: { padding: 'p-6', amountSize: 'text-2xl', titleSize: 'text-base' },
  lg: { padding: 'p-8', amountSize: 'text-3xl', titleSize: 'text-lg' },
};

export const EarningsSummaryCard: React.FC<EarningsSummaryCardProps> = ({
  amount,
  currency = 'LKR',
  period,
  change,
  changeType,
  icon,
  title = 'Earnings',
  size = 'md',
  className,
  onClick,
}) => {
  const config = sizeConfig[size];

  const MoneyIcon = () => (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
    </svg>
  );

  return (
    <div className={cn(
      'bg-white rounded-lg border border-gray-200 transition-all duration-200',
      config.padding,
      onClick && 'cursor-pointer hover:shadow-md',
      className
    )} onClick={onClick}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <div className="text-[#499537]">
              {icon || <MoneyIcon />}
            </div>
            <h3 className={cn('font-medium text-gray-700', config.titleSize)}>
              {title}
            </h3>
          </div>
          <p className={cn('font-bold text-gray-900', config.amountSize)}>
            {currency} {amount.toLocaleString()}
          </p>
          <p className="text-sm text-gray-500 mt-1">{period}</p>
          {change !== undefined && (
            <div className={cn(
              'flex items-center mt-2 text-sm',
              changeType === 'increase' ? 'text-[#677D00]' : 'text-[#CA545A]'
            )}>
              <span>{changeType === 'increase' ? '↗' : '↘'}</span>
              <span className="ml-1">{Math.abs(change)}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EarningsSummaryCard;