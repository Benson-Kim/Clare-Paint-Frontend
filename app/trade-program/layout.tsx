import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Professional Trade Program - Exclusive Benefits for Contractors | Paint Store',
  description: 'Join our exclusive trade program for painting contractors. Get volume discounts up to 25%, priority service, free delivery, and professional tools. Apply today.',
  keywords: 'trade program, contractor discounts, professional paint, bulk orders, painting contractors, volume pricing, trade account',
  openGraph: {
    title: 'Professional Trade Program - Exclusive Benefits for Contractors',
    description: 'Join our exclusive trade program for painting contractors. Get volume discounts up to 25%, priority service, and professional tools.',
    type: 'website',
    images: [
      {
        url: 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=1200',
        width: 1200,
        height: 630,
        alt: 'Professional contractor painting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Professional Trade Program - Exclusive Benefits for Contractors',
    description: 'Join our exclusive trade program for painting contractors. Get volume discounts up to 25%, priority service, and professional tools.',
    images: ['https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=1200'],
  },
};

export default function TradeProgramLayout({
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
            '@type': 'WebPage',
            name: 'Professional Trade Program',
            description: 'Exclusive benefits and discounts for painting contractors and trade professionals.',
            url: '/trade-program',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Paint Store',
            },
            offers: {
              '@type': 'Offer',
              name: 'Trade Program Membership',
              description: 'Volume discounts up to 25% for qualified contractors',
              category: 'Professional Services',
            },
          }),
        }}
      />
    </>
  );
}