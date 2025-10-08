'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { BookingHistoryGrid } from '../../components/organism/booking-history-grid/booking-history-grid';
import { BookingHistoryCardProps } from '../../components/molecules/booking-history-card/booking-history-card';

// Sample data that matches the image - using simple placeholder images
const sampleBookings: BookingHistoryCardProps[] = [
  {
    title: "Deep Tissue Massage",
    providerName: "Zen Wellness Spa",
    imageUrl: "/service-placeholder.svg",
    date: "2023-11-15",
    time: "10:00 AM",
    status: "completed",
    price: 8500,
    canReview: true,
    canViewDetails: true,
    canRebook: true,
  },
  {
    title: "Haircut & Styling",
    providerName: "Style Station",
    imageUrl: "/service-placeholder.svg",
    date: "2023-12-01",
    time: "02:30 PM",
    status: "completed",
    price: 4500,
    canReview: true,
    canViewDetails: true,
    canRebook: true,
  },
  {
    title: "Car Detailing - Premium",
    providerName: "Sparkle Auto Services",
    imageUrl: "/service-placeholder.svg",
    date: "2023-12-10",
    time: "09:00 AM",
    status: "completed",
    price: 12000,
    canReview: true,
    canViewDetails: true,
    canRebook: true,
  },
  {
    title: "Plumbing Repair",
    providerName: "Fix-It Pros",
    imageUrl: "/service-placeholder.svg",
    date: "2024-01-05",
    time: "01:00 PM",
    status: "pending",
    price: 6500,
    canReview: false,
    canViewDetails: true,
    canRebook: false,
  },
  {
    title: "Yoga Class - Beginner",
    providerName: "Harmony Yoga Studio",
    imageUrl: "/service-placeholder.svg",
    date: "2024-01-10",
    time: "06:00 PM",
    status: "pending",
    price: 2500,
    canReview: false,
    canViewDetails: true,
    canRebook: false,
  },
  {
    title: "Home Cleaning - Deep Clean",
    providerName: "Clean Dreams Co.",
    imageUrl: "/service-placeholder.svg",
    date: "2024-01-25",
    time: "09:30 AM",
    status: "pending",
    price: 8000,
    canReview: false,
    canViewDetails: true,
    canRebook: false,
  },
  {
    title: "Photography Session",
    providerName: "Capture Moments Studio",
    imageUrl: "/service-placeholder.svg",
    date: "2023-10-23",
    time: "04:00 PM",
    status: "completed",
    price: 15000,
    canReview: true,
    canViewDetails: true,
    canRebook: true,
  },
  {
    title: "Electrical Wiring Check",
    providerName: "PowerUp Electricians",
    imageUrl: "/service-placeholder.svg",
    date: "2024-01-14",
    time: "11:00 AM",
    status: "pending",
    price: 5500,
    canReview: false,
    canViewDetails: true,
    canRebook: false,
  },
];

export default function BookingHistoryPage() {
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending' | 'cancelled'>('all');
  const [loading, setLoading] = useState(false);

  // Filter bookings based on selected filter
  const filteredBookings = filter === 'all' 
    ? sampleBookings 
    : sampleBookings.filter(booking => booking.status === filter);

  const handleReview = (booking: BookingHistoryCardProps) => {
    console.log('Review booking:', booking.title);
    // Implement review logic
  };

  const handleViewDetails = (booking: BookingHistoryCardProps) => {
    console.log('View details for:', booking.title);
    // Implement view details logic
  };

  const handleRebook = (booking: BookingHistoryCardProps) => {
    console.log('Rebook service:', booking.title);
    // Implement rebooking logic
  };

  // Add event handlers to booking data
  const bookingsWithHandlers = filteredBookings.map(booking => ({
    ...booking,
    onReview: () => handleReview(booking),
    onViewDetails: () => handleViewDetails(booking),
    onRebook: () => handleRebook(booking),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-3xl font-bold text-gray-900">Booking History</h1>
            <p className="mt-2 text-sm text-gray-600">
              Track and manage all your service bookings
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-wrap gap-2">
          {(['all', 'completed', 'pending', 'cancelled'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                filter === status
                  ? 'bg-[#499537] text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              )}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
              <span className="ml-2 text-xs">
                ({status === 'all' 
                  ? sampleBookings.length 
                  : sampleBookings.filter(b => b.status === status).length
                })
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Booking Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <BookingHistoryGrid
          bookings={bookingsWithHandlers}
          columns={{ mobile: 1, tablet: 2, desktop: 3 }}
          loading={loading}
          gap="lg"
          emptyMessage={
            filter === 'all' 
              ? "No bookings found" 
              : `No ${filter} bookings found`
          }
          emptyDescription={
            filter === 'all'
              ? "You haven't made any bookings yet. Start exploring our services!"
              : `You don't have any ${filter} bookings at the moment.`
          }
        />
      </div>

      {/* Load More Button (if needed) */}
      {!loading && filteredBookings.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 text-center">
          <button
            onClick={() => {
              setLoading(true);
              // Simulate loading more data
              setTimeout(() => setLoading(false), 1000);
            }}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Load More Bookings
          </button>
        </div>
      )}
    </div>
  );
}