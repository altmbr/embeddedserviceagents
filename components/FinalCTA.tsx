'use client';

import { motion } from 'framer-motion';

interface FinalCTAProps {
  onCtaClick: () => void;
}

export default function FinalCTA({ onCtaClick }: FinalCTAProps) {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Urgency badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 px-5 py-2.5 mb-8 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-400"></span>
          </span>
          <span className="text-sm font-medium text-white">
            2026 Kickoff Special — January Only
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-[1.1] text-white"
        >
          Stop Losing Revenue to{' '}
          <span className="text-orange-300">Slow Response Times</span>
        </motion.h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8"
        >
          Join the service businesses that respond instantly, convert more visitors, and never miss another lead.
        </motion.p>

        {/* Offer box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-block p-6 md:p-8 mb-10 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm"
        >
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="text-center md:text-left">
              <div className="text-4xl md:text-5xl font-display font-bold text-orange-300 mb-1">
                50% OFF
              </div>
              <div className="text-blue-100">
                All of 2026 if booked in January
              </div>
            </div>
            <div className="hidden md:block w-px h-16 bg-white/20" />
            <div className="text-sm text-blue-200 max-w-xs">
              Start 2026 strong. Lock in this rate now and keep it all year—our way of helping you kick off the new year right.
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            onClick={onCtaClick}
            className="inline-flex items-center justify-center gap-2 px-10 py-5 text-lg font-semibold rounded-xl bg-white text-blue-700 shadow-strong hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
          >
            Book Your Free Strategy Call
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4.16666 10H15.8333M15.8333 10L10.8333 5M15.8333 10L10.8333 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </motion.div>

        {/* Micro-copy */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-6 text-sm text-blue-200"
        >
          30-minute call • No pressure • See exactly how it works for your business
        </motion.p>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-blue-200"
        >
          <span className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-green-400">
              <path d="M13.333 4L6 11.333L2.667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            No credit card required
          </span>
          <span className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-green-400">
              <path d="M13.333 4L6 11.333L2.667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Live in 48 hours
          </span>
          <span className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-green-400">
              <path d="M13.333 4L6 11.333L2.667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Cancel anytime
          </span>
        </motion.div>
      </div>
    </section>
  );
}
