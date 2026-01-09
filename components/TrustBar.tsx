'use client';

import { motion } from 'framer-motion';

const logos = [
  { name: 'McKinsey', style: 'serif' },
  { name: 'Sequoia', style: 'caps' },
  { name: 'Slow Ventures', style: 'lowercase' },
  { name: 'Techstars', style: 'bold' },
  { name: 'Thumbtack', style: 'icon' },
  { name: 'Unito', style: 'modern' },
];

export default function TrustBar() {
  return (
    <section className="relative py-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Label with decorative lines */}
          <div className="flex items-center gap-4 mb-8 w-full max-w-2xl">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gray-200" />
            <span className="text-xs font-semibold text-text-muted uppercase tracking-[0.2em] whitespace-nowrap">
              Built by teams with experience from
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gray-200" />
          </div>

          {/* Logo grid */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14">
            {logos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.05 + index * 0.08 }}
                className="group"
              >
                <div className="px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-300">
                  <LogoSVG name={logo.name} />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function LogoSVG({ name }: { name: string }) {
  const baseClass = "h-5 md:h-6 w-auto transition-all duration-300 text-gray-400 group-hover:text-gray-700";

  switch (name) {
    case 'McKinsey':
      return (
        <svg viewBox="0 0 120 24" className={baseClass} fill="currentColor">
          <text x="0" y="18" style={{ fontFamily: 'Georgia, serif', fontSize: '16px', fontStyle: 'italic', fontWeight: '500' }}>
            McKinsey
          </text>
        </svg>
      );
    case 'Sequoia':
      return (
        <svg viewBox="0 0 100 24" className={baseClass} fill="currentColor">
          <text x="0" y="17" style={{ fontFamily: 'system-ui', fontSize: '13px', fontWeight: '700', letterSpacing: '2px' }}>
            SEQUOIA
          </text>
        </svg>
      );
    case 'Slow Ventures':
      return (
        <svg viewBox="0 0 120 24" className={baseClass} fill="currentColor">
          <text x="0" y="17" style={{ fontFamily: 'system-ui', fontSize: '14px', fontWeight: '500', letterSpacing: '0.5px' }}>
            slow ventures
          </text>
        </svg>
      );
    case 'Techstars':
      return (
        <svg viewBox="0 0 110 24" className={baseClass}>
          <text x="0" y="17" fill="currentColor" style={{ fontFamily: 'system-ui', fontSize: '15px', fontWeight: '700' }}>
            techstars
          </text>
          <circle cx="100" cy="10" r="4" className="fill-blue-500 group-hover:fill-blue-600" />
        </svg>
      );
    case 'Thumbtack':
      return (
        <svg viewBox="0 0 120 24" className={baseClass}>
          <circle cx="8" cy="12" r="5" className="fill-blue-500 group-hover:fill-blue-600" />
          <text x="18" y="17" fill="currentColor" style={{ fontFamily: 'system-ui', fontSize: '15px', fontWeight: '600' }}>
            thumbtack
          </text>
        </svg>
      );
    case 'Unito':
      return (
        <svg viewBox="0 0 70 24" className={baseClass} fill="currentColor">
          <text x="0" y="17" style={{ fontFamily: 'system-ui', fontSize: '16px', fontWeight: '800', letterSpacing: '-0.5px' }}>
            unito
          </text>
        </svg>
      );
    default:
      return null;
  }
}
