'use client';

import { motion } from 'framer-motion';

interface PricingProps {
  onCtaClick: () => void;
}

const tiers = [
  {
    name: 'Starter',
    description: 'For growing businesses ready to stop missing calls',
    price: '299',
    unit: '/account/month',
    features: [
      '24/7 AI phone answering',
      'Email triage & auto-response',
      'Basic appointment booking',
      'Up to 150 calls/month',
      'Standard integrations',
      'Email support',
    ],
    cta: 'Start Free Trial',
    highlighted: false,
  },
  {
    name: 'Professional',
    description: 'For established businesses wanting to maximize every lead',
    price: '699',
    unit: '/account/month',
    features: [
      'Everything in Starter, plus:',
      'Website visitor de-anonymization',
      'Automated outreach sequences',
      'Up to 500 calls/month',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Enterprise',
    description: 'For larger operations needing full customization',
    price: 'Custom',
    unit: '',
    features: [
      'Everything in Professional, plus:',
      'Embeddable chat widget',
      'CRM & scheduling integrations',
      'Advanced analytics & reporting',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export default function Pricing({ onCtaClick }: PricingProps) {
  return (
    <section id="pricing" className="relative py-24 md:py-32 overflow-hidden bg-gray-50/50">
      {/* Background */}
      <div className="blob-accent blob-blue w-[500px] h-[500px] top-0 -left-40 opacity-20" />
      <div className="blob-accent blob-orange w-[400px] h-[400px] bottom-0 -right-40 opacity-20" />

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
            Pricing
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-text-primary">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            No hidden fees. No long-term contracts. Pay per account, scale as you grow.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl h-full ${
                tier.highlighted
                  ? 'bg-white border-2 border-blue-500 shadow-strong'
                  : 'bg-white border border-gray-200 shadow-soft'
              }`}
            >
              {/* Badge */}
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-sm font-medium shadow-md">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="p-8 h-full flex flex-col">
                {/* Header */}
                <div className="mb-6">
                  <h3 className="font-display text-xl font-bold text-text-primary mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    {tier.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    {tier.price !== 'Custom' && (
                      <span className="text-text-muted text-lg">$</span>
                    )}
                    <span className="font-display text-5xl font-bold text-text-primary">
                      {tier.price}
                    </span>
                    {tier.unit && (
                      <span className="text-text-muted text-sm">{tier.unit}</span>
                    )}
                  </div>
                  {tier.price !== 'Custom' && (
                    <p className="text-xs text-text-muted mt-1">
                      Billed monthly • Cancel anytime
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className={`flex-shrink-0 mt-0.5 ${
                          tier.highlighted ? 'text-blue-600' : 'text-green-500'
                        }`}
                      >
                        <path
                          d="M13.333 4L6 11.333L2.667 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={onCtaClick}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${
                    tier.highlighted
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
                      : 'bg-gray-100 text-text-primary hover:bg-gray-200'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-text-muted">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="text-sm text-text-muted mt-2">
            <span className="font-semibold text-orange-600">2026 Kickoff:</span> 50% off your first year when you sign up in January.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
