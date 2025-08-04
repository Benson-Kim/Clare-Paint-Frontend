import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Gallery - Showcase Your Paint Projects | Paint Store',
  description: 'Explore inspiring paint projects from our community. Submit your own before & after photos, participate in contests, and get featured!',
  keywords: 'customer gallery, paint projects, before after, home renovation, paint contest, user submissions, interior design ideas',
  openGraph: {
    title: 'Customer Gallery - Showcase Your Paint Projects | Paint Store',
    description: 'Explore inspiring paint projects from our community. Submit your own before & after photos, participate in contests, and get featured!',
    type: 'website',
    images: [
      {
        url: 'https://images.pexels.com/photos/1866148/pexels-photo-1866148.jpeg?auto=compress&cs=tinysrgb&w=1200',
        width: 1200,
        height: 630,
        alt: 'Customer Paint Project Gallery',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Customer Gallery - Showcase Your Paint Projects | Paint Store',
    description: 'Explore inspiring paint projects from our community. Submit your own before & after photos, participate in contests, and get featured!',
    images: ['https://images.pexels.com/photos/1866148/pexels-photo-1866148.jpeg?auto=compress&cs=tinysrgb&w=1200'],
  },
};

export default function GalleryLayout({
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
            name: 'Customer Project Gallery',
            description: 'A collection of user-submitted paint projects, before and after transformations, and design inspirations.',
            url: '/gallery',
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
