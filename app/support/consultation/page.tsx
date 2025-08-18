'use client';

import React, { lazy, Suspense } from 'react';
import { HeroSection } from '@/components/consultation/HeroSection';
import { ConsultationPackages } from '@/components/consultation/ConsultationPackages';
import { DesignerCollaboration } from '@/components/consultation/DesignerCollaboration';
import { CommercialSupport } from '@/components/consultation/CommercialSupport';
import { PortfolioShowcase } from '@/components/consultation/PortfolioShowcase';
import { ConsultationPrep } from '@/components/consultation/ConsultationPrep';
import { useConsultationStore } from '@/store/consultation-store';
import { Loader2 } from 'lucide-react';

// Lazy load the BookingModal for performance
const LazyBookingModal = lazy(() => import('@/components/consultation/BookingModal').then(module => ({ default: module.BookingModal })));

export default function ConsultationPage() {
  const { isBookingModalOpen } = useConsultationStore();

  return (
    <div className="min-h-screen bg-ds-neutral-white">
      <HeroSection />
      <ConsultationPackages />
      <DesignerCollaboration />
      <CommercialSupport />
      <PortfolioShowcase />
      <ConsultationPrep />

      {isBookingModalOpen && (
        <Suspense fallback={
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
            <Loader2 className="w-12 h-12 animate-spin text-ds-neutral-white" />
          </div>
        }>
          <LazyBookingModal />
        </Suspense>
      )}
    </div>
  );
}
