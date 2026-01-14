'use client';

import { motion } from 'framer-motion';

const painPoints = [
  {
    stat: '70%',
    text: 'of leads who don\'t get a response in 3 minutes book with your competitor',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12,6 12,12 16,14" />
      </svg>
    ),
  },
  {
    stat: '11 PM',
    text: 'Your team can\'t answer phones then—but your customers are searching',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    stat: '98%',
    text: 'of website visitors leave without a trace—you never know they existed',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    ),
  },
  {
    stat: '$$$',
    text: 'Missed calls and slow email responses are bleeding your revenue dry',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
];

export default function Problem() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-50" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge badge-danger mb-6">
            The Problem
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-text-primary">
            Every Minute of Silence{' '}
            <span className="cta-highlight">Costs You Money</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            You didn&apos;t start your business to lose customers to a competitor with a faster reply.
          </p>
        </motion.div>

        {/* Pain points grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 md:p-8 rounded-2xl bg-white border border-gray-200 hover:border-red-200 hover:shadow-medium transition-all duration-300"
            >
              <div className="flex gap-5">
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-500">
                  {point.icon}
                </div>

                {/* Content */}
                <div>
                  <div className="text-2xl md:text-3xl font-display font-bold text-red-600 mb-2">
                    {point.stat}
                  </div>
                  <p className="text-text-secondary leading-relaxed">
                    {point.text}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom emphasis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-xl md:text-2xl font-display font-semibold text-text-secondary">
            <span className="text-text-primary">The math is brutal:</span> every unanswered inquiry is revenue walking out the door.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
