import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Reviews & Testimonials - Hear from Our Happy Customers | Paint Store',
  description: 'Read authentic customer reviews, see before & after photos, and explore detailed case studies. Share your own experience and help others choose the perfect paint.',
  keywords: 'customer reviews, paint testimonials, verified purchase, photo reviews, professional endorsements, case studies, paint feedback',
  openGraph: {
    title: 'Customer Reviews & Testimonials - Hear from Our Happy Customers | Paint Store',
    description: 'Read authentic customer reviews, see before & after photos, and explore detailed case studies. Share your own experience and help others choose the perfect paint.',
    type: 'website',
    images: [
      {
        url: 'https://images.pexels.com/photos/1866148/pexels-photo-1866148.jpeg?auto=compress&cs=tinysrgb&w=1200',
        width: 1200,
        height: 630,
        alt: 'Customer Reviews & Testimonials',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Customer Reviews & Testimonials - Hear from Our Happy Customers | Paint Store',
    description: 'Read authentic customer reviews, see before & after photos, and explore detailed case studies. Share your own experience and help others choose the perfect paint.',
    images: ['https://images.pexels.com/photos/1866148/pexels-photo-1866148.jpeg?auto=compress&cs=tinysrgb&w=1200'],
  },
};

export default function ReviewsLayout({
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
            '@type': 'ReviewAction',
            name: 'Customer Reviews and Testimonials',
            description: 'A collection of customer reviews, professional endorsements, and case studies for paint products and services.',
            url: '/reviews',
            isPartOf: {
              '@type': 'WebSite',
              name: 'Paint Store',
            },
            about: {
              '@type': 'Product',
              name: 'Paint Products',
            },
          }),
        }}
      />
    </>
  );
}
