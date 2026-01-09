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

  const navLinks = [
    { label: 'How It Works', href: '#how-it-works', icon: '⚡' },
    { label: 'Pricing', href: '#pricing', icon: '💰' },
    { label: 'Case Studies', href: '#testimonials', icon: '📈' },
    { label: 'FAQ', href: '#faq', icon: '❓' },
  ];

  return (
    <footer className="relative py-20 border-t-2 border-gray-200 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full opacity-[0.03] blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500 rounded-full opacity-[0.03] blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Lead magnet */}
        <div className="max-w-xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200">
            <span className="text-2xl">📥</span>
            <span className="text-sm font-semibold text-blue-700">Free Resource</span>
          </div>

          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 text-text-primary">
            Not ready to talk?
          </h3>
          <p className="text-base md:text-lg text-text-secondary mb-8 leading-relaxed">
            Get our free guide: <span className="font-semibold text-text-primary">&ldquo;The 7 Response Time Mistakes Costing Service Businesses $100K+/Year&rdquo;</span>
          </p>

          {submitted ? (
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 text-green-700 shadow-lg">
              <svg width="24" height="24" viewBox="0 0 20 20" fill="none">
                <path d="M16.667 5L7.5 14.167L3.333 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-semibold text-lg">Check your inbox!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="input flex-1 text-base"
                required
              />
              <button type="submit" className="btn btn-secondary whitespace-nowrap text-base px-8">
                Send Guide →
              </button>
            </form>
          )}
        </div>

        {/* Navigation grid */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative flex flex-col items-center gap-3 p-6 rounded-2xl bg-white border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {link.icon}
                </span>
                <span className="font-display font-semibold text-base text-text-primary group-hover:text-blue-600 transition-colors text-center">
                  {link.label}
                </span>
              </a>
            ))}
          </div>
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
