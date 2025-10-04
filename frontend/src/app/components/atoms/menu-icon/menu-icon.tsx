'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export type MenuIconSize = 'sm' | 'md' | 'lg';
export type MenuIconVariant = 'hamburger' | 'close' | 'animated';

export interface MenuIconProps {
  /** Size of the menu icon */
  size?: MenuIconSize;
  /** Variant of the menu icon */
  variant?: MenuIconVariant;
  /** Whether the menu is open (used with animated variant) */
  isOpen?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Custom className */
  className?: string;
  /** Color of the icon lines */
  color?: string;
  /** Whether the icon is disabled */
  disabled?: boolean;
  /** Accessibility label */
  'aria-label'?: string;
}

const sizeClasses: Record<MenuIconSize, { container: string; line: string }> = {
  sm: {
    container: 'w-5 h-5',
    line: 'h-0.5',
  },
  md: {
    container: 'w-6 h-6',
    line: 'h-0.5',
  },
  lg: {
    container: 'w-8 h-8',
    line: 'h-1',
  },
};

export const MenuIcon: React.FC<MenuIconProps> = ({
  size = 'md',
  variant = 'hamburger',
  isOpen = false,
  onClick,
  className,
  color = '#374151',
  disabled = false,
  'aria-label': ariaLabel = 'Menu',
}) => {
  const { container, line } = sizeClasses[size];

  const baseLineClasses = cn(
    'w-full rounded-full transition-all duration-300 ease-in-out',
    line,
    disabled && 'opacity-50'
  );

  const containerClasses = cn(
    'flex flex-col justify-center items-center cursor-pointer transition-all duration-200',
    container,
    disabled && 'cursor-not-allowed opacity-50',
    !disabled && 'hover:opacity-75',
    className
  );

  const lineStyle = { backgroundColor: color };

  const renderHamburger = () => (
    <div className={containerClasses} onClick={!disabled ? onClick : undefined} role="button" aria-label={ariaLabel}>
      <div className={cn(baseLineClasses, 'mb-1')} style={lineStyle} />
      <div className={cn(baseLineClasses, 'mb-1')} style={lineStyle} />
      <div className={baseLineClasses} style={lineStyle} />
    </div>
  );

  const renderClose = () => (
    <div className={containerClasses} onClick={!disabled ? onClick : undefined} role="button" aria-label={ariaLabel}>
      <div 
        className={cn(baseLineClasses, 'transform rotate-45 translate-y-0.5')} 
        style={lineStyle} 
      />
      <div 
        className={cn(baseLineClasses, 'transform -rotate-45 -translate-y-0.5')} 
        style={lineStyle} 
      />
    </div>
  );

  const renderAnimated = () => (
    <div className={containerClasses} onClick={!disabled ? onClick : undefined} role="button" aria-label={ariaLabel}>
      <div 
        className={cn(
          baseLineClasses,
          'mb-1 transform-gpu origin-center',
          isOpen ? 'rotate-45 translate-y-1.5' : ''
        )} 
        style={lineStyle} 
      />
      <div 
        className={cn(
          baseLineClasses,
          'mb-1 transform-gpu origin-center',
          isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
        )} 
        style={lineStyle} 
      />
      <div 
        className={cn(
          baseLineClasses,
          'transform-gpu origin-center',
          isOpen ? '-rotate-45 -translate-y-1.5' : ''
        )} 
        style={lineStyle} 
      />
    </div>
  );

  switch (variant) {
    case 'close':
      return renderClose();
    case 'animated':
      return renderAnimated();
    case 'hamburger':
    default:
      return renderHamburger();
  }
};

export default MenuIcon;