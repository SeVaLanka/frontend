'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface TableColumn {
  key: string;
  header: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => React.ReactNode;
}

export interface DataTableProps {
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

const sizeConfig = {
  sm: 'text-xs text-gray-900',
  md: 'text-sm text-gray-900',
  lg: 'text-base text-gray-900',
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

export const DataTable: React.FC<DataTableProps> = ({
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
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    'px-6 py-3 text-xs font-medium text-gray-800 uppercase tracking-wider',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right',
                    column.align === 'left' && 'text-left'
                  )}
                  style={{ width: column.width }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
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
                <tr
                  key={rowIndex}
                  className={cn(
                    sizeConfig[size],
                    striped && rowIndex % 2 === 0 && 'bg-gray-50',
                    hoverable && 'hover:bg-gray-50',
                    onRowClick && 'cursor-pointer',
                    bordered && 'border-b border-gray-200'
                  )}
                  onClick={() => onRowClick?.(row, rowIndex)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn(
                        'px-6 py-4 whitespace-nowrap text-gray-900 font-medium',
                        column.align === 'center' && 'text-center',
                        column.align === 'right' && 'text-right',
                        column.align === 'left' && 'text-left'
                      )}
                    >
                      {column.render 
                        ? column.render(row[column.key], row)
                        : row[column.key]
                      }
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;