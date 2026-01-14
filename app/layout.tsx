import type { Metadata } from 'next';
import Script from 'next/script';
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
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '853250674145515');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=853250674145515&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
