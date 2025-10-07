'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { TableCell } from '../../atoms/table-cell/table-cell';
import { TableColumn } from '../table-header/table-header';

export interface TableRowProps {
  /** Row data */
  data: Record<string, any>;
  /** Table columns configuration */
  columns: TableColumn[];
  /** Whether this is an even row (for striping) */
  isEven?: boolean;
  /** Whether the row is clickable */
  clickable?: boolean;
  /** Click handler for the row */
  onClick?: (data: Record<string, any>) => void;
  /** Custom className */
  className?: string;
}

export const TableRow: React.FC<TableRowProps> = ({
  data,
  columns,
  isEven = false,
  clickable = false,
  onClick,
  className,
}) => {
  const handleRowClick = () => {
    if (clickable && onClick) {
      onClick(data);
    }
  };

  return (
    <tr
      className={cn(
        'border-b border-gray-100',
        isEven && 'bg-gray-50/50',
        clickable && 'hover:bg-blue-50 cursor-pointer',
        className
      )}
      onClick={handleRowClick}
    >
      {columns.map((column) => (
        <TableCell
          key={column.key}
          align={column.align}
          width={column.width}
        >
          {column.render ? column.render(data[column.key], data) : data[column.key]}
        </TableCell>
      ))}
    </tr>
  );
};

export default TableRow;