'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';

// Initialize PostHog
if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
    person_profiles: 'identified_only',
    capture_pageview: false, // We'll handle this manually for better control
    capture_pageleave: true,
    autocapture: true, // Capture clicks, form submissions automatically
  });
}

// Component to track page views with UTM parameters
function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      // Capture UTM parameters for ad attribution
      const utm_source = searchParams.get('utm_source');
      const utm_medium = searchParams.get('utm_medium');
      const utm_campaign = searchParams.get('utm_campaign');
      const utm_content = searchParams.get('utm_content');
      const utm_term = searchParams.get('utm_term');
      const gclid = searchParams.get('gclid'); // Google Ads click ID
      const fbclid = searchParams.get('fbclid'); // Facebook click ID

      // Build URL with search params
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url += '?' + searchParams.toString();
      }

      // Track page view with all context
      posthog.capture('$pageview', {
        $current_url: url,
        // UTM parameters
        utm_source,
        utm_medium,
        utm_campaign,
        utm_content,
        utm_term,
        // Ad platform click IDs
        gclid,
        fbclid,
        // Page context
        page_path: pathname,
        page_title: document.title,
      });

      // Store UTM params in session for attribution across pages
      if (utm_source || gclid || fbclid) {
        const attribution = {
          utm_source,
          utm_medium,
          utm_campaign,
          utm_content,
          utm_term,
          gclid,
          fbclid,
          landing_page: pathname,
          landing_time: new Date().toISOString(),
        };

        // Set as person properties for long-term attribution
        posthog.setPersonPropertiesForFlags(attribution);

        // Also set as super properties so they're included in all events
        posthog.register(attribution);
      }
    }
  }, [pathname, searchParams]);

  return null;
}

// Wrapper with Suspense for searchParams
function SuspendedPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider client={posthog}>
      <SuspendedPageView />
      {children}
    </PHProvider>
  );
}

// Export posthog for use in other components
export { posthog };
