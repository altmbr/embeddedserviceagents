'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const logos = [
  { name: 'McKinsey', file: '/logos/McKinsey.svg', width: 100, height: 31 },
  { name: 'Sequoia', file: '/logos/Sequoia.svg', width: 100, height: 13 },
  { name: 'Techstars', file: '/logos/Techstars.svg', width: 100, height: 18 },
  { name: 'Thumbtack', file: '/logos/Thumbtack.svg', width: 100, height: 13 },
  { name: 'Unito', file: '/logos/Unito.svg', width: 90, height: 29 },
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
                  <Image
                    src={logo.file}
                    alt={logo.name}
                    width={logo.width}
                    height={logo.height}
                    className="h-5 md:h-6 w-auto opacity-50 grayscale group-hover:opacity-80 group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
