'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { RatingSummary } from '../../molecules/rating-summary/rating-summary';
import { RatingDistribution, RatingDistributionItem } from '../../molecules/rating-distribution/rating-distribution';
import { ServiceAspects, ServiceAspect } from '../../molecules/service-aspects/service-aspects';
import { IndividualReview, IndividualReviewProps } from '../../molecules/individual-review/individual-review';
import { Button } from '../../atoms/button/button';

export interface ReviewsAndRatingsData {
  overallRating: number;
  totalReviews: number;
  ratingLabel: string;
  distribution: RatingDistributionItem[];
  serviceAspects: ServiceAspect[];
  reviews: IndividualReviewProps[];
}

export interface ReviewsAndRatingsProps {
  /** Reviews and ratings data */
  data: ReviewsAndRatingsData;
  /** Number of reviews to show initially */
  initialReviewsCount?: number;
  /** Custom className */
  className?: string;
  /** Callback when requesting new reviews button is clicked */
  onRequestNewReviews?: () => void;
}

export const ReviewsAndRatings: React.FC<ReviewsAndRatingsProps> = ({
  data,
  initialReviewsCount = 5,
  className,
  onRequestNewReviews,
}) => {
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(initialReviewsCount);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');

  // Sort reviews based on selected option
  const sortedReviews = [...data.reviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  const visibleReviews = sortedReviews.slice(0, visibleReviewsCount);
  const hasMoreReviews = visibleReviewsCount < data.reviews.length;

  const handleLoadMore = () => {
    setVisibleReviewsCount(prev => Math.min(prev + 5, data.reviews.length));
  };

  return (
    <div className={cn('space-y-8', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Customer Reviews</h1>
        <Button
          variant="primary"
          size="md"
          onClick={onRequestNewReviews}
        >
          Request New Reviews
        </Button>
      </div>

      {/* Top Section: Rating Summary, Distribution, and Service Aspects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Rating Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <RatingSummary
            overallRating={data.overallRating}
            totalReviews={data.totalReviews}
            ratingLabel={data.ratingLabel}
            size="lg"
          />
        </div>

        {/* Rating Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <RatingDistribution
            distribution={data.distribution}
            totalReviews={data.totalReviews}
          />
        </div>

        {/* Service Aspects */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <ServiceAspects aspects={data.serviceAspects} />
        </div>
      </div>

      {/* Reviews Section */}
      <div className="bg-white rounded-xl border border-gray-200">
        {/* Reviews Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              All Reviews ({data.totalReviews})
            </h2>
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="p-6 space-y-4">
          {visibleReviews.length > 0 ? (
            <>
              {visibleReviews.map((review, index) => (
                <IndividualReview
                  key={index}
                  {...review}
                  size="md"
                />
              ))}
              
              {/* Load More Button */}
              {hasMoreReviews && (
                <div className="flex justify-center pt-6">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={handleLoadMore}
                  >
                    Load More Reviews
                  </Button>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No reviews yet
              </h3>
              <p className="text-gray-600">
                Be the first to leave a review for this service provider.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReviewsAndRatings;