import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interior Paints - Premium Collection for Every Room | Paint Store',
  description: 'Explore our comprehensive collection of interior paints. From bedrooms to kitchens, find the perfect paint with room-specific recommendations, coverage calculators, and color coordination tools.',
  keywords: 'interior paint, room paint, bedroom paint, kitchen paint, bathroom paint, living room paint, color coordination, coverage calculator',
  openGraph: {
    title: 'Interior Paints - Premium Collection for Every Room | Paint Store',
    description: 'Explore our comprehensive collection of interior paints. From bedrooms to kitchens, find the perfect paint with room-specific recommendations.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Interior Paints - Premium Collection for Every Room | Paint Store',
    description: 'Explore our comprehensive collection of interior paints. From bedrooms to kitchens, find the perfect paint with room-specific recommendations.',
  },
};

export default function InteriorPaintsLayout({
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
            '@type': 'CollectionPage',
            name: 'Interior Paints',
            description: 'Premium interior paint collection for every room in your home.',
            url: '/interior-paints',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Paint Store',
            },
          }),
        }}
      />
    </>
  );
}