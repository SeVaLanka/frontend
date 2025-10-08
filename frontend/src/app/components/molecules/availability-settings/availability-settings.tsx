'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../../atoms/button/button';

export interface AvailabilitySettingsProps {
  /** Recurring availability enabled */
  recurringEnabled: boolean;
  /** On recurring toggle */
  onRecurringToggle: (enabled: boolean) => void;
  /** Daily start time */
  dailyStartTime: string;
  /** Daily end time */
  dailyEndTime: string;
  /** On daily time change */
  onDailyTimeChange: (start: string, end: string) => void;
  /** Blocked dates */
  blockedDates: Date[];
  /** On block date */
  onBlockDate: (date: Date) => void;
  /** On unblock date */
  onUnblockDate: (date: Date) => void;
  /** Custom className */
  className?: string;
}

export const AvailabilitySettings: React.FC<AvailabilitySettingsProps> = ({
  recurringEnabled,
  onRecurringToggle,
  dailyStartTime,
  dailyEndTime,
  onDailyTimeChange,
  blockedDates,
  onBlockDate,
  onUnblockDate,
  className,
}) => {
  const [newBlockDate, setNewBlockDate] = React.useState('');

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        options.push(timeString);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  const handleBlockDate = () => {
    if (newBlockDate) {
      const date = new Date(newBlockDate);
      onBlockDate(date);
      setNewBlockDate('');
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Recurring Availability */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Recurring Availability</h3>
            <p className="text-xs text-gray-500">Set general availability and block out specific periods.</p>
          </div>
          <button
            onClick={() => onRecurringToggle(!recurringEnabled)}
            className={cn(
              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
              recurringEnabled ? 'bg-[#499537]' : 'bg-gray-200'
            )}
          >
            <span
              className={cn(
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
                recurringEnabled ? 'translate-x-6' : 'translate-x-1'
              )}
            />
          </button>
        </div>

        {recurringEnabled && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="daily-start" className="block text-xs font-medium text-gray-700 mb-1">
                Daily Start Time
              </label>
              <select
                id="daily-start"
                value={dailyStartTime}
                onChange={(e) => onDailyTimeChange(e.target.value, dailyEndTime)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#499537] focus:border-[#499537]"
              >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="daily-end" className="block text-xs font-medium text-gray-700 mb-1">
                Daily End Time
              </label>
              <select
                id="daily-end"
                value={dailyEndTime}
                onChange={(e) => onDailyTimeChange(dailyStartTime, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#499537] focus:border-[#499537]"
              >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Blocked Dates */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Blocked Dates:</h3>
        
        {/* Current Blocked Dates */}
        <div className="space-y-2 mb-4">
          {blockedDates.map((date, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200"
            >
              <span className="text-sm text-red-800 font-medium">
                {formatDate(date)}
              </span>
              <button
                onClick={() => onUnblockDate(date)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          {blockedDates.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              No blocked dates
            </p>
          )}
        </div>

        {/* Add Blocked Date */}
        <div className="flex space-x-2">
          <div className="flex-1">
            <input
              type="date"
              value={newBlockDate}
              onChange={(e) => setNewBlockDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#499537] focus:border-[#499537]"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <Button
            onClick={handleBlockDate}
            disabled={!newBlockDate}
            variant="secondary"
            size="sm"
            className="bg-[#3D98D1] hover:bg-[#3D98D1]/90"
          >
            Block Date
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AvailabilitySettings;