'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { analytics } from '@/lib/analytics';

export default function Header() {
  const handleCtaClick = () => {
    analytics.ctaClicked('header', 'Book a Call');
  };
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-soft'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-md">
            {/* Lightning bolt / instant response icon */}
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="sm:w-5 sm:h-5">
              <path
                d="M11 1L3 12H10L9 19L17 8H10L11 1Z"
                fill="white"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="font-display font-bold text-base sm:text-lg text-text-primary">
            Endless Reply
          </span>
        </a>

        {/* Nav links (hidden on mobile) */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            How It Works
          </a>
          <a href="#pricing" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            Pricing
          </a>
          <a href="#testimonials" className="text-sm text-text-secondary hover:text-text-primary transition-colors">
            Case Studies
          </a>
        </nav>

        {/* CTA - hidden on mobile, shown on sm+ */}
        <Link
          href="/book"
          onClick={handleCtaClick}
          className="hidden sm:flex btn btn-primary btn-header py-2.5 px-5 text-sm"
        >
          Book a Call
        </Link>
      </div>
    </motion.header>
  );
}
