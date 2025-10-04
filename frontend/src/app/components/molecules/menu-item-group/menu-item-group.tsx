'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
  badge?: string | number;
  description?: string;
}

export interface MenuItemGroupProps {
  items: MenuItemProps[];
  orientation?: 'vertical' | 'horizontal';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showDividers?: boolean;
}

const sizeConfig = {
  sm: {
    padding: 'px-3 py-2',
    iconSize: 'w-4 h-4',
    textSize: 'text-sm',
    descSize: 'text-xs',
    badgeSize: 'text-xs px-2 py-0.5',
  },
  md: {
    padding: 'px-4 py-3',
    iconSize: 'w-5 h-5',
    textSize: 'text-base',
    descSize: 'text-sm',
    badgeSize: 'text-xs px-2 py-1',
  },
  lg: {
    padding: 'px-6 py-4',
    iconSize: 'w-6 h-6',
    textSize: 'text-lg',
    descSize: 'text-base',
    badgeSize: 'text-sm px-3 py-1',
  },
};

export const MenuItemGroup: React.FC<MenuItemGroupProps> = ({
  items,
  orientation = 'vertical',
  size = 'md',
  className,
  showDividers = true,
}) => {
  const config = sizeConfig[size];

  const MenuItem: React.FC<MenuItemProps & { index: number; total: number }> = ({
    icon,
    label,
    onClick,
    active = false,
    disabled = false,
    badge,
    description,
    index,
    total,
  }) => {
    return (
      <div
        className={cn(
          'relative flex items-center transition-all duration-200 cursor-pointer group',
          config.padding,
          orientation === 'horizontal' ? 'flex-col text-center' : 'flex-row',
          active && 'bg-[#499537]/10 text-[#499537]',
          !active && !disabled && 'text-gray-700 hover:bg-gray-50 hover:text-[#499537]',
          disabled && 'text-gray-400 cursor-not-allowed',
          showDividers && orientation === 'vertical' && index < total - 1 && 'border-b border-gray-100',
          'rounded-lg'
        )}
        onClick={!disabled ? onClick : undefined}
      >
        {/* Icon */}
        <div className={cn(
          'flex-shrink-0',
          config.iconSize,
          orientation === 'horizontal' ? 'mb-2' : 'mr-3'
        )}>
          {icon}
        </div>

        {/* Content */}
        <div className={cn(
          'flex-1 min-w-0',
          orientation === 'horizontal' ? 'text-center' : 'text-left'
        )}>
          <div className="flex items-center justify-between">
            <span className={cn('font-medium truncate', config.textSize)}>
              {label}
            </span>
            {badge && (
              <span className={cn(
                'ml-2 bg-[#499537] text-white rounded-full font-medium',
                config.badgeSize
              )}>
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className={cn('text-gray-500 mt-1 truncate', config.descSize)}>
              {description}
            </p>
          )}
        </div>

        {/* Active Indicator */}
        {active && orientation === 'vertical' && (
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-[#499537] rounded-r-full" />
        )}

        {/* Hover Effect Arrow */}
        {orientation === 'vertical' && !disabled && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn(
      'bg-white rounded-lg border border-gray-200 overflow-hidden',
      orientation === 'horizontal' && 'flex divide-x divide-gray-100',
      className
    )}>
      {items.map((item, index) => (
        <MenuItem
          key={`${item.label}-${index}`}
          {...item}
          index={index}
          total={items.length}
        />
      ))}
    </div>
  );
};

export default MenuItemGroup;