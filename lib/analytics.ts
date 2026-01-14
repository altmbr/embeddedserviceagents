import posthog from 'posthog-js';

// Meta Pixel helper - safely call fbq if loaded
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

// ============================================
// CONVERSION FUNNEL EVENTS
// ============================================
// These events map to your ad attribution funnel:
// 1. Landing Page View (automatic via PostHogProvider)
// 2. CTA Click → Book Page
// 3. Calendar Interaction
// 4. Time Slot Selected
// 5. Booking Form Started
// 6. Booking Completed
// ============================================

export const analytics = {
  // ---- Funnel Step 1: Landing Page ----
  // Handled automatically by PostHogProvider

  // ---- Funnel Step 2: CTA Engagement ----
  ctaClicked: (location: string, ctaText: string) => {
    posthog.capture('cta_clicked', {
      cta_location: location, // e.g., 'hero', 'header', 'final_cta', 'mobile_footer'
      cta_text: ctaText,
      funnel_step: 2,
    });
  },

  // Dedicated pricing CTA tracking with tier details
  pricingCtaClicked: (tierName: string, tierPrice: string) => {
    posthog.capture('cta_clicked', {
      cta_location: 'pricing',
      cta_text: `${tierName} - Book a Call`,
      pricing_tier: tierName.toLowerCase(), // 'starter', 'professional', 'enterprise'
      pricing_tier_price: tierPrice, // '299', '699', 'Custom'
      funnel_step: 2,
    });
  },

  // ---- Funnel Step 3: Booking Page ----
  bookingPageViewed: () => {
    posthog.capture('booking_page_viewed', {
      funnel_step: 3,
    });
  },

  // ---- Funnel Step 4: Calendar Interaction ----
  calendarDateSelected: (date: string) => {
    posthog.capture('calendar_date_selected', {
      selected_date: date,
      funnel_step: 4,
    });
  },

  // ---- Funnel Step 5: Time Slot Selected ----
  timeSlotSelected: (date: string, time: string) => {
    posthog.capture('time_slot_selected', {
      selected_date: date,
      selected_time: time,
      funnel_step: 5,
    });
  },

  // ---- Funnel Step 6: Booking Form Started ----
  bookingFormStarted: () => {
    posthog.capture('booking_form_started', {
      funnel_step: 6,
    });
  },

  // ---- Funnel Step 7: Booking Completed ----
  bookingCompleted: (eventData?: {
    date?: string;
    time?: string;
    email?: string;
  }) => {
    posthog.capture('booking_completed', {
      ...eventData,
      funnel_step: 7,
      conversion: true,
    });

    // Also track as a conversion event for ad platforms
    posthog.capture('$conversion', {
      conversion_type: 'booking',
      conversion_value: 1, // You can add monetary value here later
    });

    // Note: Meta Pixel Lead event is fired directly in Cal.com callback (book/page.tsx)
  },

  // ---- Lead Magnet Events ----
  leadMagnetFormStarted: (magnetName: string) => {
    posthog.capture('lead_magnet_form_started', {
      magnet_name: magnetName,
    });
  },

  leadMagnetSubmitted: (magnetName: string, email: string) => {
    posthog.capture('lead_magnet_submitted', {
      magnet_name: magnetName,
      email,
      conversion: true,
      conversion_type: 'lead_magnet',
    });

    // Identify the user by email
    posthog.identify(email, {
      email,
      lead_magnet: magnetName,
      lead_magnet_date: new Date().toISOString(),
    });
  },

  // ---- Additional Engagement Events ----
  sectionViewed: (sectionName: string) => {
    posthog.capture('section_viewed', {
      section: sectionName,
    });
  },

  faqExpanded: (question: string) => {
    posthog.capture('faq_expanded', {
      question,
    });
  },

  pricingViewed: (tier: string) => {
    posthog.capture('pricing_tier_viewed', {
      tier,
    });
  },

  externalLinkClicked: (url: string, context: string) => {
    posthog.capture('external_link_clicked', {
      url,
      context,
    });
  },

  // ---- Scroll Depth Tracking ----
  scrollDepthReached: (depth: number) => {
    posthog.capture('scroll_depth_reached', {
      depth_percent: depth,
    });
  },

  // ---- Time on Page ----
  timeOnPage: (seconds: number, pagePath: string) => {
    posthog.capture('time_on_page', {
      time_seconds: seconds,
      page_path: pagePath,
    });
  },

  // ---- Identify User (when they book) ----
  identifyUser: (email: string, properties?: Record<string, any>) => {
    posthog.identify(email, {
      email,
      ...properties,
    });
  },
};

// Helper to track Cal.com embed events
export function setupCalComTracking() {
  if (typeof window === 'undefined') return;

  // Listen for Cal.com embed events
  // @ts-ignore
  const Cal = window.Cal;
  if (!Cal) return;

  // Cal.com fires events we can listen to
  Cal('on', {
    action: 'bookingSuccessful',
    callback: (e: any) => {
      analytics.bookingCompleted({
        date: e.data?.date,
        time: e.data?.startTime,
        email: e.data?.attendee?.email,
      });

      // Identify the user by email
      if (e.data?.attendee?.email) {
        analytics.identifyUser(e.data.attendee.email, {
          name: e.data.attendee.name,
          booking_date: e.data.date,
        });
      }
    },
  });

  Cal('on', {
    action: 'bookingStarted',
    callback: () => {
      analytics.bookingFormStarted();
    },
  });

  Cal('on', {
    action: 'dateSelected',
    callback: (e: any) => {
      analytics.calendarDateSelected(e.data?.date);
    },
  });

  Cal('on', {
    action: 'timeSelected',
    callback: (e: any) => {
      analytics.timeSlotSelected(e.data?.date, e.data?.time);
    },
  });
}
