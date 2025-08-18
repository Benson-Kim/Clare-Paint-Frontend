import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Color Consultation Services - Expert Guidance for Your Space | Paint Store',
  description: 'Book virtual or in-home color consultations with our expert designers. Get personalized color palettes, lighting analysis, and project guidance for residential and commercial spaces.',
  keywords: 'color consultation, interior design, virtual consultation, in-home consultation, commercial color, paint expert, color palette, design services',
  openGraph: {
    title: 'Color Consultation Services - Expert Guidance for Your Space',
    description: 'Book virtual or in-home color consultations with our expert designers. Get personalized color palettes, lighting analysis, and project guidance.',
    type: 'website',
    images: [
      {
        url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
        width: 1200,
        height: 630,
        alt: 'Color Consultation Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Consultation Services - Expert Guidance for Your Space',
    description: 'Book virtual or in-home color consultations with our expert designers. Get personalized color palettes, lighting analysis, and project guidance.',
    images: ['https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200'],
  },
};

export default function ConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Color Consultation Services',
            description: 'Expert color guidance for residential and commercial painting projects, including virtual and in-home consultations.',
            serviceType: 'Interior Design',
            provider: {
              '@type': 'Organization',
              name: 'Paint Store',
            },
            areaServed: {
              '@type': 'Place',
              name: 'Worldwide (Virtual)',
            },
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: 'Consultation Packages',
              itemListElement: [
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Virtual Color Kickstart',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'In-Home Color Harmony',
                  },
                },
                {
                  '@type': 'Offer',
                  itemOffered: {
                    '@type': 'Service',
                    name: 'Commercial Space Transformation',
                  },
                },
              ],
            },
          }),
        }}
      />
    </>
  );
}
