'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface SimpleBarChartProps {
  /** Chart data */
  data: ChartDataPoint[];
  /** Chart height */
  height?: number;
  /** Chart title */
  title?: string;
  /** Color theme */
  color?: string;
  /** Show values on bars */
  showValues?: boolean;
  /** Custom className */
  className?: string;
  /** Loading state */
  loading?: boolean;
}

const LoadingSkeleton = ({ height }: { height: number }) => (
  <div className="animate-pulse" style={{ height }}>
    <div className="flex items-end justify-between h-full space-x-2">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 rounded-t flex-1"
          style={{ 
            height: `${Math.random() * 80 + 20}%`,
            minHeight: '20px'
          }}
        />
      ))}
    </div>
  </div>
);

export const SimpleBarChart: React.FC<SimpleBarChartProps> = ({
  data,
  height = 300,
  title,
  color = '#499537',
  showValues = false,
  className,
  loading = false,
}) => {
  if (loading) {
    return (
      <div className={cn('p-4', className)}>
        {title && (
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        )}
        <LoadingSkeleton height={height} />
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className={cn('p-4', className)}>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}
      
      <div className="relative" style={{ height }}>
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 pr-2">
          <span>₹{Math.round(maxValue).toLocaleString()}</span>
          <span>₹{Math.round(maxValue * 0.75).toLocaleString()}</span>
          <span>₹{Math.round(maxValue * 0.5).toLocaleString()}</span>
          <span>₹{Math.round(maxValue * 0.25).toLocaleString()}</span>
          <span>₹0</span>
        </div>
        
        {/* Chart area */}
        <div className="ml-12 h-full">
          {/* Grid lines */}
          <div className="absolute inset-0 ml-12">
            {[0, 25, 50, 75, 100].map((percent) => (
              <div
                key={percent}
                className="absolute w-full border-t border-gray-100"
                style={{ top: `${100 - percent}%` }}
              />
            ))}
          </div>
          
          {/* Bars */}
          <div className="relative h-full flex items-end justify-between space-x-1">
            {data.map((point, index) => {
              const barHeight = (point.value / maxValue) * 100;
              return (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="relative flex-1 flex items-end w-full">
                    {showValues && point.value > 0 && (
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600">
                        ₹{point.value.toLocaleString()}
                      </div>
                    )}
                    <div
                      className="w-full rounded-t transition-all duration-300 hover:opacity-80"
                      style={{
                        height: `${barHeight}%`,
                        backgroundColor: color,
                        minHeight: point.value > 0 ? '4px' : '0px'
                      }}
                    />
                  </div>
                  
                  {/* X-axis label */}
                  <div className="mt-2 text-xs text-gray-600 text-center">
                    {point.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleBarChart;