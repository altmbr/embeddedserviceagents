'use client';

import { motion } from 'framer-motion';

const logos = [
  { name: 'McKinsey' },
  { name: 'Sequoia' },
  { name: 'Slow Ventures' },
  { name: 'Techstars' },
  { name: 'Thumbtack' },
  { name: 'Unito' },
];

export default function TrustBar() {
  return (
    <section className="relative py-16 border-y border-gray-100 bg-gray-50/50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm text-text-muted mb-8 uppercase tracking-wider"
        >
          Built by teams with experience from
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16"
        >
          {logos.map((logo, index) => (
            <motion.div
              key={logo.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
            >
              <LogoSVG name={logo.name} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function LogoSVG({ name }: { name: string }) {
  switch (name) {
    case 'McKinsey':
      return (
        <svg viewBox="0 0 140 28" className="h-6 md:h-7 w-auto" fill="currentColor">
          <text x="0" y="21" style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontStyle: 'italic', letterSpacing: '-0.5px' }}>
            McKinsey
          </text>
        </svg>
      );
    case 'Sequoia':
      return (
        <svg viewBox="0 0 120 28" className="h-6 md:h-7 w-auto" fill="currentColor">
          <text x="0" y="20" style={{ fontFamily: 'system-ui', fontSize: '17px', fontWeight: '600', letterSpacing: '0.5px' }}>
            SEQUOIA
          </text>
        </svg>
      );
    case 'Slow Ventures':
      return (
        <svg viewBox="0 0 150 28" className="h-6 md:h-7 w-auto" fill="currentColor">
          <text x="0" y="20" style={{ fontFamily: 'system-ui', fontSize: '16px', fontWeight: '500', letterSpacing: '1px' }}>
            slow ventures
          </text>
        </svg>
      );
    case 'Techstars':
      return (
        <svg viewBox="0 0 130 28" className="h-6 md:h-7 w-auto" fill="currentColor">
          <text x="0" y="20" style={{ fontFamily: 'system-ui', fontSize: '16px', fontWeight: '700', letterSpacing: '0px' }}>
            techstars
          </text>
          <text x="93" y="20" style={{ fontFamily: 'system-ui', fontSize: '16px', fontWeight: '700' }} fill="#2563eb">
            *
          </text>
        </svg>
      );
    case 'Thumbtack':
      return (
        <svg viewBox="0 0 140 28" className="h-6 md:h-7 w-auto" fill="currentColor">
          <circle cx="10" cy="14" r="6" fill="#2563eb" opacity="0.8" />
          <text x="22" y="20" style={{ fontFamily: 'system-ui', fontSize: '17px', fontWeight: '600', letterSpacing: '-0.3px' }}>
            thumbtack
          </text>
        </svg>
      );
    case 'Unito':
      return (
        <svg viewBox="0 0 100 28" className="h-6 md:h-7 w-auto" fill="currentColor">
          <text x="0" y="20" style={{ fontFamily: 'system-ui', fontSize: '18px', fontWeight: '700', letterSpacing: '-0.5px' }}>
            unito
          </text>
        </svg>
      );
    default:
      return null;
  }
}
