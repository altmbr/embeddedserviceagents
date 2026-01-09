'use client';

import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer-guide' }),
      });
    } catch {
      // Still mark as submitted even if API fails
    }

    // Also store locally
    const existingLeads = JSON.parse(localStorage.getItem('captured_emails') || '[]');
    existingLeads.push({ email, source: 'footer-guide', timestamp: new Date().toISOString() });
    localStorage.setItem('captured_emails', JSON.stringify(existingLeads));

    setSubmitted(true);
  };

  return (
    <footer className="relative py-16 border-t border-gray-200 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        {/* Lead magnet */}
        <div className="max-w-xl mx-auto text-center mb-16">
          <h3 className="font-display text-xl font-bold mb-3 text-text-primary">
            Not ready to talk?
          </h3>
          <p className="text-text-secondary mb-6">
            Get our free guide: &ldquo;The 7 Response Time Mistakes Costing Service Businesses $100K+/Year&rdquo;
          </p>

          {submitted ? (
            <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M16.667 5L7.5 14.167L3.333 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Check your inbox!
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="input flex-1"
              />
              <button type="submit" className="btn btn-secondary whitespace-nowrap">
                Send Guide
              </button>
            </form>
          )}
        </div>

        {/* Footer links */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-12 text-sm text-text-secondary">
          <a href="#how-it-works" className="hover:text-text-primary transition-colors">How It Works</a>
          <span className="text-gray-300">•</span>
          <a href="#pricing" className="hover:text-text-primary transition-colors">Pricing</a>
          <span className="text-gray-300">•</span>
          <a href="#testimonials" className="hover:text-text-primary transition-colors">Case Studies</a>
          <span className="text-gray-300">•</span>
          <a href="#faq" className="hover:text-text-primary transition-colors">FAQ</a>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                <path d="M11 1L3 12H10L9 19L17 8H10L11 1Z" fill="white"/>
              </svg>
            </div>
            <span className="text-sm text-text-muted">
              &copy; {new Date().getFullYear()} InboundAI. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
