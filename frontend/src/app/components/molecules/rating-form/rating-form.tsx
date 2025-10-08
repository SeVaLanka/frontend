'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { RatingInput } from '../../atoms/rating-input/rating-input';
import { Button } from '../../atoms/button/button';

export interface RatingFormData {
  rating: number;
  comment: string;
}

export interface RatingFormProps {
  /** Service provider name */
  providerName: string;
  /** Service name */
  serviceName: string;
  /** Initial form data */
  initialData?: Partial<RatingFormData>;
  /** Loading state */
  loading?: boolean;
  /** Callback when form is submitted */
  onSubmit?: (data: RatingFormData) => Promise<void> | void;
  /** Custom className */
  className?: string;
}

export const RatingForm: React.FC<RatingFormProps> = ({
  providerName,
  serviceName,
  initialData = {},
  loading = false,
  onSubmit,
  className,
}) => {
  const [formData, setFormData] = useState<RatingFormData>({
    rating: initialData.rating || 0,
    comment: initialData.comment || '',
  });
  const [errors, setErrors] = useState<Partial<RatingFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<RatingFormData> = {};

    if (formData.rating === 0) {
      newErrors.rating = 0; // Use 0 to indicate error state
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (onSubmit) {
      try {
        await onSubmit(formData);
      } catch (error) {
        console.error('Error submitting rating:', error);
      }
    }
  };

  const handleRatingChange = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
    if (errors.rating !== undefined) {
      setErrors(prev => ({ ...prev, rating: undefined }));
    }
  };

  const handleCommentChange = (comment: string) => {
    setFormData(prev => ({ ...prev, comment }));
  };

  return (
    <div className={cn('max-w-2xl mx-auto', className)}>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Rate Your Service Experience
          </h1>
          <p className="text-gray-600">
            Share your feedback for{' '}
            <span className="font-semibold text-gray-900">{providerName}</span>{' '}
            on their{' '}
            <span className="font-semibold text-gray-900">{serviceName}</span>.
          </p>
        </div>

        {/* Rating Section */}
        <div className="space-y-4">
          <div className="text-center">
            <label className="block text-lg font-semibold text-gray-900 mb-4">
              Your Rating
            </label>
            <div className="flex justify-center">
              <RatingInput
                value={formData.rating}
                onChange={handleRatingChange}
                size="lg"
                error={errors.rating !== undefined}
                required
              />
            </div>
            {errors.rating !== undefined && (
              <p className="text-red-500 text-sm mt-2">
                Please select a rating
              </p>
            )}
          </div>
        </div>

        {/* Comment Section */}
        <div className="space-y-4">
          <label className="block text-lg font-semibold text-gray-900">
            Your Comments (Optional)
          </label>
          <textarea
            value={formData.comment}
            onChange={(e) => handleCommentChange(e.target.value)}
            placeholder="Share your detailed feedback about the service and provider. Your insights help others make informed decisions!"
            rows={6}
            className={cn(
              'w-full px-4 py-3 border border-gray-300 rounded-lg resize-none',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
              'text-gray-900 placeholder-gray-500',
              'transition-colors duration-200'
            )}
            disabled={loading}
          />
          <p className="text-sm text-gray-500">
            Share specific details about quality, timeliness, professionalism, and overall experience.
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            disabled={loading}
            className="w-full sm:w-auto px-12"
          >
            {loading ? 'Submitting Review...' : 'Submit Review'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RatingForm;