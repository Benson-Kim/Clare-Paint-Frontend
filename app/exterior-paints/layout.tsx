import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exterior Paints - Weather-Resistant Solutions | Paint Store',
  description: 'Explore our collection of durable, weather-resistant exterior paints. Find solutions for all surface types and climate zones, with expert advice and project galleries.',
  keywords: 'exterior paint, weather resistant, outdoor paint, house paint, durable paint, climate zones, masonry paint, wood paint',
  openGraph: {
    title: 'Exterior Paints - Weather-Resistant Solutions | Paint Store',
    description: 'Explore our collection of durable, weather-resistant exterior paints. Find solutions for all surface types and climate zones, with expert advice and project galleries.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Exterior Paints - Weather-Resistant Solutions | Paint Store',
    description: 'Explore our collection of durable, weather-resistant exterior paints. Find solutions for all surface types and climate zones, with expert advice and project galleries.',
  },
};

export default function ExteriorPaintsLayout({
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
            name: 'Exterior Paints',
            description: 'Durable and weather-resistant paints for all exterior surfaces.',
            url: '/exterior-paints',
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