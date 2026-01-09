'use client';

import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Design Your Agent',
    description: 'Use our Agent Creator to craft responses that sound like your best employee. Set your services, pricing, availability, and tone.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 20H21" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Connect Your Systems',
    description: 'We integrate directly with your existing tools—Zendesk, ServiceTitan, Jobber, HouseCall Pro, or plain email. No ripping out what works.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M18 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7" />
        <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1Z" />
        <line x1="6" y1="6" x2="6" y2="6.01" />
        <line x1="10" y1="6" x2="10" y2="6.01" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Install the Pixel',
    description: 'Drop one line of code on your website. We start identifying visitors and tracking intent immediately.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Launch Your Sequences',
    description: 'Set the rules for follow-up. When someone visits your pricing page twice? We reach out. Abandoned a booking form? We recover it.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32 overflow-hidden bg-gray-50/50">
      {/* Background */}
      <div className="blob-accent blob-blue w-[500px] h-[500px] -left-40 top-1/2 -translate-y-1/2 opacity-30" />

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
            How It Works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-text-primary">
            Live in 48 Hours,{' '}
            <span className="stat-highlight">Not 48 Days</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            We handle the technical heavy lifting. You just tell us how you want your agent to work.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute left-1/2 top-8 bottom-8 w-px bg-gradient-to-b from-blue-500/50 via-blue-300/30 to-transparent" />

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-y-16">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative ${index % 2 === 0 ? 'lg:pr-16 lg:text-right' : 'lg:pl-16 lg:col-start-2'}`}
              >
                {/* Dot on the line (desktop) */}
                <div className={`hidden lg:flex absolute top-4 ${index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-md`} />

                <div className={`flex items-start gap-6 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Icon */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                    {step.icon}
                  </div>

                  {/* Content */}
                  <div className={`${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                    <div className="text-sm font-display font-bold text-blue-600 mb-2">
                      Step {step.number}
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-bold mb-3 text-text-primary">
                      {step.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Integration logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 pt-16 border-t border-gray-200"
        >
          <p className="text-center text-sm text-text-muted mb-6 uppercase tracking-wider">
            Integrates with the tools you already use
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-text-muted">
            {['Zendesk', 'ServiceTitan', 'Jobber', 'HouseCall Pro', 'Google Calendar', 'Slack'].map((tool) => (
              <span key={tool} className="text-sm font-medium hover:text-text-secondary transition-colors">
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
