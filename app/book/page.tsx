'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { analytics, setupCalComTracking } from '@/lib/analytics';

export default function BookPage() {
  useEffect(() => {
    // Track booking page view
    analytics.bookingPageViewed();

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
    `;
    document.body.appendChild(script);

    // Set up Cal.com event tracking after script loads
    const setupTracking = () => {
      setTimeout(() => {
        setupCalComTracking();
      }, 2000); // Give Cal.com time to initialize
    };
    script.onload = setupTracking;

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <main className="relative min-h-screen">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 gradient-mesh" />

      {/* Decorative blobs */}
      <div className="blob-accent blob-blue w-[400px] h-[400px] -top-20 -right-20 animate-float" />
      <div className="blob-accent blob-orange w-[300px] h-[300px] bottom-40 -left-10" style={{ animationDelay: '1s' }} />

      {/* Back button */}
      <div className="relative z-10 container mx-auto px-4 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors group"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-transform group-hover:-translate-x-1">
            <path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-medium">Back to home</span>
        </Link>
      </div>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white border border-gray-200 shadow-soft">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-text-secondary">
              Available slots this week
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-[1.1] tracking-tight text-text-primary">
            Let's Talk About{' '}
            <span className="relative inline-block">
              <span className="stat-highlight">Growing Your Revenue</span>
              <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" fill="none" preserveAspectRatio="none">
                <path d="M2 6C50 3 150 3 198 6" stroke="url(#underline-gradient)" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0">
                    <stop stopColor="#2563eb"/>
                    <stop offset="1" stopColor="#7c3aed"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          <p className="text-lg md:text-xl text-text-secondary mb-8">
            Pick a time that works for you. We'll dive into your business and how you can leverage AI with and without Endless Reply to improve your business. Insights first, no pressure.
          </p>
        </div>

        {/* Calendar embed container */}
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-white rounded-2xl border border-gray-200 shadow-strong overflow-hidden">
            {/* Top accent bar */}
            <div className="h-1 bg-gradient-to-r from-accent via-purple-500 to-cta" />

            {/* Cal.com embed */}
            <div className="p-4 md:p-8">
              <div
                id="my-cal-inline-30min"
                className="w-full min-h-[600px] md:h-[700px] md:overflow-auto"
              />
            </div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white border border-gray-200 shadow-soft">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent">
                  <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="font-display font-bold text-xl text-text-primary mb-1">30 Minutes</div>
                <div className="text-sm text-text-secondary">Quick, focused call</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white border border-gray-200 shadow-soft">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-green-600">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="font-display font-bold text-xl text-text-primary mb-1">100% Free</div>
                <div className="text-sm text-text-secondary">No strings attached</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 p-6 rounded-xl bg-white border border-gray-200 shadow-soft">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-cta">
                  <path d="M13 10V3L4 14H11L11 21L20 10L13 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="font-display font-bold text-xl text-text-primary mb-1">Instant Value</div>
                <div className="text-sm text-text-secondary">Leave with actionable insights</div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ teaser */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-text-secondary mb-4">
            Have questions before booking?
          </p>
          <Link
            href="/#faq"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-dark font-medium transition-colors group"
          >
            Check out our FAQ
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M3.33334 8H12.6667M12.6667 8L8.66668 4M12.6667 8L8.66668 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
