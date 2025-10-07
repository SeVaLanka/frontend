'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { StatsCard, StatsCardProps } from '../../atoms/stats-card/stats-card';

export interface DashboardStatsGridProps {
  /** Array of stats to display */
  stats: StatsCardProps[];
  /** Grid columns configuration */
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  /** Loading state */
  loading?: boolean;
  /** Custom className */
  className?: string;
  /** Gap between cards */
  gap?: 'sm' | 'md' | 'lg';
}

const getGridClasses = (columns: DashboardStatsGridProps['columns']) => {
  const mobile = columns?.mobile || 1;
  const tablet = columns?.tablet || 2;
  const desktop = columns?.desktop || 4;

  // Use explicit classes to ensure they're included in the build
  const mobileClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  const tabletClasses = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  };

  const desktopClasses = {
    1: 'lg:grid-cols-1',
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
  };

  return cn(
    mobileClasses[mobile as keyof typeof mobileClasses] || 'grid-cols-1',
    tabletClasses[tablet as keyof typeof tabletClasses] || 'md:grid-cols-2',
    desktopClasses[desktop as keyof typeof desktopClasses] || 'lg:grid-cols-4'
  );
};

const getGapClass = (gap: DashboardStatsGridProps['gap']) => {
  switch (gap) {
    case 'sm':
      return 'gap-4';
    case 'md':
      return 'gap-6';
    case 'lg':
      return 'gap-8';
    default:
      return 'gap-6';
  }
};

export const DashboardStatsGrid: React.FC<DashboardStatsGridProps> = ({
  stats,
  columns = { mobile: 1, tablet: 2, desktop: 4 },
  loading = false,
  className,
  gap = 'md',
}) => {
  const gridClasses = getGridClasses(columns);
  const gapClass = getGapClass(gap);

  return (
    <div className={cn('grid', gridClasses, gapClass, className)}>
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          {...stat}
          loading={loading}
        />
      ))}
    </div>
  );
};

export default DashboardStatsGrid;