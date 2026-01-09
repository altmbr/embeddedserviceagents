'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  source?: string;
}

export default function EmailModal({ isOpen, onClose, onSuccess, source = 'cta' }: EmailModalProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source }),
      });

      if (response.ok) {
        // Store in localStorage as backup
        const existingLeads = JSON.parse(localStorage.getItem('captured_emails') || '[]');
        existingLeads.push({ email, source, timestamp: new Date().toISOString() });
        localStorage.setItem('captured_emails', JSON.stringify(existingLeads));

        onSuccess();
      } else {
        // Still store locally if API fails
        const existingLeads = JSON.parse(localStorage.getItem('captured_emails') || '[]');
        existingLeads.push({ email, source, timestamp: new Date().toISOString() });
        localStorage.setItem('captured_emails', JSON.stringify(existingLeads));

        onSuccess();
      }
    } catch {
      // Store locally on error
      const existingLeads = JSON.parse(localStorage.getItem('captured_emails') || '[]');
      existingLeads.push({ email, source, timestamp: new Date().toISOString() });
      localStorage.setItem('captured_emails', JSON.stringify(existingLeads));

      onSuccess();
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative bg-white border border-gray-200 rounded-2xl p-8 md:p-10 shadow-strong">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-text-secondary hover:text-text-primary hover:bg-gray-200 transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Icon */}
              <div className="w-14 h-14 mb-6 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-blue-600">
                  <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Content */}
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-3 text-text-primary">
                One quick step
              </h3>
              <p className="text-text-secondary mb-6 text-base">
                Enter your email to book your free strategy call. We&apos;ll send you a confirmation and prep materials.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="input"
                    autoFocus
                  />
                  {error && (
                    <p className="mt-2 text-sm text-red-600">{error}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full text-base py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <>
                      Continue to Booking
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3.33334 8H12.6667M12.6667 8L8.66668 4M12.6667 8L8.66668 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Trust indicators */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-4 text-xs text-text-muted">
                  <span className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-green-500">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    No spam, ever
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-green-500">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    30-min call
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-green-500">
                      <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Free, no obligation
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Exit intent modal hook
export function useExitIntent(callback: () => void) {
  const handleMouseLeave = useCallback((e: MouseEvent) => {
    if (e.clientY <= 0) {
      callback();
    }
  }, [callback]);

  useEffect(() => {
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [handleMouseLeave]);
}
