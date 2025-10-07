'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export interface CalendarProps {
  /** Selected date */
  selectedDate?: Date;
  /** On date select callback */
  onDateSelect?: (date: Date) => void;
  /** Disabled dates */
  disabledDates?: Date[];
  /** Custom className */
  className?: string;
  /** Month to display */
  currentMonth?: Date;
  /** On month change callback */
  onMonthChange?: (date: Date) => void;
}

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  disabledDates = [],
  className,
  currentMonth = new Date(),
  onMonthChange,
}) => {
  const [displayMonth, setDisplayMonth] = useState(currentMonth);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isDateDisabled = (date: Date) => {
    return disabledDates.some(disabledDate => 
      disabledDate.toDateString() === date.toDateString()
    );
  };

  const isDateSelected = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString();
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const handleDateClick = (day: number) => {
    const clickedDate = new Date(displayMonth.getFullYear(), displayMonth.getMonth(), day);
    if (!isDateDisabled(clickedDate)) {
      onDateSelect?.(clickedDate);
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(displayMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setDisplayMonth(newMonth);
    onMonthChange?.(newMonth);
  };

  const daysInMonth = getDaysInMonth(displayMonth);
  const firstDayOfMonth = getFirstDayOfMonth(displayMonth);
  const daysInPrevMonth = getDaysInMonth(new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1, 0));

  // Generate calendar days
  const calendarDays = [];

  // Previous month's trailing days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    calendarDays.push({
      day,
      isCurrentMonth: false,
      date: new Date(displayMonth.getFullYear(), displayMonth.getMonth() - 1, day)
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: true,
      date: new Date(displayMonth.getFullYear(), displayMonth.getMonth(), day)
    });
  }

  // Next month's leading days
  const remainingSlots = 42 - calendarDays.length;
  for (let day = 1; day <= remainingSlots; day++) {
    calendarDays.push({
      day,
      isCurrentMonth: false,
      date: new Date(displayMonth.getFullYear(), displayMonth.getMonth() + 1, day)
    });
  }

  return (
    <div className={cn('bg-white rounded-lg border border-gray-200 p-4', className)}>
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h3 className="text-lg font-semibold text-gray-900">
          {MONTHS[displayMonth.getMonth()]} {displayMonth.getFullYear()}
        </h3>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS.map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((calendarDay, index) => {
          const { day, isCurrentMonth, date } = calendarDay;
          const disabled = isDateDisabled(date);
          const selected = isDateSelected(date);
          const today = isToday(date);

          return (
            <button
              key={index}
              onClick={() => isCurrentMonth && handleDateClick(day)}
              disabled={disabled || !isCurrentMonth}
              className={cn(
                'h-10 w-10 text-sm rounded-lg transition-all duration-200 flex items-center justify-center',
                isCurrentMonth
                  ? 'text-gray-900 hover:bg-gray-100'
                  : 'text-gray-400',
                selected && 'bg-[#499537] text-white hover:bg-[#499537]/90',
                today && !selected && 'bg-blue-100 text-blue-900 font-semibold',
                disabled && 'opacity-50 cursor-not-allowed bg-gray-100',
                !disabled && !selected && isCurrentMonth && 'hover:bg-gray-100'
              )}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;