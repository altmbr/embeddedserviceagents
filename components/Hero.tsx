'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-32 overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 gradient-mesh" />

      {/* Decorative blobs */}
      <div className="blob-accent blob-blue w-[500px] h-[500px] -top-40 -right-40" />
      <div className="blob-accent blob-orange w-[400px] h-[400px] bottom-20 -left-20" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center px-4 py-2 mb-8 rounded-full bg-white border border-gray-200 shadow-soft"
        >
          <span className="text-sm text-text-secondary">
            Built by teams that have scaled their own service business to <span className="text-text-primary font-semibold">$12m/year of revenue</span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight text-text-primary"
        >
          Stop Losing Customers to{' '}
          <span className="relative inline-block">
            <span className="stat-highlight">Slow Response Times</span>
            <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none">
              <path d="M2 8C50 3 150 3 198 8" stroke="url(#underline-gradient)" strokeWidth="4" strokeLinecap="round"/>
              <defs>
                <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0">
                  <stop stopColor="#2563eb"/>
                  <stop offset="1" stopColor="#7c3aed"/>
                </linearGradient>
              </defs>
            </svg>
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10"
        >
          Our AI agents answer every call, email, and website inquiry instantly—24/7.
          Service businesses using our platform see{' '}
          <span className="text-text-primary font-semibold">80-230% more revenue</span>.
        </motion.p>

        {/* Industries served - compact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-8 text-sm text-text-muted"
        >
          <span>For:</span>
          {['HVAC', 'Plumbing', 'Veterinary', 'Med Spas', 'Dental', 'Roofing', 'Legal'].map((industry, i) => (
            <span key={industry} className="text-text-secondary">
              {industry}{i < 6 ? ' •' : ''}
            </span>
          ))}
          <span className="text-blue-600 font-medium">+ more</span>
        </motion.div>

        {/* Stat callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-flex items-center gap-3 px-5 py-3.5 mb-10 rounded-xl bg-amber-100 border border-amber-400 shadow-sm"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-amber-700 flex-shrink-0">
            <path d="M10 6V10M10 14H10.01M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <p className="text-sm md:text-base" style={{ color: '#1f2937' }}>
            <strong className="font-bold" style={{ color: '#b45309' }}>70% of leads</strong> who don&apos;t get a response in 3 minutes book with your competitor
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/book" className="btn btn-primary text-base px-8 py-4">
            Book Your Free Strategy Call
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3.33334 8H12.6667M12.6667 8L8.66668 4M12.6667 8L8.66668 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <a href="#how-it-works" className="btn btn-secondary text-base">
            See How It Works
          </a>
        </motion.div>

        {/* Micro-copy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-6 text-sm text-text-muted"
        >
          30-minute call • No pressure • See exactly how it works for your business
        </motion.p>
      </div>

    </section>
  );
}
