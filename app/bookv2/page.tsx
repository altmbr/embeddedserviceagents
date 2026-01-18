'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { analytics } from '@/lib/analytics';
import { trackLead } from '@/components/MetaPixel';

const industries = [
  'HVAC',
  'Plumbing',
  'Dental',
  'Med Spa',
  'Veterinary',
  'Roofing',
  'Legal',
  'Home Services',
];

const features = [
  {
    title: 'Instant Inbound Response',
    description: 'AI agents answer every call, email, and chat in seconds—not hours. Never lose a lead to slow response times.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent">
        <path d="M13 10V3L4 14H11L11 21L20 10L13 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Website Visitor Intelligence',
    description: 'Know who\'s on your site in real-time. Identify high-intent visitors and engage them before they leave.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent">
        <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" strokeWidth="2"/>
        <path d="M2.45825 12C3.73253 7.94288 7.52281 5 12.0004 5C16.4781 5 20.2684 7.94291 21.5426 12C20.2684 16.0571 16.4781 19 12.0005 19C7.52281 19 3.73251 16.0571 2.45825 12Z" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
  },
  {
    title: 'Embedded Conversion Widget',
    description: 'Turn website visitors into booked appointments with smart widgets that capture leads 24/7.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent">
        <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 10H16M8 14H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function BookV2Page() {
  useEffect(() => {
    // Track booking page view with variant identifier for A/B testing
    analytics.bookingPageViewed({ page_variant: 'v2_mobile_optimized' });

    // Cal.com inline embed code - light theme with blue branding
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.com/embed/embed.js", "init");
      Cal("init", "30min", {origin:"https://app.cal.com"});

      Cal.ns["30min"]("inline", {
        elementOrSelector:"#my-cal-inline-30min",
        config: {"layout":"month_view","theme":"light"},
        calLink: "altmbr/30min",
      });

      Cal.ns["30min"]("ui", {"theme":"light","cssVarsPerTheme":{"light":{"cal-brand":"#2563eb"},"dark":{"cal-brand":"#2563eb"}},"hideEventTypeDetails":false,"layout":"month_view"});

      // Track booking completed
      Cal.ns["30min"]("on", {
        action: "bookingSuccessful",
        callback: function(e) {
          console.log("Cal.com booking successful", e);
          window.dispatchEvent(new CustomEvent('calBookingComplete', { detail: e.data }));
        }
      });
    `;
    document.body.appendChild(script);

    // Listen for booking complete event from Cal.com
    const handleBookingComplete = (e: CustomEvent) => {
      // Track in PostHog with page variant for A/B testing
      analytics.bookingCompleted({
        date: e.detail?.date,
        time: e.detail?.startTime,
        email: e.detail?.attendee?.email,
        page_variant: 'v2_mobile_optimized',
      });

      // Track Meta Pixel Lead event with content_id for A/B filtering
      trackLead({
        content_name: '30 Minute Strategy Call',
        content_category: 'booking',
        content_id: 'book_v2',
      });

      if (e.detail?.attendee?.email) {
        analytics.identifyUser(e.detail.attendee.email, {
          name: e.detail.attendee.name,
          booking_date: e.detail.date,
        });
      }
    };
    window.addEventListener('calBookingComplete', handleBookingComplete as EventListener);

    return () => {
      window.removeEventListener('calBookingComplete', handleBookingComplete as EventListener);
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-gray-50">
      {/* Back button - fixed on mobile */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors group"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-transform group-hover:-translate-x-1">
              <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-medium text-sm">Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-text-secondary font-medium">Available Now</span>
          </div>
        </div>
      </div>

      {/* Hero Section - Mobile Optimized */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-6 md:py-10">
          {/* Industry Badges */}
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {industries.map((industry) => (
              <span
                key={industry}
                className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-accent text-xs font-medium"
              >
                {industry}
              </span>
            ))}
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-2xl md:text-4xl lg:text-5xl font-bold text-center mb-4 leading-tight tracking-tight text-text-primary">
            24/7 AI Receptionist for{' '}
            <span className="text-accent">Service Businesses</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base md:text-lg text-text-secondary text-center max-w-2xl mx-auto mb-8">
            You do so much work to generate leads, don't waste them. Endless Reply responds across channels instantly, all the time.
          </p>

          {/* Feature Cards - Horizontal scroll on mobile */}
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:overflow-visible snap-x snap-mandatory">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[280px] md:w-auto bg-white rounded-xl border border-gray-200 p-5 shadow-sm snap-start"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-3">
                  {feature.icon}
                </div>
                <h3 className="font-display font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="container mx-auto px-4 py-6 md:py-10">
        <div className="text-center mb-6">
          <h2 className="font-display text-xl md:text-2xl font-bold text-text-primary mb-2">
            Book Your Free Strategy Call
          </h2>
          <p className="text-sm md:text-base text-text-secondary">
            30 minutes. No pressure. Just insights.
          </p>
        </div>

        {/* Calendar embed container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            {/* Top accent bar */}
            <div className="h-1 bg-gradient-to-r from-accent via-purple-500 to-cta" />

            {/* Cal.com embed */}
            <div className="p-2 md:p-6">
              <div
                id="my-cal-inline-30min"
                className="w-full min-h-[500px] md:min-h-[600px]"
              />
            </div>
          </div>
        </div>

        {/* Trust indicators - Simplified for mobile */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-center">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-green-600">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm text-text-secondary">100% Free</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-accent">
              <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm text-text-secondary">30 Minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-cta">
              <path d="M13 10V3L4 14H11L11 21L20 10L13 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm text-text-secondary">Instant Value</span>
          </div>
        </div>
      </div>

      {/* Bottom CTA for mobile - Fixed */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-20">
        <p className="text-xs text-text-secondary text-center mb-2">
          Join 100+ service businesses using Endless Reply
        </p>
        <a
          href="#my-cal-inline-30min"
          className="block w-full py-3 px-4 bg-accent text-white text-center font-semibold rounded-xl shadow-lg"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('my-cal-inline-30min')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Book Free Call
        </a>
      </div>

      {/* Spacer for fixed bottom CTA on mobile */}
      <div className="h-24 md:hidden" />
    </main>
  );
}
