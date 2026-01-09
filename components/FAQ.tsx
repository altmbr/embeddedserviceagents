'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'How hard is this to set up?',
    answer: 'Most customers are fully live within 48 hours. We handle the technical integration—you just need to tell us how you want your agent to sound and respond. If you can fill out a form, you can launch an agent. Our team walks you through everything on the onboarding call.',
  },
  {
    question: 'Is this worth it if we don\'t have much website traffic?',
    answer: 'Yes—and here\'s why. First, you\'re probably getting more traffic than you realize (most service businesses don\'t track properly). Second, our phone and email agents work regardless of website traffic. Third, even 50 monthly visitors converting at 10% vs 2% is the difference between 5 new customers and 1. That alone typically pays for the service multiple times over.',
  },
  {
    question: 'I\'ve seen a lot of AI tools. How is this different?',
    answer: 'We built this because we ran a service business ourselves—we scaled Setter to $12M/year in revenue. We\'re not AI researchers who read about your problems in a blog post. We lived them. That means our agents are built for how service businesses actually operate: appointment-based, reputation-dependent, and time-sensitive. We understand that a missed call at 6 PM costs you real money.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="badge badge-accent mb-6">
            FAQ
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-text-primary">
            Questions We Get Asked
          </h2>
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-soft"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-display text-lg font-semibold text-text-primary pr-8">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-text-secondary"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-text-secondary leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Additional questions CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-text-secondary">
            Have another question?{' '}
            <a href="mailto:hello@example.com" className="text-blue-600 link-underline font-medium">
              Reach out directly
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
