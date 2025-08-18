import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - Frequently Asked Questions | Paint Store',
  description: 'Find answers to common questions about our paint products, shipping, returns, color matching, and technical support. Your guide to a smooth painting experience.',
  keywords: 'FAQ, frequently asked questions, paint questions, shipping, returns, color matching, technical support, paint help',
  openGraph: {
    title: 'FAQ - Frequently Asked Questions | Paint Store',
    description: 'Find answers to common questions about our paint products, shipping, returns, color matching, and technical support.',
    type: 'website',
    images: [
      {
        url: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1200', // Example image
        width: 1200,
        height: 630,
        alt: 'Paint Store FAQ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FAQ - Frequently Asked Questions | Paint Store',
    description: 'Find answers to common questions about our paint products, shipping, returns, color matching, and technical support.',
    images: ['https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1200'], // Example image
  },
};

export default function FAQLayout({
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
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is the best paint for a living room?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For living rooms, we recommend our Premium Interior Latex Paint. It offers excellent durability, washability, and a smooth finish, perfect for high-traffic areas. Eggshell or satin finishes are popular choices for their subtle sheen and easy maintenance.',
                },
              },
              {
                '@type': 'Question',
                name: 'How many gallons of paint do I need for a room?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A general rule of thumb is that one gallon of paint covers approximately 350-400 square feet with one coat. To calculate your needs, measure the length and height of each wall, multiply them to get the square footage, and add them together. Subtract the area of windows and doors. We recommend two coats for optimal coverage and durability. Our online paint calculator can help you get a precise estimate!',
                },
              },
              // Add more FAQ items dynamically if possible, or hardcode key ones
            ],
          }),
        }}
      />
    </>
  );
}
