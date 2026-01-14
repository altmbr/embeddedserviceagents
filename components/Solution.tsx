'use client';

import { motion } from 'framer-motion';

const solutions = [
  {
    title: 'Instant Inbound Response',
    description: 'AI agents that answer calls and triage emails the moment they arrive. No hold music. No "we\'ll get back to you." Just immediate, intelligent responses that book appointments—even at 3 AM.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M22 12C22 16.4183 18.4183 20 14 20H10L6 24V12C6 7.58172 9.58172 4 14 4C18.4183 4 22 7.58172 22 12Z" stroke="currentColor" strokeWidth="2"/>
        <circle cx="11" cy="12" r="1.5" fill="currentColor"/>
        <circle cx="14" cy="12" r="1.5" fill="currentColor"/>
        <circle cx="17" cy="12" r="1.5" fill="currentColor"/>
        <path d="M26 16C26 20.4183 22.4183 24 18 24" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/>
        <path d="M26 20V16H22" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    features: ['24/7 phone answering', 'Email triage & response', 'Appointment booking', 'FAQ handling'],
    color: 'blue',
  },
  {
    title: 'Website Visitor Intelligence',
    description: 'We identify the anonymous visitors browsing your site and automatically reach out before they disappear. Turn "just looking" into "just booked."',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="6" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="2"/>
        <path d="M4 12H28" stroke="currentColor" strokeWidth="2"/>
        <circle cx="16" cy="18" r="2" stroke="#7c3aed" strokeWidth="2"/>
        <path d="M12 26H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M16 22V26" stroke="currentColor" strokeWidth="2"/>
      </svg>
    ),
    features: ['Visitor de-anonymization', 'Intent tracking', 'Automated outreach', 'Conversion sequences'],
    color: 'purple',
  },
  {
    title: 'Embedded Conversion Widget',
    description: 'Drop our agent directly into your website. Every form submission, every chat inquiry gets an instant, personalized response that moves leads toward booking.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="6" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M11 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M11 16H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <rect x="11" y="20" width="6" height="3" rx="1" stroke="#f97316" strokeWidth="2"/>
      </svg>
    ),
    features: ['Embeddable widget', 'Form integration', 'Live chat handoff', 'Custom branding'],
    color: 'orange',
  },
];

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    hoverBorder: 'hover:border-blue-300',
    iconBg: 'bg-blue-100',
    iconBorder: 'border-blue-200',
    iconText: 'text-blue-600',
    check: 'text-blue-600',
  },
  purple: {
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    hoverBorder: 'hover:border-purple-300',
    iconBg: 'bg-purple-100',
    iconBorder: 'border-purple-200',
    iconText: 'text-purple-600',
    check: 'text-purple-600',
  },
  orange: {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    hoverBorder: 'hover:border-orange-300',
    iconBg: 'bg-orange-100',
    iconBorder: 'border-orange-200',
    iconText: 'text-orange-600',
    check: 'text-orange-600',
  },
};

export default function Solution() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-gray-50/50">
      {/* Background */}
      <div className="blob-accent blob-blue w-[600px] h-[600px] top-0 -right-40 opacity-30" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="badge badge-accent mb-6">
            The Solution
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-text-primary">
            Your Superhuman{' '}
            <span className="stat-highlight">24/7 Customer Agent</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Three powerful systems working together to ensure you never miss another lead.
          </p>
        </motion.div>

        {/* Solution cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => {
            const colors = colorClasses[solution.color as keyof typeof colorClasses];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative"
              >
                <div className={`h-full p-8 rounded-2xl bg-white border ${colors.border} ${colors.hoverBorder} hover:shadow-medium transition-all duration-300 flex flex-col`}>
                  {/* Icon */}
                  <div className={`w-16 h-16 mb-6 rounded-xl ${colors.iconBg} border ${colors.iconBorder} flex items-center justify-center ${colors.iconText} group-hover:scale-110 transition-transform duration-300`}>
                    {solution.icon}
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl md:text-2xl font-bold mb-4 text-text-primary">
                    {solution.title}
                  </h3>
                  <p className="text-text-secondary mb-6 leading-relaxed flex-grow">
                    {solution.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {solution.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`${colors.check} flex-shrink-0`}>
                          <path d="M13.333 4L6 11.333L2.667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
