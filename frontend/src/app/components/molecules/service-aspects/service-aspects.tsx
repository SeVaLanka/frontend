'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ProgressBar } from '../../atoms/progress-bar/progress-bar';

export interface ServiceAspect {
  name: string;
  rating: number;
  maxRating?: number;
}

export interface ServiceAspectsProps {
  /** List of service aspects */
  aspects: ServiceAspect[];
  /** Custom className */
  className?: string;
}

export const ServiceAspects: React.FC<ServiceAspectsProps> = ({
  aspects,
  className,
}) => {
  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Service Aspects
      </h3>
      
      {aspects.map((aspect, index) => {
        const maxRating = aspect.maxRating || 5;
        const percentage = (aspect.rating / maxRating) * 100;
        
        return (
          <div key={index} className="space-y-2">
            {/* Aspect name and rating */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                {aspect.name}
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {aspect.rating.toFixed(1)}
              </span>
            </div>
            
            {/* Progress bar */}
            <ProgressBar
              value={percentage}
              max={100}
              size="md"
              color="blue"
            />
          </div>
        );
      })}
    </div>
  );
};

export default ServiceAspects;