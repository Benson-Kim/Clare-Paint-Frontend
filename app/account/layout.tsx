import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Account - Paint Store',
  description: 'Manage your paint store account, orders, saved colors, and projects.',
  keywords: 'account, dashboard, orders, colors, projects, paint store',
  openGraph: {
    title: 'My Account - Paint Store',
    description: 'Manage your paint store account, orders, saved colors, and projects.',
    type: 'profile',
  },
  twitter: {
    card: 'summary',
    title: 'My Account - Paint Store',
    description: 'Manage your paint store account, orders, saved colors, and projects.',
  },
};

export default function AccountLayout({
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
            name: 'User Account Dashboard',
            description: 'Manage paint store account, orders, and preferences',
            url: '/account',
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