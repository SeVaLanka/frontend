'use client';

import React from 'react';
import { CustomerRatingPage } from '../../components/organism/customer-rating-page/customer-rating-page';
import { RatingFormData } from '../../components/molecules/rating-form/rating-form';

interface RateServicePageProps {
  params: {
    bookingId: string;
  };
  searchParams: {
    provider?: string;
    service?: string;
  };
}

export default function RateServiceWithIdPage({ params, searchParams }: RateServicePageProps) {
  // Extract data from URL parameters
  const providerName = searchParams.provider ? decodeURIComponent(searchParams.provider) : "Service Provider";
  const serviceName = searchParams.service ? decodeURIComponent(searchParams.service) : "Service";
  const bookingId = params.bookingId;

  const handleRatingSubmitted = (data: RatingFormData) => {
    console.log('Rating submitted for booking:', bookingId, data);
    // Here you would typically:
    // 1. Send the data to your API with booking ID
    // 2. Update the booking status
    // 3. Send confirmation email
    // 4. Show success message
  };

  const handleSkip = () => {
    console.log('User skipped rating for booking:', bookingId);
    // Handle skip action - maybe redirect to booking history
    window.location.href = '/booking-history';
  };

  return (
    <CustomerRatingPage
      providerName={providerName}
      serviceName={serviceName}
      bookingId={bookingId}
      onRatingSubmitted={handleRatingSubmitted}
      onSkip={handleSkip}
    />
  );
}