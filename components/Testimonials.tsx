'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "We were leaving money on the table every single day. Within 60 days of installing the AI receptionist, our revenue jumped 80%. It's like having a $200K/year employee that never sleeps.",
    name: 'Jeff Morrison',
    title: 'Owner',
    company: 'Pleasant Plumbing Co.',
    location: 'Phoenix, AZ',
    stat: '+80%',
    statLabel: 'Revenue',
    initials: 'JM',
    gradient: 'from-orange-400 to-amber-500',
  },
  {
    quote: "Pet emergencies don't wait for office hours. Now every after-hours call gets triaged immediately—urgent cases get routed to our on-call vet, routine questions get scheduled. Our client retention is up 160%.",
    name: 'Dr. Sarah Mitchell',
    title: 'Practice Owner',
    company: 'Pawsitive Care Veterinary',
    location: 'Denver, CO',
    stat: '+160%',
    statLabel: 'Retention',
    initials: 'SM',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    quote: "The visitor de-anonymization alone paid for itself in week one. We're now reaching out to people who visited our site before they even contact us. 230% more website conversions.",
    name: 'Rebecca Chen',
    title: 'Founder',
    company: 'Serenova Med Spa',
    location: 'Los Angeles, CA',
    stat: '+230%',
    statLabel: 'Conversions',
    initials: 'RC',
    gradient: 'from-pink-400 to-rose-500',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

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
            Results
          </span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-text-primary">
            Real Results from{' '}
            <span className="stat-highlight">Real Service Businesses</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Don&apos;t take our word for it. Here&apos;s what operators like you are experiencing.
          </p>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="h-full p-8 rounded-2xl bg-white border border-gray-200 hover:border-gray-300 hover:shadow-medium transition-all duration-300">
                {/* Stat badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-green-50 border border-green-200">
                  <span className="text-lg font-display font-bold text-green-600">{testimonial.stat}</span>
                  <span className="text-xs text-green-600 uppercase tracking-wider">{testimonial.statLabel}</span>
                </div>

                {/* Quote */}
                <blockquote className="text-text-primary leading-relaxed mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  {/* Avatar with gradient and initials */}
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-display font-bold text-sm shadow-soft`}>
                    {testimonial.initials}
                  </div>

                  <div>
                    <div className="font-display font-semibold text-text-primary">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {testimonial.title}, {testimonial.company}
                    </div>
                    <div className="text-xs text-text-muted">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Social proof numbers */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '157+', label: 'Service Businesses' },
            { value: '$4.2M', label: 'Revenue Generated' },
            { value: '98%', label: 'Customer Satisfaction' },
            { value: '<3 min', label: 'Avg Response Time' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-display text-3xl md:text-4xl font-bold stat-highlight mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-text-secondary">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
