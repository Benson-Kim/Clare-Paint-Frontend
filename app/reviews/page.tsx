'use client';

import React, { lazy, Suspense } from 'react';
import { HeroSection } from '@/components/reviews/HeroSection';
import { CustomerReviewsSection } from '@/components/reviews/CustomerReviewsSection';
import { ProfessionalEndorsementsSection } from '@/components/reviews/ProfessionalEndorsementsSection';
import { CaseStudiesSection } from '@/components/reviews/CaseStudiesSection';
import { useReviewsStore } from '@/store/reviews-store';
import { Loader2 } from 'lucide-react';

// Lazy load the ReviewSubmissionModal for performance
const LazyReviewSubmissionModal = lazy(() => import('@/components/reviews/ReviewSubmissionModal').then(module => ({ default: module.ReviewSubmissionModal })));

export default function ReviewsPage() {
  const { isReviewModalOpen } = useReviewsStore();

  return (
    <div className="min-h-screen bg-ds-neutral-white">
      <HeroSection />
      <CustomerReviewsSection />
      <ProfessionalEndorsementsSection />
      <CaseStudiesSection />

      {isReviewModalOpen && (
        <Suspense fallback={
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <Loader2 className="w-12 h-12 animate-spin text-ds-neutral-white" />
          </div>
        }>
          <LazyReviewSubmissionModal />
        </Suspense>
      )}
    </div>
  );
}
