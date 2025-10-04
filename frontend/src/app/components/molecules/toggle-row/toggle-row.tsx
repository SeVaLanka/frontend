'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Toggle } from '@/app/components/atoms/toggle/toggle';

export interface ToggleRowProps {
  /** Label text for the toggle */
  label: string;
  /** Description text below the label */
  description?: string;
  /** Whether the toggle is checked */
  checked: boolean;
  /** Callback when toggle state changes */
  onChange: (checked: boolean) => void;
  /** Whether the toggle is disabled */
  disabled?: boolean;
  /** Icon to display next to the label */
  icon?: React.ReactNode;
  /** Size of the toggle row */
  size?: 'sm' | 'md' | 'lg';
  /** Custom className for the container */
  className?: string;
  /** Whether to show a border */
  showBorder?: boolean;
  /** Background color when hovered */
  hoverEffect?: boolean;
}

const sizeClasses = {
  sm: {
    container: 'py-3',
    label: 'text-sm',
    description: 'text-xs',
    iconSize: 'w-4 h-4',
  },
  md: {
    container: 'py-4',
    label: 'text-base',
    description: 'text-sm',
    iconSize: 'w-5 h-5',
  },
  lg: {
    container: 'py-5',
    label: 'text-lg',
    description: 'text-base',
    iconSize: 'w-6 h-6',
  },
};

export const ToggleRow: React.FC<ToggleRowProps> = ({
  label,
  description,
  checked,
  onChange,
  disabled = false,
  icon,
  size = 'md',
  className,
  showBorder = true,
  hoverEffect = true,
}) => {
  const config = sizeClasses[size];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled) {
      onChange(e.target.checked);
    }
  };

  const containerClasses = cn(
    'flex items-center justify-between px-4 transition-colors duration-200',
    config.container,
    showBorder && 'border-b border-gray-200 last:border-b-0',
    hoverEffect && !disabled && 'hover:bg-gray-50',
    disabled && 'opacity-60',
    className
  );

  return (
    <div className={containerClasses}>
      {/* Left side content */}
      <div className="flex items-start space-x-3 flex-1 min-w-0">
        {/* Icon */}
        {icon && (
          <div className={cn('flex-shrink-0 text-gray-500 mt-0.5', config.iconSize)}>
            {icon}
          </div>
        )}

        {/* Label and Description */}
        <div className="flex-1 min-w-0">
          <div className={cn('font-medium text-gray-900', config.label)}>
            {label}
          </div>
          {description && (
            <div className={cn('text-gray-500 mt-1 leading-relaxed', config.description)}>
              {description}
            </div>
          )}
        </div>
      </div>

      {/* Toggle Switch */}
      <div className="flex-shrink-0 ml-4">
        <Toggle
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          size={size}
        />
      </div>
    </div>
  );
};

export default ToggleRow;