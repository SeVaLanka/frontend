'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ServiceProviderLayout } from '../components/organism/service-provider-layout/service-provider-layout';
import { DashboardStatsGrid } from '../components/organism/dashboard-stats-grid/dashboard-stats-grid';
import { StatsCardProps } from '../components/atoms/stats-card/stats-card';
import { SimpleBarChart, ChartDataPoint } from '../components/molecules/simple-bar-chart/simple-bar-chart';
import { DataTable, TableColumn } from '../components/molecules/data-table/data-table';
import { ReviewCard } from '../components/molecules/review-card/review-card';
import { NotificationItem } from '../components/molecules/notification-item/notification-item';
import { Button } from '../components/atoms/button/button';

// Sample data for the dashboard
const dashboardStats: StatsCardProps[] = [
  {
    title: "Total Jobs",
    value: "1,280",
    subtitle: "+2% from last month",
    change: {
      value: "+2% from last month",
      type: "increase"
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    title: "Pending Jobs",
    value: "12",
    subtitle: "waiting for action",
    change: {
      value: "-5 from yesterday",
      type: "decrease"
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Total Earnings",
    value: "₹2.5 Lakh",
    subtitle: "this month",
    change: {
      value: "+15% from last month",
      type: "increase"
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
  },
  {
    title: "Average Rating",
    value: "4.8",
    subtitle: "based on 1,203 reviews",
    change: {
      value: "+0.2 from last month",
      type: "increase"
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
];

const earningsData: ChartDataPoint[] = [
  { label: "Jan", value: 65000 },
  { label: "Feb", value: 78000 },
  { label: "Mar", value: 72000 },
  { label: "Apr", value: 89000 },
  { label: "May", value: 95000 },
  { label: "Jun", value: 102000 },
  { label: "Jul", value: 88000 },
  { label: "Aug", value: 115000 },
];

const upcomingJobsColumns: TableColumn[] = [
  {
    key: "jobId",
    header: "Job ID",
    width: "120px",
  },
  {
    key: "service",
    header: "Service",
    width: "200px",
  },
  {
    key: "customer",
    header: "Customer",
    width: "180px",
  },
  {
    key: "date",
    header: "Date",
    width: "120px",
  },
  {
    key: "time",
    header: "Time",
    width: "100px",
  },
  {
    key: "status",
    header: "Status",
    width: "120px",
    render: (value: string) => {
      const statusColors = {
        'Confirmed': 'bg-green-100 text-green-800',
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Scheduled': 'bg-blue-100 text-blue-800',
      };
      return (
        <span className={cn(
          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
          statusColors[value as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'
        )}>
          {value}
        </span>
      );
    },
  },
];

const upcomingJobsData = [
  {
    jobId: "SL20240601",
    service: "Deep Tissue Massage",
    customer: "Ms. Priya Reddy",
    date: "2024-08-02",
    time: "10:00 AM",
    status: "Confirmed",
  },
  {
    jobId: "SL20240602",
    service: "AC Repair",
    customer: "Mr. Priya Singh",
    date: "2024-08-02",
    time: "02:00 PM",
    status: "Confirmed",
  },
  {
    jobId: "SL20240603",
    service: "Plumbing Fix",
    customer: "Dr. Sameer Khan",
    date: "2024-08-03",
    time: "09:00 AM",
    status: "Pending",
  },
  {
    jobId: "SL20240604",
    service: "Electrical Wiring",
    customer: "Mrs. Meera Sharma",
    date: "2024-08-04",
    time: "11:00 AM",
    status: "Confirmed",
  },
];

const recentReviews = [
  {
    reviewerName: "Sarah Williams",
    rating: 5,
    review: "Excellent deep cleaning service. Very thorough and professional.",
    date: "July 28, 2024",
    serviceName: "Deep Cleaning Service",
  },
  {
    reviewerName: "Ananya Patel",
    rating: 5,
    review: "Quick and efficient AC repair. Would recommend!",
    date: "July 27, 2024",
    serviceName: "AC Repair",
  },
  {
    reviewerName: "Rahul Gupta",
    rating: 4,
    review: "The plumbing issue was resolved perfectly. Great service!",
    date: "July 26, 2024",
    serviceName: "Plumbing Service",
  },
];

const notifications = [
  {
    type: "booking" as const,
    message: "New Job Request: Cleaning Service for Mr. Sharma at 12:00 PM tomorrow",
    timestamp: "2 minutes ago",
    read: false,
  },
  {
    type: "success" as const,
    message: "Payment Received: ₹5,000 received for Job #SL20240573",
    timestamp: "1 hour ago",
    read: false,
  },
  {
    type: "warning" as const,
    message: "Review from Ms. Devi: Your recent plumbing job was reviewed 3.5 stars",
    timestamp: "3 hours ago",
    read: true,
  },
  {
    type: "info" as const,
    message: "Profile Update Reminder: Add more job opportunities",
    timestamp: "2 days ago",
    read: true,
  },
  {
    type: "success" as const,
    message: "Service Lanka Updates: New features added to Manage Services",
    timestamp: "3 days ago",
    read: true,
  },
];

export default function ServiceProviderDashboard() {
  const [loading, setLoading] = useState(false);

  return (
    <ServiceProviderLayout activePageId="dashboard">
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Grid */}
          <div className="mb-8">
            <DashboardStatsGrid 
              stats={dashboardStats}
              loading={loading}
              gap="lg"
            />
          </div>

          {/* Main Content Layout */}
          <div className="space-y-8">
            {/* Top Row: Chart and Notifications */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Earnings Chart */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <SimpleBarChart
                    title="Earnings Overview"
                    data={earningsData}
                    height={300}
                    color="#499537"
                    showValues={false}
                  />
                </div>
              </div>

              {/* Notifications - Same height as chart */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl border border-gray-200 p-6 h-full">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
                    <Button variant="ghost" size="sm">
                      Mark all read
                    </Button>
                  </div>
                  <div className="overflow-y-auto" style={{ height: '300px' }}>
                    <div className="space-y-3 pr-2">
                      {notifications.map((notification, index) => (
                        <NotificationItem
                          key={index}
                          {...notification}
                          size="sm"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Full Width Upcoming Jobs Table */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Upcoming Jobs</h2>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <DataTable
                columns={upcomingJobsColumns}
                data={upcomingJobsData}
                loading={loading}
                hoverable
                size="sm"
              />
            </div>

            {/* Full Width Recent Reviews */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Reviews</h2>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentReviews.map((review, index) => (
                  <ReviewCard
                    key={index}
                    {...review}
                    size="sm"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ServiceProviderLayout>
  );
}