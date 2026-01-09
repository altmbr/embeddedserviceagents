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
    <footer className="relative py-16 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full opacity-[0.03] blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500 rounded-full opacity-[0.03] blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Lead magnet */}
        <div className="max-w-xl mx-auto text-center mb-12">
          <h3 className="font-display text-xl md:text-2xl font-bold mb-3 text-text-primary">
            Not ready to talk?
          </h3>
          <p className="text-text-secondary mb-6">
            Get our free guide: <span className="font-semibold text-text-primary">&ldquo;The 7 Response Time Mistakes Costing Service Businesses $100K+/Year&rdquo;</span>
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
                required
              />
              <button type="submit" className="btn btn-secondary whitespace-nowrap">
                Send Guide
              </button>
            </form>
          )}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 flex items-center justify-center shadow-lg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M11 1L3 12H10L9 19L17 8H10L11 1Z" fill="white"/>
                </svg>
              </div>
              <div className="text-left">
                <div className="font-display font-bold text-lg text-text-primary">InboundAI</div>
                <div className="text-xs text-text-muted">Never miss another lead</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-text-muted">
              <span>&copy; {new Date().getFullYear()} InboundAI.</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">All rights reserved.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
