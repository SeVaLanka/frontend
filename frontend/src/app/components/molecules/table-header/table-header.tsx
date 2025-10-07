'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { TableCell } from '../../atoms/table-cell/table-cell';

export interface TableColumn {
  key: string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => React.ReactNode;
}

export interface TableHeaderProps {
  /** Table columns configuration */
  columns: TableColumn[];
  /** Custom className */
  className?: string;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  columns,
  className,
}) => {
  return (
    <thead className={cn('bg-gray-50', className)}>
      <tr>
        {columns.map((column) => (
          <TableCell
            key={column.key}
            isHeader
            align={column.align}
            width={column.width}
          >
            {column.header}
          </TableCell>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;