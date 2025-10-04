"use client";

import React from 'react';
import { Button } from './button';

// Example component showcasing all button variants and sizes
export function ButtonExamples() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Button Examples</h1>
      
      {/* Confirm Booking Button (like in your design) */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Action Buttons</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="success" size="lg" fullWidth className="max-w-md">
            Confirm Booking
          </Button>
          
          <Button 
            variant="error" 
            size="md"
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            }
          >
            Logout
          </Button>
        </div>
      </section>

      {/* Primary Variants */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Primary Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" size="xs">Primary XS</Button>
          <Button variant="primary" size="sm">Primary SM</Button>
          <Button variant="primary" size="md">Primary MD</Button>
          <Button variant="primary" size="lg">Primary LG</Button>
          <Button variant="primary" size="xl">Primary XL</Button>
        </div>
      </section>

      {/* All Color Variants */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Color Variants</h2>
        <div className="grid grid-cols-3 gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="success">Success</Button>
          <Button variant="error">Error</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="info">Info</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </section>

      {/* With Icons */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Buttons with Icons</h2>
        <div className="flex flex-wrap gap-4">
          <Button 
            variant="primary"
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          >
            Add Service
          </Button>
          
          <Button 
            variant="secondary"
            rightIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            }
          >
            Next
          </Button>
          
          <Button 
            variant="outline"
            leftIcon={
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            }
          >
            Search
          </Button>
        </div>
      </section>

      {/* Loading States */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Loading States</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" loading>
            Loading...
          </Button>
          <Button variant="success" loading>
            Processing Booking...
          </Button>
          <Button variant="error" loading>
            Cancelling...
          </Button>
        </div>
      </section>

      {/* Disabled States */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Disabled States</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" disabled>
            Disabled Primary
          </Button>
          <Button variant="success" disabled>
            Disabled Success
          </Button>
          <Button variant="error" disabled>
            Disabled Error
          </Button>
        </div>
      </section>

      {/* Full Width */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Full Width</h2>
        <div className="space-y-4 max-w-md">
          <Button variant="primary" fullWidth>
            Book Now
          </Button>
          <Button variant="success" fullWidth>
            Confirm Booking
          </Button>
          <Button variant="error" fullWidth>
            Cancel Booking
          </Button>
        </div>
      </section>
    </div>
  );
}

// Common button compositions for your app
export const ConfirmBookingButton = ({ ...props }) => (
  <Button variant="success" size="lg" fullWidth {...props}>
    Confirm Booking
  </Button>
);

export const LogoutButton = ({ ...props }) => (
  <Button 
    variant="error" 
    leftIcon={
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1" />
      </svg>
    }
    {...props}
  >
    Logout
  </Button>
);

export const BookNowButton = ({ ...props }) => (
  <Button variant="primary" size="md" {...props}>
    Book Now
  </Button>
);

export const ViewProfileButton = ({ ...props }) => (
  <Button variant="outline" size="sm" {...props}>
    View Full Profile
  </Button>
);

export const LoginButton = ({ ...props }) => (
  <Button variant="primary" {...props}>
    Login
  </Button>
);

export const SignupButton = ({ ...props }) => (
  <Button variant="secondary" {...props}>
    Browse Services
  </Button>
);