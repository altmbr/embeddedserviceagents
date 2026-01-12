'use client';

import { motion } from 'framer-motion';

interface MobileFooterCTAProps {
  onCtaClick: () => void;
}

export default function MobileFooterCTA({ onCtaClick }: MobileFooterCTAProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-lg border-t border-gray-200 shadow-lg sm:hidden"
    >
      <button
        onClick={onCtaClick}
        className="btn btn-primary w-full py-3 text-base font-semibold"
      >
        Book a Free AI Strategy Call
      </button>
    </motion.div>
  );
}
