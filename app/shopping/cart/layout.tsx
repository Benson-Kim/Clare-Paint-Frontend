import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Cart - Paint Store',
  description: 'Review your paint selections, calculate coverage, and proceed to secure checkout.',
  keywords: 'shopping cart, paint calculator, checkout, interior paint, coverage calculator',
  openGraph: {
    title: 'Shopping Cart - Paint Store',
    description: 'Review your paint selections and proceed to checkout.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Shopping Cart - Paint Store',
    description: 'Review your paint selections and proceed to checkout.',
  },
};

export default function CartLayout({
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
            name: 'Shopping Cart',
            description: 'Review paint selections and proceed to checkout',
            url: '/cart',
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