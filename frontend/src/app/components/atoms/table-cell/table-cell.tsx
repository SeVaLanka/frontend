'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface TableCellProps {
  /** Cell content */
  children: React.ReactNode;
  /** Text alignment */
  align?: 'left' | 'center' | 'right';
  /** Custom className */
  className?: string;
  /** Cell width */
  width?: string;
  /** Whether this is a header cell */
  isHeader?: boolean;
  /** Cell click handler */
  onClick?: () => void;
}

export const TableCell: React.FC<TableCellProps> = ({
  children,
  align = 'left',
  className,
  width,
  isHeader = false,
  onClick,
}) => {
  const Component = isHeader ? 'th' : 'td';
  
  return (
    <Component
      className={cn(
        isHeader 
          ? 'px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider'
          : 'px-6 py-4 whitespace-nowrap text-gray-900 font-medium',
        align === 'center' && 'text-center',
        align === 'right' && 'text-right',
        align === 'left' && 'text-left',
        onClick && 'cursor-pointer hover:bg-gray-50',
        className
      )}
      style={{ width }}
      onClick={onClick}
      scope={isHeader ? 'col' : undefined}
    >
      {children}
    </Component>
  );
};

export default TableCell;