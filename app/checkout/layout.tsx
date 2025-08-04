import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout - Paint Store',
  description: 'Complete your purchase with secure shipping and payment options.',
  keywords: 'checkout, payment, shipping, order, paint store',
  openGraph: {
    title: 'Checkout - Paint Store',
    description: 'Complete your purchase with secure shipping and payment options.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Checkout - Paint Store',
    description: 'Complete your purchase with secure shipping and payment options.',
  },
};

export default function CheckoutLayout({
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
            name: 'Checkout',
            description: 'Secure checkout process for paint products',
            url: '/checkout',
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