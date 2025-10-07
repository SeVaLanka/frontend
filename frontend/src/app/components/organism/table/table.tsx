'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { TableHeader, TableColumn } from '../../molecules/table-header/table-header';
import { TableRow } from '../../molecules/table-row/table-row';

const sizeConfig = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

const LoadingSkeleton = ({ columns }: { columns: TableColumn[] }) => (
  <>
    {Array.from({ length: 5 }).map((_, rowIndex) => (
      <tr key={rowIndex} className="animate-pulse">
        {columns.map((column, colIndex) => (
          <td key={colIndex} className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </td>
        ))}
      </tr>
    ))}
  </>
);

export interface TableProps {
  /** Table columns configuration */
  columns: TableColumn[];
  /** Table data */
  data: Record<string, any>[];
  /** Loading state */
  loading?: boolean;
  /** Empty state message */
  emptyMessage?: string;
  /** Table size */
  size?: 'sm' | 'md' | 'lg';
  /** Show table borders */
  bordered?: boolean;
  /** Striped rows */
  striped?: boolean;
  /** Hover effect on rows */
  hoverable?: boolean;
  /** Custom className */
  className?: string;
  /** Row click handler */
  onRowClick?: (row: any, index: number) => void;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  loading = false,
  emptyMessage = "No data available",
  size = 'md',
  bordered = false,
  striped = false,
  hoverable = true,
  className,
  onRowClick,
}) => {
  return (
    <div className={cn(
      'overflow-hidden rounded-lg border border-gray-200 bg-white',
      className
    )}>
      <div className="overflow-x-auto">
        <table className={cn(
          'min-w-full divide-y divide-gray-200',
          sizeConfig[size]
        )}>
          <TableHeader columns={columns} />
          <tbody className={cn(
            'bg-white divide-y divide-gray-200',
            striped && 'divide-y-0'
          )}>
            {loading ? (
              <LoadingSkeleton columns={columns} />
            ) : data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-12 text-center text-sm text-gray-800"
                >
                  <div className="flex flex-col items-center">
                    <svg
                      className="w-12 h-12 text-gray-800 mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    {emptyMessage}
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  data={row}
                  columns={columns}
                  isEven={striped && rowIndex % 2 === 0}
                  clickable={!!onRowClick && hoverable}
                  onClick={onRowClick ? () => onRowClick(row, rowIndex) : undefined}
                  className={cn(
                    bordered && 'border-b border-gray-200'
                  )}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;