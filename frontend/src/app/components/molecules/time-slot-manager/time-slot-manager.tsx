'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../../atoms/button/button';

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
}

export interface TimeSlotManagerProps {
  /** Current time slots */
  timeSlots: TimeSlot[];
  /** On time slot add */
  onAddTimeSlot?: (timeSlot: TimeSlot) => void;
  /** On time slot remove */
  onRemoveTimeSlot?: (id: string) => void;
  /** Custom className */
  className?: string;
}

export const TimeSlotManager: React.FC<TimeSlotManagerProps> = ({
  timeSlots,
  onAddTimeSlot,
  onRemoveTimeSlot,
  className,
}) => {
  const [startTime, setStartTime] = React.useState('');
  const [endTime, setEndTime] = React.useState('');

  const handleAddSlot = () => {
    if (startTime && endTime) {
      const newSlot: TimeSlot = {
        id: Date.now().toString(),
        startTime,
        endTime,
      };
      onAddTimeSlot?.(newSlot);
      setStartTime('');
      setEndTime('');
    }
  };

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

  return (
    <div className={cn('space-y-4', className)}>
      {/* Current Time Slots */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Current Time Slots:</h3>
        <div className="space-y-2">
          {timeSlots.map((slot) => (
            <div
              key={slot.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
            >
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium text-gray-900">
                  {slot.startTime} - {slot.endTime}
                </span>
              </div>
              <button
                onClick={() => onRemoveTimeSlot?.(slot.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
          {timeSlots.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">
              No time slots added yet
            </p>
          )}
        </div>
      </div>

      {/* Add New Time Slot */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Add New Time Slot:</h3>
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <label htmlFor="start-time" className="block text-xs font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <select
              id="start-time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#499537] focus:border-[#499537]"
            >
              <option value="">Select start</option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="end-time" className="block text-xs font-medium text-gray-700 mb-1">
              End Time
            </label>
            <select
              id="end-time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#499537] focus:border-[#499537]"
            >
              <option value="">Select end</option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>
        <Button
          onClick={handleAddSlot}
          disabled={!startTime || !endTime}
          className="w-full bg-[#3D98D1] hover:bg-[#3D98D1]/90"
          size="sm"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Slot
        </Button>
      </div>
    </div>
  );
};

export default TimeSlotManager;