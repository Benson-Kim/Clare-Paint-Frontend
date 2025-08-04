import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Newsletter - Stay Inspired with Paint Trends & Tips | Paint Store',
  description: 'Subscribe to our newsletter for the latest paint trends, DIY tips, exclusive promotions, and personalized content recommendations. Manage your subscription preferences easily.',
  keywords: 'newsletter, paint trends, DIY tips, paint promotions, color inspiration, subscription management, unsubscribe',
  openGraph: {
    title: 'Newsletter - Stay Inspired with Paint Trends & Tips | Paint Store',
    description: 'Subscribe to our newsletter for the latest paint trends, DIY tips, exclusive promotions, and personalized content recommendations. Manage your subscription preferences easily.',
    type: 'website',
    images: [
      {
        url: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1200',
        width: 1200,
        height: 630,
        alt: 'Paint Newsletter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Newsletter - Stay Inspired with Paint Trends & Tips | Paint Store',
    description: 'Subscribe to our newsletter for the latest paint trends, DIY tips, exclusive promotions, and personalized content recommendations. Manage your subscription preferences easily.',
    images: ['https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1200'],
  },
};

export default function NewsletterLayout({
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
            name: 'Newsletter Subscription Management',
            description: 'Manage your subscription to the Paint Store newsletter, including preferences, frequency, and access to content archives.',
            url: '/newsletter',
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
