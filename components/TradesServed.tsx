'use client';

import { motion } from 'framer-motion';

const industries = [
  // Home Services
  { name: 'HVAC', icon: '❄️' },
  { name: 'Plumbing', icon: '🔧' },
  { name: 'Electrical', icon: '⚡' },
  { name: 'Roofing', icon: '🏠' },
  { name: 'Pest Control', icon: '🐜' },
  // Health & Wellness
  { name: 'Veterinary', icon: '🐕' },
  { name: 'Dental', icon: '🦷' },
  { name: 'Med Spas', icon: '💆' },
  { name: 'Chiropractic', icon: '🩺' },
  // Other Services
  { name: 'Auto Repair', icon: '🚗' },
  { name: 'Legal Services', icon: '⚖️' },
  { name: 'Salons & Spas', icon: '✨' },
];

export default function TradesServed() {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-sm font-medium text-text-muted uppercase tracking-wider mb-6">
            Built for service businesses that live and die by response time
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {industries.map((industry, index) => (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <span className="text-lg">{industry.icon}</span>
                <span className="text-sm font-medium text-text-secondary">{industry.name}</span>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: industries.length * 0.05 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200"
            >
              <span className="text-sm font-medium text-blue-600">+ More industries</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
