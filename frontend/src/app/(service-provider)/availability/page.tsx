'use client';

import React, { useState } from 'react';
import { ServiceProviderLayout } from '../../components/organism/service-provider-layout/service-provider-layout';
import { Calendar } from '../../components/molecules/calendar/calendar';
import { TimeSlotManager, TimeSlot } from '../../components/molecules/time-slot-manager/time-slot-manager';
import { AvailabilitySettings } from '../../components/molecules/availability-settings/availability-settings';
import { Button } from '../../components/atoms/button/button';

export default function AvailabilityPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { id: '1', startTime: '09:00', endTime: '13:00' },
    { id: '2', startTime: '14:00', endTime: '18:00' },
  ]);
  const [recurringEnabled, setRecurringEnabled] = useState(true);
  const [dailyStartTime, setDailyStartTime] = useState('09:00');
  const [dailyEndTime, setDailyEndTime] = useState('17:00');
  const [blockedDates, setBlockedDates] = useState<Date[]>([
    new Date('2025-08-17'),
  ]);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddTimeSlot = (timeSlot: TimeSlot) => {
    setTimeSlots([...timeSlots, timeSlot]);
  };

  const handleRemoveTimeSlot = (id: string) => {
    setTimeSlots(timeSlots.filter(slot => slot.id !== id));
  };

  const handleRecurringToggle = (enabled: boolean) => {
    setRecurringEnabled(enabled);
  };

  const handleDailyTimeChange = (start: string, end: string) => {
    setDailyStartTime(start);
    setDailyEndTime(end);
  };

  const handleBlockDate = (date: Date) => {
    setBlockedDates([...blockedDates, date]);
  };

  const handleUnblockDate = (date: Date) => {
    setBlockedDates(blockedDates.filter(blockedDate => 
      blockedDate.toDateString() !== date.toDateString()
    ));
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <ServiceProviderLayout>
      <div className="space-y-6 px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Availability Calendar</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage your schedule and time slots for clients to book appointments.
            </p>
          </div>
          <Button className="bg-[#499537] hover:bg-[#499537]/90">
            Save Changes
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Select Date</h2>
                <p className="text-sm text-gray-600">
                  Choose a date to manage your availability.
                </p>
              </div>
              
              <Calendar
                selectedDate={selectedDate}
                onDateSelect={handleDateSelect}
                disabledDates={blockedDates}
                className="border-0"
              />
            </div>
          </div>

          {/* Right Column - Date Info and Controls */}
          <div className="space-y-6">
            {/* Selected Date Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Availability for {formatDate(selectedDate)}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Manage time slots for the selected day.
              </p>
              
              <TimeSlotManager
                timeSlots={timeSlots}
                onAddTimeSlot={handleAddTimeSlot}
                onRemoveTimeSlot={handleRemoveTimeSlot}
              />
            </div>
          </div>
        </div>

        {/* Bottom Section - Settings */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Availability Settings</h2>
          
          <AvailabilitySettings
            recurringEnabled={recurringEnabled}
            onRecurringToggle={handleRecurringToggle}
            dailyStartTime={dailyStartTime}
            dailyEndTime={dailyEndTime}
            onDailyTimeChange={handleDailyTimeChange}
            blockedDates={blockedDates}
            onBlockDate={handleBlockDate}
            onUnblockDate={handleUnblockDate}
          />
        </div>
      </div>
    </ServiceProviderLayout>
  );
}