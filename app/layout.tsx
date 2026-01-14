import type { Metadata } from 'next';
import './globals.css';
import { PostHogProvider } from '@/components/PostHogProvider';

export const metadata: Metadata = {
  title: 'Stop Losing Customers to Slow Response Times | Endless Reply',
  description: 'Our AI agents answer every call, email, and website inquiry instantly—24/7. Service businesses using our platform see 80-230% more revenue.',
  keywords: 'AI receptionist, inbound agents, service business, lead conversion, 24/7 answering service, Endless Reply',
  openGraph: {
    title: 'Stop Losing Customers to Slow Response Times',
    description: 'Our AI agents answer every call, email, and website inquiry instantly—24/7. Service businesses using our platform see 80-230% more revenue.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stop Losing Customers to Slow Response Times',
    description: 'Our AI agents answer every call, email, and website inquiry instantly—24/7.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
