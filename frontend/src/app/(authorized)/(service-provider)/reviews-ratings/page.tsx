'use client';

import React from 'react';
import { UnifiedLayout } from '../../../components/organism/unified-layout/unified-layout';
import { ReviewsAndRatings, ReviewsAndRatingsData } from '../../../components/organism/reviews-and-ratings/reviews-and-ratings';

// Sample data for the reviews and ratings page
const reviewsData: ReviewsAndRatingsData = {
  overallRating: 4.2,
  totalReviews: 1258,
  ratingLabel: "Very Good",
  distribution: [
    { stars: 5, count: 350, percentage: 27.8 },
    { stars: 4, count: 520, percentage: 41.3 },
    { stars: 3, count: 200, percentage: 15.9 },
    { stars: 2, count: 90, percentage: 7.2 },
    { stars: 1, count: 98, percentage: 7.8 },
  ],
  serviceAspects: [
    { name: "Quality", rating: 4.6 },
    { name: "Timeliness", rating: 4.1 },
    { name: "Professionalism", rating: 4.7 },
    { name: "Value", rating: 4.0 },
    { name: "Communication", rating: 4.3 },
  ],
  reviews: [
    {
      reviewerName: "Aisha Khan",
      rating: 5,
      reviewText: "Outstanding service! The technician arrived on time, was extremely professional, and fixed my plumbing issue perfectly. Highly recommend Service Lanka!",
      date: "2 days ago",
      serviceName: "Plumbing Service",
    },
    {
      reviewerName: "Ben Carter",
      rating: 4,
      reviewText: "Good experience overall. The electrician was knowledgeable, but there was a slight delay in arrival. The work was completed efficiently.",
      date: "1 week ago",
      serviceName: "Electrical Service",
    },
    {
      reviewerName: "Chen Li",
      rating: 5,
      reviewText: "Impressed with the efficiency and quality. My home cleaning service was thorough and meticulous. Will definitely book again through Service Lanka.",
      date: "2 weeks ago",
      serviceName: "Home Cleaning",
    },
    {
      reviewerName: "David Perera",
      rating: 3,
      reviewText: "The service was adequate, but the communication could have been better regarding the scope of work. Expected a bit more for the price.",
      date: "3 weeks ago",
      serviceName: "AC Repair",
    },
    {
      reviewerName: "Elena Rodriguez",
      rating: 4,
      reviewText: "Very satisfied with the carpentry work. The furniture repair was done with great attention to detail. Provider was polite and tidy.",
      date: "1 month ago",
      serviceName: "Carpentry Service",
    },
    {
      reviewerName: "Fatima Al-Zahra",
      rating: 5,
      reviewText: "Excellent pest control service! The team was professional, explained the process clearly, and the results were immediate. Highly recommended!",
      date: "1 month ago",
      serviceName: "Pest Control",
    },
    {
      reviewerName: "George Thompson",
      rating: 4,
      reviewText: "Good painting job overall. The painters were skilled and completed the work on schedule. Minor touch-ups were needed afterwards.",
      date: "5 weeks ago",
      serviceName: "Painting Service",
    },
    {
      reviewerName: "Haritha Silva",
      rating: 5,
      reviewText: "Amazing massage therapy session! The therapist was highly skilled and professional. Felt completely relaxed and rejuvenated afterwards.",
      date: "6 weeks ago",
      serviceName: "Massage Therapy",
    },
    {
      reviewerName: "Ibrahim Hassan",
      rating: 2,
      reviewText: "Service was below expectations. The technician seemed inexperienced and took longer than quoted. Had to call back for additional fixes.",
      date: "2 months ago",
      serviceName: "Appliance Repair",
    },
    {
      reviewerName: "Julia Martinez",
      rating: 4,
      reviewText: "Professional car wash service. My vehicle looked spotless after the service. The staff was courteous and careful with my car.",
      date: "2 months ago",
      serviceName: "Car Wash",
    },
  ],
};

export default function ServiceProviderReviewsPage() {
  const handleRequestNewReviews = () => {
    console.log('Request new reviews functionality');
    // Implement logic to send review requests to recent customers
  };

  return (
    <UnifiedLayout userRole="service-provider" activePageId="ratings-reviews">
      <div className="max-w-7xl mx-auto">
        <ReviewsAndRatings
          data={reviewsData}
          initialReviewsCount={5}
          onRequestNewReviews={handleRequestNewReviews}
        />
      </div>
    </UnifiedLayout>
  );
}