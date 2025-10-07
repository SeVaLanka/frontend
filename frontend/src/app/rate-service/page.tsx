'use client';

import React from 'react';
import { CustomerRatingPage } from '../components/organism/customer-rating-page/customer-rating-page';
import { RatingFormData } from '../components/molecules/rating-form/rating-form';

// This would typically come from URL parameters or props
const serviceData = {
  providerName: "Elite Home Cleaners",
  serviceName: "Deep House Cleaning Service",
  bookingId: "SL20241007001",
};

export default function RateServicePage() {
  const handleRatingSubmitted = (data: RatingFormData) => {
    console.log('Rating submitted:', data);
    // Here you would typically:
    // 1. Send the data to your API
    // 2. Show a success message
    // 3. Redirect the user
  };

  const handleSkip = () => {
    console.log('User skipped rating');
    // Handle skip action - maybe redirect to home page
    window.location.href = '/';
  };

  return (
    <CustomerRatingPage
      providerName={serviceData.providerName}
      serviceName={serviceData.serviceName}
      bookingId={serviceData.bookingId}
      onRatingSubmitted={handleRatingSubmitted}
      onSkip={handleSkip}
    />
  );
}