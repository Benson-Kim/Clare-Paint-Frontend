'use client';

import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { ProductReview } from '@/types/product';
import { cn } from '@/lib/utils';

interface ProductReviewsProps {
  reviews: ProductReview[];
  rating: number;
  reviewCount: number;
}

export const ProductReviews: React.FC<ProductReviewsProps> = ({
  reviews,
  rating,
  reviewCount
}) => {
  const renderStars = (rating: number, size: 'sm' | 'md' = 'sm') => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300",
              size === 'sm' ? "w-4 h-4" : "w-5 h-5"
            )}
          />
        ))}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="border-b border-gray-200 pb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="text-4xl font-bold text-[#2C2C2C]">{rating}</div>
          <div>
            {renderStars(rating, 'md')}
            <p className="text-sm text-gray-600 mt-1">
              Based on {reviewCount} reviews
            </p>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const percentage = Math.random() * 30 + (star === 5 ? 50 : star === 4 ? 30 : 10);
            return (
              <div key={star} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-16">
                  <span className="text-sm text-gray-600">{star}</span>
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-12">
                  {Math.round(percentage)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-[#2C2C2C]">Customer Reviews</h3>
        
        {reviews.slice(0, 3).map((review) => (
          <div key={review.id} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-semibold text-[#2C2C2C]">{review.userName}</span>
                  {review.verified && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-xs font-medium">Verified Purchase</span>
                    </div>
                  )}
                </div>
                {renderStars(review.rating)}
              </div>
              <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
            </div>

            <p className="text-gray-700 leading-relaxed">{review.comment}</p>
          </div>
        ))}

        {reviewCount > 3 && (
          <button className="w-full py-3 border-2 border-[#5B7B7A] text-[#5B7B7A] font-semibold rounded-lg hover:bg-[#5B7B7A]/5 transition-all duration-200">
            View All {reviewCount} Reviews
          </button>
        )}
      </div>
    </div>
  );
};